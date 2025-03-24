<?php

namespace App\Http\Controllers;

use App\Models\ClockedWorker;
use Illuminate\Http\Request;

class MainClockedWorkers  extends Controller
{
    // Function to handle the Clock-in request
    public function clockIn(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',  // Validate employee exists
            'longitude' => 'nullable|numeric',
            'latitude' => 'nullable|numeric',
        ]);

        // Create a new clocked worker record
        ClockedWorker::create([
            'employee_id' => $request->employee_id,
            'longitude' => $request->longitude,
            'latitude' => $request->latitude,
        ]);

        return response()->json(['message' => 'Clocked in successfully.'], 200);
    }

    // (Optional) Function to handle the Clock-out request
    public function clockOut(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
        ]);

        $clockedWorker = ClockedWorker::where('employee_id', $request->employee_id)
            ->whereNull('clock_out_time') // Ensure this is the active clocked-in record
            ->first();

        if ($clockedWorker) {
            $clockedWorker->clock_out_time = now();
            $clockedWorker->save();

            return response()->json(['message' => 'Clocked out successfully.'], 200);
        }

        return response()->json(['message' => 'No active clock-in found for this employee.'], 404);
    }
}
