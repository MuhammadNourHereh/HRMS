<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Overtime;

class OvertimeController extends Controller
{
    // Get all overtime records
    public function index()
    {
        return response()->json(Overtime::all(), 200);
    }

    // Get a specific overtime record by ID
    public function show($id)
    {
        $overtime = Overtime::find($id);
        if (!$overtime) {
            return response()->json(['message' => 'Overtime record not found'], 404);
        }
        return response()->json($overtime, 200);
    }

    // Store a new overtime record
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'hours' => 'required|numeric|min:0',
            'pay_rate' => 'required|numeric|min:0',
            'payed_at' => 'nullable|date',
        ]);

        $overtime = Overtime::create($validated);
        return response()->json($overtime, 201);
    }

    // Update an existing overtime record
    public function update(Request $request, $id)
    {
        $overtime = Overtime::find($id);
        if (!$overtime) {
            return response()->json(['message' => 'Overtime record not found'], 404);
        }

        $validated = $request->validate([
            'employee_id' => 'sometimes|exists:employees,id',
            'hours' => 'sometimes|numeric|min:0',
            'pay_rate' => 'sometimes|numeric|min:0',
            'payed_at' => 'sometimes|date',
        ]);

        $overtime->update($validated);
        return response()->json($overtime, 200);
    }

    // Delete an overtime record (soft delete)
    public function destroy($id)
    {
        $overtime = Overtime::find($id);
        if (!$overtime) {
            return response()->json(['message' => 'Overtime record not found'], 404);
        }

        $overtime->delete();
        return response()->json(['message' => 'Overtime record deleted successfully'], 200);
    }
}
