<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
  
    public function getPositions()
    {
        $positions = Position::orderBy('position_name')->get();

        return response()->json([
            'status' => 'success',
            'data' => $positions
        ]);
    }
}