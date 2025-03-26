<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use App\Models\GoalProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GoalProgressController extends Controller
{
    
    public function getGoalProgresses($goalId)
    {
        $goal = Goal::with(['employee', 'reviewCycle'])->findOrFail($goalId);
        
        $progresses = GoalProgress::where('goal_id', $goalId)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'goal' => $goal,
                'progresses' => $progresses
            ]
        ]);
    }

    
    public function getProgressById($id)
    {
        $progress = GoalProgress::with('goal.employee')->findOrFail($id);
        
        return response()->json([
            'status' => 'success',
            'data' => $progress
        ]);
    }

  
    public function addOrUpdateProgress(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'goal_id' => 'required|exists:goals,id',
            'progress_note' => 'required|string',
            'progress_bar' => 'required|numeric|min:0|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();

        if ($id === 'add') {
            $progress = GoalProgress::create($validatedData);
            $message = 'Progress update created successfully';
        } else {
            $progress = GoalProgress::findOrFail($id);
            $progress->update($validatedData);
            $message = 'Progress update modified successfully';
        }

        $goal = Goal::find($validatedData['goal_id']);
        
        if ($validatedData['progress_bar'] == 0) {
            $goal->status = 'Not Started';
        } elseif ($validatedData['progress_bar'] == 100) {
            $goal->status = 'Completed';
        } else {
            $goal->status = 'In Progress';
        }
        
        $goal->save();

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $progress
        ]);
    }

 
    public function deleteProgress($id)
    {
        $progress = GoalProgress::findOrFail($id);
        $progress->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Progress update deleted successfully'
        ]);
    }

 
    public function getLatestProgress($goalId)
    {
        $goal = Goal::findOrFail($goalId);
        
        $latestProgress = GoalProgress::where('goal_id', $goalId)
            ->orderBy('created_at', 'desc')
            ->first();
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'goal' => $goal,
                'latest_progress' => $latestProgress
            ]
        ]);
    }

   
}