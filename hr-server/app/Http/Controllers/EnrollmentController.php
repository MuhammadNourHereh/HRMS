<?php

namespace App\Http\Controllers;
use App\Models\Enrollment;

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
            'employee_ids' => 'required|array', 
            'employee_ids.*' => 'exists:employees,id',
            'program_id' => 'required|exists:programs,id'
        ]);
        
        $programId = $request->input('program_id');
        $employeeIds = $request->input('employee_ids');

        $enrollments = [];

        foreach ($employeeIds as $employeeId) {
            $enrollments[] = Enrollment::create([
                'program_id' => $programId,
                'employee_id' => $employeeId,
                'status' => 'InProgress' 
            ]);
        }
        return response()->json([
            'message' => 'Employees enrolled successfully!',
            'enrollments' => $enrollments
        ], 201);    
    }

    public function show($id)
    {
    $enrollment = Enrollment::with(['program', 'employee'])->findOrFail($id);
    
    return response()->json([
        'status' => 'success',
        'data' => $enrollment
    ]);
    }

    public function update(Request $request, Enrollment $enrollment)
    {
        $validated = $request->validate([
            'score' => 'sometimes|nullable|numeric|min:0|max:100',
            'progress' => 'sometimes|nullable|numeric|min:0|max:100',
            'completion_date' => 'sometimes|nullable|date',
        ]);
    
        $fillableFields = ['score', 'progress', 'completion_date'];
        $updateData = array_intersect_key($validated, array_flip($fillableFields));
        
        if (!empty($updateData)) {
            $enrollment->update($updateData);
        }
    
        return response()->json($enrollment->fresh());
    }

    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();

        return response()->json(['message' => 'Enrollment deleted successfully']);
    }
}
