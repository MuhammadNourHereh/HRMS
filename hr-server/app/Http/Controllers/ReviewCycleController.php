<?php

namespace App\Http\Controllers;

use App\Models\ReviewCycle;
use App\Models\Employee;
use Illuminate\Http\Request;

class ReviewCycleController extends Controller
{
    public function getReviewCycles(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        
        $reviewCycles = ReviewCycle::with('hr')
            ->orderBy('start_date', 'desc')
            ->paginate($perPage);
        
        return response()->json([
            'status' => 'success',
            'data' => $reviewCycles
        ]);
    }

    public function getReviewCycleById($id)
    {
        $reviewCycle = ReviewCycle::with(['goals', 'performanceReviews', 'feedbacks'])
            ->findOrFail($id);
        
        return response()->json([
            'status' => 'success',
            'data' => $reviewCycle
        ]);
    }

    public function addOrUpdateReviewCycle(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'provided_hr_id' => 'required|exists:employees,id',
                'cycle_name' => 'required|string',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after:start_date',
            ]);
            
            $hrEmployee = Employee::where('id', $validatedData['provided_hr_id'])
                ->where('role', 'hr')
                ->first();
                
            if (!$hrEmployee) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'The provided HR ID must belong to an employee with HR role'
                ], 422);
            }
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        if ($id === 'add') {
            $reviewCycle = ReviewCycle::create($validatedData);
            $message = 'Review cycle created successfully';
        } else {
            $reviewCycle = ReviewCycle::findOrFail($id);
            $reviewCycle->update($validatedData);
            $message = 'Review cycle updated successfully';
        }

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $reviewCycle
        ]);
    }

    public function deleteReviewCycle($id)
    {
        $reviewCycle = ReviewCycle::findOrFail($id);
        $reviewCycle->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Review cycle deleted successfully'
        ]);
    }
    
    public function getCurrentReviewCycle()
    {
        $currentDate = now()->format('Y-m-d');
        
        $reviewCycle = ReviewCycle::where('start_date', '<=', $currentDate)
            ->where('end_date', '>=', $currentDate)
            ->with('hr')
            ->first();
            
        if (!$reviewCycle) {
            return response()->json([
                'status' => 'error',
                'message' => 'No active review cycle found for the current date'
            ], 404);
        }
        
        return response()->json([
            'status' => 'success',
            'data' => $reviewCycle
        ]);
    }
    
    public function getUpcomingReviewCycles()
    {
        $currentDate = now()->format('Y-m-d');
        
        $reviewCycles = ReviewCycle::where('start_date', '>', $currentDate)
            ->with('hr')
            ->orderBy('start_date')
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $reviewCycles
        ]);
    }
}