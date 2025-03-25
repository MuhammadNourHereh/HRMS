<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Department;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
   
    public function getEmployees(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        
        $employees = Employee::with(['department', 'position'])
            ->orderBy('last_name')
            ->orderBy('first_name')
            ->paginate($perPage);
        
        return response()->json([
            'status' => 'success',
            'data' => $employees
        ]);
    }

    public function getEmployeeById($id)
    {
        $employee = Employee::with(['department', 'position'])->findOrFail($id);
        
        return response()->json([
            'status' => 'success',
            'data' => $employee
        ]);
    }

    public function addOrUpdateEmployee(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'department_id' => 'required|exists:departments,id',
                'position_id' => 'required|exists:positions,id',
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'date_of_birth' => 'required|date',
                'address' => 'required|string',
                'phone_number' => 'required|string',
                'gender' => 'required|in:male,female',
                'role' => 'required|in:employee,hr',
                'salary' => 'required|numeric|min:0',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        if ($id === 'add') {
            try {
                $request->validate([
                    'email' => 'required|email|unique:employees,email',
                    'password' => 'required|string|min:8',
                ]);
            } catch (\Illuminate\Validation\ValidationException $e) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $e->errors()
                ], 422);
            }

            $validatedData['password'] = Hash::make($request->password);
            $validatedData['email'] = $request->email;

            $employee = Employee::create($validatedData);
            $message = 'Employee created successfully';
        } else {
            if ($request->has('email')) {
                try {
                    $request->validate([
                        'email' => 'email|unique:employees,email,' . $id,
                    ]);
                } catch (\Illuminate\Validation\ValidationException $e) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Email validation failed',
                        'errors' => $e->errors()
                    ], 422);
                }
                $validatedData['email'] = $request->email;
            }
            
            if ($request->has('password')) {
                try {
                    $request->validate([
                        'password' => 'string|min:8',
                    ]);
                } catch (\Illuminate\Validation\ValidationException $e) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Password validation failed',
                        'errors' => $e->errors()
                    ], 422);
                }
                $validatedData['password'] = Hash::make($request->password);
            }

            $employee = Employee::findOrFail($id);
            $employee->update($validatedData);
            $message = 'Employee updated successfully';
        }

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $employee
        ]);
    }

   
    public function deleteEmployee($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Employee deleted successfully'
        ]);
    }
}