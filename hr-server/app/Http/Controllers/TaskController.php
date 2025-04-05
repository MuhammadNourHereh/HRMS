<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Project;
use App\Models\Employee;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function getTasks(Request $request)
    {
        $perPage = $request->input('per_page', 10);
    
    $query = Task::with(['project', 'employee'])
        ->orderBy('created_at', 'desc');
    
    $tasks = $query->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'data' => $tasks
        ]);
    }

    //group tasks by status

    public function getTaskBoard(Request $request)
    {
        $projectId = $request->input('project_id', null);

        $query = Task::with(['project', 'employee']);

        // Filter by project
        if ($projectId) {
            $query->where('project_id', $projectId);
        }

        $tasks = $query->get();

        // Group tasks by status
        $pendingTasks = $tasks->where('status', 'pending');
        $inProgressTasks = $tasks->where('status', 'in_progress');
        $completedTasks = $tasks->where('status', 'completed');

        return response()->json([
            'status' => 'success',
            'data' => [
                'pending' => $pendingTasks,
                'in_progress' => $inProgressTasks,
                'completed' => $completedTasks
            ]
        ]);
    }

    public function getTaskById($id)
    {
        $task = Task::with(['project', 'employee'])->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $task
        ]);
    }


    public function addOrUpdateTask(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'employee_id' => 'nullable|exists:employees,id',
            'due_date' => 'nullable|date',
            'status' => 'nullable|in:pending,in_progress,completed',
            'priority' => 'nullable|in:low,medium,high'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($id === 'add') {
            
            $task = Task::create([
                'project_id' => $request->project_id,
                'title' => $request->title,
                'description' => $request->description,
                'employee_id' => $request->employee_id,
                'due_date' => $request->due_date,
                'status' => $request->status ?? 'pending',
                'priority' => $request->priority ?? 'medium'
            ]);

            $message = 'Task created successfully';
        } else {
            // Update existing task
            $task = Task::findOrFail($id);

            $task->project_id = $request->project_id;
            $task->title = $request->title;

            if ($request->has('description')) {
                $task->description = $request->description;
            }

            if ($request->has('employee_id')) {
                $task->employee_id = $request->employee_id;
            }

            if ($request->has('due_date')) {
                $task->due_date = $request->due_date;
            }

            if ($request->has('status')) {
                $task->status = $request->status;
            }

            if ($request->has('priority')) {
                $task->priority = $request->priority;
            }

            $task->save();
            $message = 'Task updated successfully';
        }

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $task->load(['project', 'employee'])
        ]);
    }



    public function deleteTask($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Task deleted successfully'
        ]);
    }


    //update task status
    public function updateTaskStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,in_progress,completed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $task = Task::findOrFail($id);
        $task->status = $request->status;
        $task->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Task status updated successfully',
            'data' => $task->load(['project', 'employee'])
        ]);
    }


    // assign task to employee
    public function assignTaskToEmployee(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'employee_id' => 'required|exists:employees,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $task = Task::findOrFail($id);
        $task->employee_id = $request->employee_id;
        $task->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Task assigned successfully',
            'data' => $task->load(['project', 'employee'])
        ]);
    }


    //get tasks assigned to specific emp

    public function getEmployeeTasks($employeeId)
    {
        $employee = Employee::findOrFail($employeeId);

        $tasks = Task::where('employee_id', $employeeId)
            ->with('project')
            ->orderBy('due_date')
            ->get();

        // Group tasks by status
        $pendingTasks = $tasks->where('status', 'pending');
        $inProgressTasks = $tasks->where('status', 'in_progress');
        $completedTasks = $tasks->where('status', 'completed');

        return response()->json([
            'status' => 'success',
            'data' => [
                'employee' => $employee->only(['id', 'first_name', 'last_name', 'email']),
                'pending' => $pendingTasks,
                'in_progress' => $inProgressTasks,
                'completed' => $completedTasks,
                'all_tasks' => $tasks
            ]
        ]);
    }

}
