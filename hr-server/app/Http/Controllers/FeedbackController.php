<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\Employee;
use App\Models\ReviewCycle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FeedbackController extends Controller
{
   
    public function getFeedbacks(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        
        $feedbacks = Feedback::with(['employee', 'reviewCycle'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
        
        return response()->json([
            'status' => 'success',
            'data' => $feedbacks
        ]);
    }

   
    public function getFeedbackById($id)
    {
        $feedback = Feedback::with(['employee', 'reviewCycle'])
            ->findOrFail($id);
        
        return response()->json([
            'status' => 'success',
            'data' => $feedback
        ]);
    }

  
    public function addOrUpdateFeedback(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'employee_id' => 'required|exists:employees,id',
            'review_cycle_id' => 'required|exists:review_cycles,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
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
            $feedback = Feedback::create($validatedData);
            $message = 'Feedback created successfully';
        } else {
            $feedback = Feedback::findOrFail($id);
            $feedback->update($validatedData);
            $message = 'Feedback updated successfully';
        }

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $feedback
        ]);
    }

   
    public function deleteFeedback($id)
    {
        $feedback = Feedback::findOrFail($id);
        $feedback->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Feedback deleted successfully'
        ]);
    }
    
 
    public function getEmployeeFeedbacks($employeeId)
    {
        $employee = Employee::findOrFail($employeeId);
        
        $feedbacks = Feedback::with('reviewCycle')
            ->where('employee_id', $employeeId)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'employee' => $employee,
                'feedbacks' => $feedbacks
            ]
        ]);
    }
    
   
    public function getReviewCycleFeedbacks($reviewCycleId)
    {
        $reviewCycle = ReviewCycle::findOrFail($reviewCycleId);
        
        $feedbacks = Feedback::with('employee')
            ->where('review_cycle_id', $reviewCycleId)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'review_cycle' => $reviewCycle,
                'feedbacks' => $feedbacks
            ]
        ]);
    }
}