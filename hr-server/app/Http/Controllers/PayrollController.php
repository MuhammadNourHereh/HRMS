<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payroll;
use Illuminate\Support\Facades\Validator;

class PayrollController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 5);
        $payrolls = Payroll::all()
            ->paginate($perPage);
        return response()->json($payrolls, 200);
    }

    public function show($id)
    {
        $payroll = Payroll::find($id);
        if (!$payroll) {
            return response()->json(['message' => 'Payroll not found'], 404);
        }
        return response()->json($payroll, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'employee_id' => 'required|exists:employees,id',
            'amount' => 'required|numeric|min:0',
            'payroll_details' => 'required|json',
            'payed_at' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $validated = $validator->validated();

        $payroll = Payroll::create($validated);
        return response()->json($payroll, 201);
    }

    public function update(Request $request, $id)
    {
        $payroll = Payroll::find($id);

        if (!$payroll) {
            return response()->json(['message' => 'Payroll not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'employee_id' => 'sometimes|exists:employees,id',
            'amount' => 'sometimes|numeric|min:0',
            'payroll_details' => 'sometimes|json',
            'payed_at' => 'sometimes|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $validated = $validator->validated();

        $payroll->update($validated);
        return response()->json($payroll, 200);
    }

    public function destroy($id)
    {
        $payroll = Payroll::find($id);
        if (!$payroll) {
            return response()->json(['message' => 'Payroll not found'], 404);
        }
        // Delete a payroll (soft delete)
        $payroll->delete();
        return response()->json(['message' => 'Payroll deleted successfully'], 200);
    }
}
