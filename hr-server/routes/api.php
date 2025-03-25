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
        Route::get('/leaves', [LeaveController::class, 'index']);
        Route::get('/leaves/department/{departmentName}', [LeaveController::class, 'getByDepartment']);
        Route::patch('/leave/{leave}/approve', [LeaveController::class, 'approve']);
        Route::patch('/leave/{leave}/reject', [LeaveController::class, 'reject']);
        Route::prefix('leave-policies')->group(function () {
            Route::get('/', [LeavePolicyController::class, 'index']); 
            Route::get('/{employeeId}', [LeavePolicyController::class, 'show']); 
            Route::post('/', [LeavePolicyController::class, 'store']); 
            Route::put('/{id}', [LeavePolicyController::class, 'update']); 
            Route::delete('/{id}', [LeavePolicyController::class, 'destroy']);
        });
        Route::get('/programs', [ProgramController::class, 'index']);
        Route::get('/programs/{program}', [ProgramController::class, 'show']);
    });
});
