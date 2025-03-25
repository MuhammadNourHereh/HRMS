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
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

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

    public function addOrUpdateEmployee(Request $request, $id=null)
    {
        $rules = [
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
        ];

        if ($id === 'add') {
            $rules['email'] = 'required|email|unique:employees,email';
            $rules['password'] = 'required|string|min:8';
        } else {
            if ($request->has('email')) {
                $rules['email'] = 'email|unique:employees,email,' . $id;
            }
            if ($request->has('password')) {
                $rules['password'] = 'string|min:8';
            }
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();

        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        if ($id === 'add') {
            $employee = Employee::create($validatedData);
            $message = 'Employee created successfully';
        } else {
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

    //  AUTHENTICATION METHODS

    public function all()
    {
        $employees = Employee::all();
        $status = $employees->isEmpty() ? 204 : 200;
        return response()->json($employees, $status);
    }

    public function me()
    {
        return response()->json(Auth::guard('employee')->user());
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "msg" => "missing attr",
                "errors" => $validator->errors()
            ], 422);
        }
        
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
        $employee->token = JWTAuth::fromUser($employee);

        return response()->json([
            "success" => true,
            "employee" => $employee
        ]);
    }
    
    public function logout()
    {
        Auth::guard('employee')->logout();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }
}