<?php

namespace App\Http\Controllers;

use App\Models\Salary;
use Illuminate\Http\Request;

class SalaryController extends Controller
{
    // Get all salaries
    public function index()
    {
        return response()->json(Salary::all(), 200);
    }

    // Get a specific salary by ID
    public function show($id)
    {
        $salary = Salary::find($id);
        if (!$salary) {
            return response()->json(['message' => 'Salary not found'], 404);
        }
        return response()->json($salary, 200);
    }

    // Store a new salary
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'amount' => 'required|numeric|min:0',
            'paid_at' => 'date',
        ]);

        $salary = Salary::create($validated);
        return response()->json($salary, 201);
    }

    // Update an existing salary
    public function update(Request $request, $id)
    {
        $salary = Salary::find($id);
        if (!$salary) {
            return response()->json(['message' => 'Salary not found'], 404);
        }

        $validated = $request->validate([
            'employee_id' => 'sometimes|exists:employees,id',
            'amount' => 'sometimes|numeric|min:0',
            'paid_at' => 'sometimes|date',
        ]);

        $salary->update($validated);
        return response()->json($salary, 200);
    }

    // Delete a salary
    public function destroy($id)
    {
        $salary = Salary::find($id);
        if (!$salary) {
            return response()->json(['message' => 'Salary not found'], 404);
        }

        $salary->delete();
        return response()->json(['message' => 'Salary deleted successfully'], 200);
    }
}

