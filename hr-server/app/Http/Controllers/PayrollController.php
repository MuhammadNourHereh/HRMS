<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payroll;

class PayrollController extends Controller
{
    // Get all payrolls
    public function index()
    {
        return response()->json(Payroll::all(), 200);
    }

    // Get a specific payroll by ID
    public function show($id)
    {
        $payroll = Payroll::find($id);
        if (!$payroll) {
            return response()->json(['message' => 'Payroll not found'], 404);
        }
        return response()->json($payroll, 200);
    }

    // Store a new payroll
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'amount' => 'required|numeric|min:0',
            'payroll_details' => 'required|json',
            'payed_at' => 'nullable|date',
        ]);

        $payroll = Payroll::create($validated);
        return response()->json($payroll, 201);
    }

    // Update an existing payroll
    public function update(Request $request, $id)
    {
        $payroll = Payroll::find($id);
        if (!$payroll) {
            return response()->json(['message' => 'Payroll not found'], 404);
        }

        $validated = $request->validate([
            'employee_id' => 'sometimes|exists:employees,id',
            'amount' => 'sometimes|numeric|min:0',
            'payroll_details' => 'sometimes|json',
            'payed_at' => 'sometimes|date',
        ]);

        $payroll->update($validated);
        return response()->json($payroll, 200);
    }

    // Delete a payroll (soft delete)
    public function destroy($id)
    {
        $payroll = Payroll::find($id);
        if (!$payroll) {
            return response()->json(['message' => 'Payroll not found'], 404);
        }

        $payroll->delete();
        return response()->json(['message' => 'Payroll deleted successfully'], 200);
    }
}

