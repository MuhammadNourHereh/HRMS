<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use App\Models\Employee;
use App\Models\ReviewCycle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GoalController extends Controller
{
  
    public function getGoals(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        
        $goals = Goal::with(['employee', 'reviewCycle', 'progresses'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
        
        return response()->json([
            'status' => 'success',
            'data' => $goals
        ]);
    }

  
    public function getGoalById($id)
    {
        $goal = Goal::with(['employee', 'reviewCycle', 'progresses'])
            ->findOrFail($id);
        
        return response()->json([
            'status' => 'success',
            'data' => $goal
        ]);
    }


    public function addOrUpdateGoal(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'employee_id' => 'required|exists:employees,id',
            'review_cycle_id' => 'required|exists:review_cycles,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:Low,Medium,High',
            'status' => 'sometimes|in:Not Started,In Progress,Completed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();

        if (!isset($validatedData['status'])) {
            $validatedData['status'] = 'Not Started';
        }

        if ($id === 'add') {
            $goal = Goal::create($validatedData);
            $message = 'Goal created successfully';
        } else {
            $goal = Goal::findOrFail($id);
            $goal->update($validatedData);
            $message = 'Goal updated successfully';
        }

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $goal
        ]);
    }
    public function deleteGoal($id)
    {
        $goal = Goal::findOrFail($id);
        $goal->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Goal deleted successfully'
        ]);
    }
    
    
    public function getEmployeeGoals($employeeId)
    {
        $employee = Employee::findOrFail($employeeId);
        
        $goals = Goal::with(['reviewCycle', 'progresses'])
            ->where('employee_id', $employeeId)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'employee' => $employee,
                'goals' => $goals
            ]
        ]);
    }
    
   
    public function getReviewCycleGoals($reviewCycleId)
    {
        $reviewCycle = ReviewCycle::findOrFail($reviewCycleId);
        
        $goals = Goal::with(['employee', 'progresses'])
            ->where('review_cycle_id', $reviewCycleId)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'review_cycle' => $reviewCycle,
                'goals' => $goals
            ]
        ]);
    }
}