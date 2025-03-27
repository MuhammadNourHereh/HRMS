<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{

    public function getDepartments()
    {
        $departments = Department::orderBy('department_name')->get();

        return response()->json([
            'status' => 'success',
            'data' => $departments
        ]);
    }
}