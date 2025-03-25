<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Department;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Exception;

class EmployeeController extends Controller
{
    // Get all employees with pagination (existing functionality)
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

    // Get employee by ID (existing functionality)
    public function getEmployeeById($id)
    {
        $employee = Employee::with(['department', 'position'])->findOrFail($id);
        
        return response()->json([
            'status' => 'success',
            'data' => $employee
        ]);
    }

    // Add or update employee (existing functionality)
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

    // Delete employee (existing functionality)
    public function deleteEmployee($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Employee deleted successfully'
        ]);
    }

    // NEW AUTHENTICATION METHODS

    // Get all employees (simplified version without pagination for auth purposes)
    public function all()
    {
        $employees = Employee::all();
        $status = $employees->isEmpty() ? 204 : 200;
        return response()->json($employees, $status);
    }

    // Get the currently authenticated employee
    public function me()
    {
        return response()->json(Auth::guard('employee')->user());
    }

   

    // Employee login with token
    public function login(Request $request)
    {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                "msg" => "missing attr",
                "errors" => $validator->errors()
            ], 422);
        }
        
        // Login credentials
        $credentials = [
            "email" => $request["email"],
            "password" => $request["password"]
        ];

        if (!$token = Auth::guard('employee')->attempt($credentials)) {
            return response()->json([
                "success" => false,
                "error" => "Unauthorized"
            ], 401);
        }

        $employee = Auth::guard('employee')->user();
        $employee->token = $token;

        return response()->json([
            "success" => true,
            "employee" => $employee
        ]);
    }
    
    // Logout employee
    public function logout()
    {
        Auth::guard('employee')->logout();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }
}