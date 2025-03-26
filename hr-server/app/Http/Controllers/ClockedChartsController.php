<?php

namespace App\Http\Controllers;

use App\Models\ClockedWorker;
use Illuminate\Http\Request;

class ClockedChartsController extends Controller
{
    /**
     * Fetch clocked workers data (id, employee_id, longitude, latitude, clock_out_time, created_at).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getClockedWorkersData()
    {
        // Fetch the data including related employee data
        $clockedWorkers = ClockedWorker::select('id', 'employee_id', 'longitude', 'latitude', 'clock_out_time', 'created_at')
            ->with('employee') // Optional: eager load employee data if needed
            ->get();

        // Return the data as a JSON response
        return response()->json($clockedWorkers);
    }
}
