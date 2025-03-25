<?php


use App\Http\Controllers\DeductionController;
use App\Http\Controllers\deleteUpdateDisplayDocumentController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\MainClockedWorkers;
use App\Http\Controllers\OvertimeController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ReviewCycleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


// version v0.1
Route::group(["prefix" => "v0.1"], function () {
    // Unauthorized APIs
    Route::post('/login', [EmployeeController::class, "login"]);
    // authorised apis
    Route::middleware('auth:employee')->group(function () {
        Route::prefix('users')->group(function () {
            Route::get('/me', [EmployeeController::class, "me"]);
            Route::post('/logout', [EmployeeController::class, "logout"]);
        });

        Route::prefix('employees')->group(function () {
            Route::get('/get-employees', [EmployeeController::class, "getEmployees"]);
            Route::get('/get-employee-by-id/{id}', [EmployeeController::class, "getEmployeeById"]);
            Route::post('/add-update-employee/{id}', [EmployeeController::class, "addOrUpdateEmployee"]);
            Route::post('/delete-employee/{id}', [EmployeeController::class, "deleteEmployee"]);
        });

        Route::prefix('review-cycles')->group(function () {
            Route::get('/get-review-cycles', [ReviewCycleController::class, "getReviewCycles"]);
            Route::get('/get-review-cycle-by-id/{id}', [ReviewCycleController::class, "getReviewCycleById"]);
            Route::post('/add-update-review-cycle/{id}', [ReviewCycleController::class, "addOrUpdateReviewCycle"]);
            Route::post('/delete-review-cycle/{id}', [ReviewCycleController::class, "deleteReviewCycle"]);
        });

        // payrolls apis
        Route::prefix('salaries')->group(function () {

            Route::get('/', [SalaryController::class, 'index']);
            Route::get('{id}', [SalaryController::class, 'show']);
            Route::post('/', [SalaryController::class, 'store']);
            Route::put('{id}', [SalaryController::class, 'update']);
            Route::delete('{id}', [SalaryController::class, 'destroy']);
        });

        Route::prefix('deductions')->group(function () {
            Route::get('/', [DeductionController::class, 'index']);
            Route::get('{id}', [DeductionController::class, 'show']);
            Route::post('/', [DeductionController::class, 'store']);
            Route::put('{id}', [DeductionController::class, 'update']);
            Route::delete('{id}', [DeductionController::class, 'destroy']);
        });

        Route::prefix('payrolls')->group(function () {
            Route::get('/', [PayrollController::class, 'index']);
            Route::get('{id}', [PayrollController::class, 'show']);
            Route::post('/', [PayrollController::class, 'store']);
            Route::put('{id}', [PayrollController::class, 'update']);
            Route::delete('{id}', [PayrollController::class, 'destroy']);
        });

        Route::prefix('overtime-hours')->group(function () {
            Route::get('/', [OvertimeController::class, 'index']);
            Route::get('{id}', [OvertimeController::class, 'show']);
            Route::post('/', [OvertimeController::class, 'store']);
            Route::put('{id}', [OvertimeController::class, 'update']);
            Route::delete('{id}', [OvertimeController::class, 'destroy']);
        });
        // Document Routes (Upload, Get, Update, Delete)
        Route::prefix('documents')->group(function () {
            Route::post('/upload', [DocumentController::class, 'uploadDocument']); // Upload Document
            Route::get('/{id}', [deleteUpdateDisplayDocumentController::class, 'deleteUpdateDisplayDocument']); // Get Document by ID
            Route::put('/{id}/update', [deleteUpdateDisplayDocumentController::class, 'deleteUpdateDisplayDocument']); // Update Document
            Route::delete('/{id}/delete', [deleteUpdateDisplayDocumentController::class, 'deleteDocument']); // Separate method for DELETE Document
        });

        // Employee Clocking Routes
        Route::post('/clock-in', [MainClockedWorkers::class, 'clockIn']);
        Route::post('/clock-out', [MainClockedWorkers::class, 'clockOut']);

        Route::post('/documents/upload/test', function () {
            return response()->json(['message' => 'API is working!']);
        });
    });
});
