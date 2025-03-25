<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(["prefix" => "v0.1"], function () {
    // Unauthorized APIs


    // authorised apis
    Route::middleware('auth:api')->group(function () {
        Route::get('/getEmployees', [EmployeeController::class, "getEmployees"]);
        Route::get('/getEmployeeById/{id}', [EmployeeController::class, "getEmployeeById"]);
        Route::post('/addOrUpdateEmployee/{id}', [EmployeeController::class, "addOrUpdateEmployee"]);
        Route::post('/deleteEmployee/{id}', [EmployeeController::class, "deleteEmployee"]);
        Route::patch('/leave/{leave}/approve', [LeaveController::class, 'approve']);
        Route::patch('/leave/{leave}/reject', [LeaveController::class, 'reject']);
    });
});
