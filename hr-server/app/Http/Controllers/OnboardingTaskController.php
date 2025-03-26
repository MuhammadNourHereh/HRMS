<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OnboardingTask;
use App\Models\EmployeeOnboarding;
use App\Models\Employee;
use Illuminate\Support\Facades\Validator;

class OnboardingTaskController extends Controller
{
    public function getTasks(Request $request)
    {
        $perPage = $request->input('per_page', 5);
        
        $tasks = OnboardingTask::orderBy('title')
            ->paginate($perPage);
        
        return response()->json([
            'status' => 'success',
            'data' => $tasks
        ]);
    }

    public function getTaskById($id)
    {
        $task = OnboardingTask::findOrFail($id);
        
        return response()->json([
            'status' => 'success',
            'data' => $task
        ]);
    }

    public function addOrUpdateTask(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_required' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($id === 'add') {
            $task = OnboardingTask::create([
                'title' => $request->title,
                'description' => $request->description,
                'is_required' => $request->is_required ?? true,
            ]);
            $message = 'Onboarding task created successfully';
        } else {
            $task = OnboardingTask::findOrFail($id);
            
            $task->title = $request->title;
            
            if ($request->has('description')) {
                $task->description = $request->description;
            }
            
            if ($request->has('is_required')) {
                $task->is_required = $request->is_required;
            }
            
            $task->save();
            $message = 'Onboarding task updated successfully';
        }

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $task
        ]);
    }

    public function deleteTask($id)
    {
        $task = OnboardingTask::findOrFail($id);
        $task->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Onboarding task deleted successfully'
        ]);
    }


    // assign onbaording task to employee

    public function assignTaskToEmployee(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'employee_id' => 'required|exists:employees,id',
            'onboarding_task_id' => 'required|exists:onboarding_tasks,id',
            'status' => 'nullable|in:pending,in_progress,completed,rejected',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if assignment already exists
        $existingAssignment = EmployeeOnboarding::where('employee_id', $request->employee_id)
            ->where('onboarding_task_id', $request->onboarding_task_id)
            ->first();

        if ($existingAssignment) {
            return response()->json([
                'status' => 'error',
                'message' => 'This task is already assigned to the employee'
            ], 422);
        }

        // Create the assignment
        $assignment = EmployeeOnboarding::create([
            'employee_id' => $request->employee_id,
            'onboarding_task_id' => $request->onboarding_task_id,
            'status' => $request->status ?? 'pending',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Task assigned successfully',
            'data' => $assignment
        ]);
    }

    // update task status

    public function updateTaskStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,in_progress,completed,rejected',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $assignment = EmployeeOnboarding::findOrFail($id);
        
        $assignment->status = $request->status;
        
        // Set completed_date if the status is completed
        if ($request->status === 'completed' && !$assignment->completed_date) {
            $assignment->completed_date = now();
        }
        
        $assignment->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Task status updated successfully',
            'data' => $assignment
        ]);
    }

    // get omboarding task for a specific employee

    public function getEmployeeOnboardingTasks($employeeId)
    {
        $employee = Employee::findOrFail($employeeId);
        
        $assignments = EmployeeOnboarding::where('employee_id', $employeeId)
            ->with('onboardingTask')
            ->get();
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'employee' => $employee,
                'tasks' => $assignments
            ]
        ]);
    }

    public function createTemplate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'template_name' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'duration' => 'nullable|integer|min:1',
            'task_ids' => 'required|array',
            'task_ids.*' => 'exists:onboarding_tasks,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        
        //  return a success message with the tasks
        $tasks = OnboardingTask::whereIn('id', $request->task_ids)->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Onboarding template created successfully',
            'data' => [
                'template_name' => $request->template_name,
                'department' => $request->department,
                'duration' => $request->duration,
                'tasks' => $tasks
            ]
        ]);
    }


    //apply onboarding to an employee
    public function applyTemplateToEmployee(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'employee_id' => 'required|exists:employees,id',
            'task_ids' => 'required|array',
            'task_ids.*' => 'exists:onboarding_tasks,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $employee = Employee::findOrFail($request->employee_id);
        $assignments = [];

        foreach ($request->task_ids as $taskId) {
            // Check if the assignment already exists
            $existingAssignment = EmployeeOnboarding::where('employee_id', $request->employee_id)
                ->where('onboarding_task_id', $taskId)
                ->first();

            if (!$existingAssignment) {
                $assignment = EmployeeOnboarding::create([
                    'employee_id' => $request->employee_id,
                    'onboarding_task_id' => $taskId,
                    'status' => 'pending',
                ]);
                
                $assignments[] = $assignment;
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Onboarding template applied successfully',
            'data' => [
                'employee' => $employee,
                'assignments' => $assignments
            ]
        ]);
    }


    // get onboarding stats for a employee

    public function getEmployeeProgress($employeeId)
    {
        $employee = Employee::findOrFail($employeeId);
        
        $totalTasks = EmployeeOnboarding::where('employee_id', $employeeId)->count();
        $completedTasks = EmployeeOnboarding::where('employee_id', $employeeId)
            ->where('status', 'completed')
            ->count();
        
        $progressPercentage = $totalTasks > 0 
            ? round(($completedTasks / $totalTasks) * 100) 
            : 0;
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'employee' => $employee->only(['id', 'first_name', 'last_name']),
                'total_tasks' => $totalTasks,
                'completed_tasks' => $completedTasks,
                'progress_percentage' => $progressPercentage,
            ]
        ]);
    }



}
