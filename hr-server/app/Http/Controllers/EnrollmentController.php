<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function index(Request $request)
    {
        return Enrollment::query()
            ->when($request->employee_id, function ($query) use ($request) {
                $query->where('employee_id', $request->employee_id);
            })
            ->when($request->program_id, function ($query) use ($request) {
                $query->where('program_id', $request->program_id);
            })
            ->when($request->status, function ($query) use ($request) {
                $query->where('status', $request->status);
            })
            ->with(['employee', 'program'])
            ->paginate(10);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'program_id' => 'required|exists:programs,id'
        ]);
    
        $enrollment = Enrollment::create([
            'employee_id' => $request->employee_id,
            'program_id' => $request->program_id,
            'status' => 'InProgress' 
        ]);
        return response()->json($enrollment, 201);
    }

    public function show(Enrollment $enrollment)
    {
        return response()->json($enrollment->load(['employee', 'program']));
    }

    public function update(Request $request, Enrollment $enrollment)
    {
        $validated = $request->validate([
            'score' => 'sometimes|nullable|numeric|min:0|max:100',
            'progress' => 'sometimes|nullable|numeric|min:0|max:100',
        ]);

        $enrollment->update($validated);

        return response()->json($enrollment);
    }

    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();

        return response()->json(['message' => 'Enrollment deleted successfully']);
    }
}
