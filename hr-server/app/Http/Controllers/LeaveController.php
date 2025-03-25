<?php

namespace App\Http\Controllers;

use Exception;

use App\Models\Leave;
use App\Models\LeavePolicy;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class LeaveController extends Controller
{
    public function index()
    {
        $leaves = Leave::with('employee')->get();

        return response()->json([
            'status' => 'success',
            'data' => $leavePolicies
        ]);
    }

    public function getByDepartment($departmentName)
    {
        $leaves = Leave::whereHas('employee.department', function ($query) use ($departmentName) {
            $query->where('name', $departmentName);
        })->with('employee')->get();

        return response()->json([
            'status' => 'success',
            'data' => $leavePolicies
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

        $policy = LeavePolicy::findOrFail($validated['leave_policy_id']);

        if ($policy->employee_id != auth()->id()) {
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
                'reason' => $validated['reason']
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
            'status' => 'Approved',
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
