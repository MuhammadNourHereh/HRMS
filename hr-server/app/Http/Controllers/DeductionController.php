<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Deduction;

class DeductionController extends Controller
{
    // Get all deductions
    public function index()
    {
        return response()->json(Deduction::all(), 200);
    }

    // Get a specific deduction by ID
    public function show($id)
    {
        $deduction = Deduction::find($id);
        if (!$deduction) {
            return response()->json(['message' => 'Deduction not found'], 404);
        }
        return response()->json($deduction, 200);
    }

    // Store a new deduction
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'reason' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'percentage' => 'required|integer|min:0|max:100',
            'payed_at' => 'nullable|date',
        ]);

        $deduction = Deduction::create($validated);
        return response()->json($deduction, 201);
    }

    // Update an existing deduction
    public function update(Request $request, $id)
    {
        $deduction = Deduction::find($id);
        if (!$deduction) {
            return response()->json(['message' => 'Deduction not found'], 404);
        }

        $validated = $request->validate([
            'employee_id' => 'sometimes|exists:employees,id',
            'reason' => 'sometimes|string|max:255',
            'amount' => 'sometimes|numeric|min:0',
            'percentage' => 'sometimes|integer|min:0|max:100',
            'payed_at' => 'sometimes|date',
        ]);

        $deduction->update($validated);
        return response()->json($deduction, 200);
    }

    // Delete a deduction
    public function destroy($id)
    {
        $deduction = Deduction::find($id);
        if (!$deduction) {
            return response()->json(['message' => 'Deduction not found'], 404);
        }

        $deduction->delete();
        return response()->json(['message' => 'Deduction deleted successfully'], 200);
    }
}
