<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;

use App\Models\Leave;
use App\Models\LeavePolicy;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class LeaveController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10); 
        $leaves = Leave::with(['employee', 'leavePolicy']) ->where('status', 'Pending')->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'data' => $leaves->items(),
            'meta' => [
                'current_page' => $leaves->currentPage(),
                'per_page' => $leaves->perPage(),
                'total' => $leaves->total(),
                'last_page' => $leaves->lastPage()
            ]
        ]);
    }
    public function show($id)
    {
        $leave = Leave::with('leavePolicy')->findOrFail($id);
        return response()->json($leave);
    }
    public function getByDepartment(Request $request,$departmentId)
    {
        $perPage = $request->input('per_page', 10);
        $leaves = Leave::whereHas('employee.department', function ($query) use ($departmentId) {
            $query->where('id', $departmentId);
        })->with('employee')->paginate($perPage);;
    
        return response()->json([
            'status' => 'success',
            'data' => $leaves->items() ,
            'meta' => [
                'current_page' => $leaves->currentPage(),
                'per_page' => $leaves->perPage(),
                'total' => $leaves->total(),
                'last_page' => $leaves->lastPage()
            ]
        ]);
    }

    public function store(Request $request)
    {
        try{
            $validated = $request->validate([
            'leave_policy_id' => 'required|exists:leave_policies,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string|max:500',
            'is_paid' => 'boolean'
        ]);
        }catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }
        $validated['is_paid'] = $validated['is_paid'] ?? false;
        
        $policy = LeavePolicy::findOrFail($validated['leave_policy_id']);

        if (!$policy || $policy->employee_id != auth()->id()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized action'
            ], 403);        
        }

        $leaveDays = $this->calculateLeaveDays(
            $validated['start_date'],
            $validated['end_date']
        );

        if ($validated['is_paid'] && $policy->balance < $leaveDays) {
            return response()->json([
                'status' => 'error',
                'message' => 'Insufficient leave balance',
                'available' => $policy->balance,
                'requested' => $leaveDays
            ], 422);
        }

        try{
            $leave= Leave::create([
                'employee_id' => auth()->id(),
                'leave_policy_id' => $policy->id,
                'is_paid' => $validated['is_paid'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'reason' => $validated['reason'],
                'status' => 'pending'
            ]);

            return response()->json([
                'status' => 'success',
                'data' => $leave,
                'message' => 'Leave request submitted successfully'
            ]);

        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create leave request',
                'errors' => $e->getMessage()
            ], 422);
        }
    }

    private function calculateLeaveDays($startDate, $endDate)
    {
        $start = \Carbon\Carbon::parse($startDate);
        $end = \Carbon\Carbon::parse($endDate);
        
        return $start->diffInDaysFiltered(function ($date) {
            return !$date->isWeekend();
        }, $end) + 1;
    }

    public function cancel(Leave $leave)
    {
        if ($leave->employee_id !== auth()->id()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized action'
            ], 403);
        }

        if ($leave->status !== 'Pending') {
            return response()->json([
                'status' => 'error',
                'message' => 'Only pending leave requests can be canceled'
            ], 400);
        }

        $leave->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Leave request canceled'
        ]);
    }

    public function approve(Leave $leave)
    {
        if ($leave->status !== 'Pending') {
            return response()->json([
                'status' => 'error',
                'message' => 'Leave request is already processed'
            ], 400);
        }
        $leaveDays = $this->calculateLeaveDays(
           $leave->start_date,
           $leave->end_date,
        );
        if ($leave->is_paid) {
            $leavePolicy = $leave->leavePolicy;
            
            if ($leavePolicy->balance < $leaveDays) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Not enough balance to approve as paid leave',
                ], 422);
            }

            $leavePolicy->decrement('balance', $leaveDays);
        }

        $leave->update([
            'status' => 'Accepted',
        ]);
    
        return response()->json(['message' => 'Leave approved']);
    }

    public function reject(Leave $leave)
    {
        if ($leave->status !== 'Pending') {
            return response()->json([
                'status' => 'error',
                'message' => 'Only pending leave requests can be rejected'
            ], 400);
        }
    
        $leave->update([
            'status' => 'Rejected',
        ]);
    
        return response()->json([
            'status' => 'success',
            'message' => 'Leave request rejected',
            'data' => $leave
        ]);
    }
}
