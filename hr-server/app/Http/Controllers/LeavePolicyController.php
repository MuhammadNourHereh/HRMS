<?php

namespace App\Http\Controllers;

use App\Models\LeavePolicy;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class LeavePolicyController extends Controller
{
        public function index()
        {
            $policies = LeavePolicy::all();
            return response()->json([
                'status' => 'success', 
                'data' => $policies
            ]);
        }
    
        public function show($employeeId)
        {
            $policies = LeavePolicy::where('employee_id', $employeeId)->get();
            
            if ($policies->isEmpty()) {
                return response()->json([
                    'status' => 'error', 
                    'message' => 'No leave policies found'
                ], 404);
            }
    
            return response()->json([
                'status' => 'success', 
                'data' => $policies
            ]);
        }
    
        public function store(Request $request)
        {
            try {
                $validated = $request->validate([
                    'employee_id' => 'required|exists:employees,id',
                    'leave_type' => 'required|string|in:annual,sick,casual,maternity,paternity',
                    'balance' => 'required|integer|min:0'
                ]);
            } catch (ValidationException $e) {
                return response()->json([
                    'status' => 'error', 
                    'message' => 'Validation failed', 
                    'errors' => $e->errors()
                ], 422);
            }
    
            $policy = LeavePolicy::create($validated);
            return response()->json([
                'status' => 'success', 
                'data' => $policy, 
                'message' => 'Leave policy created'
            ]);
        }
    
        public function update(Request $request, $id)
        {
            $policy = LeavePolicy::find($id);
    
            if (!$policy) {
                return response()->json([
                    'status' => 'error', 
                    'message' => 'Leave policy not found'
                ], 404);
            }
    
            try {
                $validated = $request->validate([
                    'leave_type' => 'sometimes|string|in:annual,sick,casual,maternity,paternity',
                    'balance' => 'sometimes|integer|min:0'
                ]);
            } catch (ValidationException $e) {
                return response()->json([
                    'status' => 'error', 
                    'message' => 'Validation failed', 
                    'errors' => $e->errors()
                ], 422);
            }
    
            $policy->update($validated);
            return response()->json(['status' => 'success', 'data' => $policy, 'message' => 'Leave policy updated successfully']);
        }
    
        public function destroy($id)
        {
            $policy = LeavePolicy::find($id);
    
            if (!$policy) {
                return response()->json([
                    'status' => 'error', 
                    'message' => 'Leave policy not found'
                ], 404);
            }
    
            $policy->delete();
            return response()->json([
                'status' => 'success', 
                'message' => 'Leave policy deleted successfully'
            ]);
        }
}
