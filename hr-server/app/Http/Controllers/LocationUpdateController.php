<?php

namespace App\Http\Controllers;

use App\Models\LocationUpdate;
use Illuminate\Http\Request;

class LocationUpdateController extends Controller
{
    // Method to store the location update
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id', // Validate employee_id
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'timestamp' => 'required|date',
        ]);

        // Save the location update to the database
        $locationUpdate = LocationUpdate::create([
            'employee_id' => $validated['employee_id'],
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'timestamp' => $validated['timestamp'],
        ]);

        // Return a response confirming the save
        return response()->json([
            'message' => 'Location updated successfully',
            'data' => $locationUpdate
        ], 200);
    }
}
