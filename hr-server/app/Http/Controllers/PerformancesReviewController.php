<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\ReviewCycle;
use App\Models\PerformancesReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PerformancesReviewController extends Controller
{

    public function getPerformanceReviews(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        
        $performanceReviews = PerformancesReview::with(['employee', 'reviewCycle'])
            ->orderBy(function($query) {
                $query->select('start_date')
                    ->from('review_cycles')
                    ->whereColumn('review_cycles.id', 'performances_reviews.review_cycle_id')
                    ->limit(1);
            }, 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
        
        return response()->json([
            'status' => 'success',
            'data' => $performanceReviews
        ]);
    }

    public function getPerformanceReviewById($id)
    {
        $performanceReview = PerformancesReview::with(['employee', 'reviewCycle', 'goals'])
            ->findOrFail($id);
        
        return response()->json([
            'status' => 'success',
            'data' => $performanceReview
        ]);
    }


    public function addOrUpdatePerformanceReview(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'employee_id' => 'required|exists:employees,id',
            'review_cycle_id' => 'required|exists:review_cycles,id',
            'overall_rating' => 'required|numeric|min:0|max:5',
            'comments' => 'required|string',
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
            $existingReview = PerformancesReview::where('employee_id', $validatedData['employee_id'])
                ->where('review_cycle_id', $validatedData['review_cycle_id'])
                ->first();
                
            if ($existingReview) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'A performance review for this employee in this review cycle already exists'
                ], 422);
            }
            
            $performanceReview = PerformancesReview::create($validatedData);
            $message = 'Performance review created successfully';
        } else {
            $performanceReview = PerformancesReview::findOrFail($id);
            $performanceReview->update($validatedData);
            $message = 'Performance review updated successfully';
        }

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $performanceReview
        ]);
    }

 
    public function deletePerformanceReview($id)
    {
        $performanceReview = PerformancesReview::findOrFail($id);
        $performanceReview->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Performance review deleted successfully'
        ]);
    }
    
 
    public function getEmployeePerformanceReviews($employeeId)
    {
        $employee = Employee::findOrFail($employeeId);
        
        $performanceReviews = PerformancesReview::with('reviewCycle')
            ->where('employee_id', $employeeId)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'employee' => $employee,
                'performance_reviews' => $performanceReviews
            ]
        ]);
    }
    

    public function getReviewCyclePerformanceReviews($reviewCycleId, Request $request)
{
    
    
    $perPage = $request->input('per_page', 10);
    
    $reviewCycle = ReviewCycle::findOrFail($reviewCycleId);
    
    $performanceReviews = PerformancesReview::with('employee')
        ->where('review_cycle_id', $reviewCycleId)
        ->orderBy('created_at', 'desc')
        ->paginate($perPage);
    
    return response()->json([
        'status' => 'success',
        'data' => $performanceReviews

    ]);
}
}