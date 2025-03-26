<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\MainClockedWorkers;
use App\Http\Controllers\OvertimeController;
use App\Http\Controllers\DeductionController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\ReviewCycleController;
use App\Http\Controllers\LeavePolicyController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\deleteUpdateDisplayDocumentController;

Route::group(["prefix" => "v0.1"], function () {
    // Unauthorized APIs
    Route::post('/login', [EmployeeController::class, "login"]);
    // authorised apis
    Route::get('/leaves', [LeaveController::class, 'index']);
    Route::get('/leaves/department/{departmentId}', [LeaveController::class, 'getByDepartment']);
    Route::patch('/leave/{leave}/approve', [LeaveController::class, 'approve']);
    Route::patch('/leave/{leave}/reject', [LeaveController::class, 'reject']);
    
    Route::middleware('auth:employee')->group(function () {
        Route::group(["prefix" => "hr", "middleware" => "isHr"], function(){
            Route::prefix('users')->group(function () {
                Route::get('/me', [UserController::class, "me"]);
                Route::post('/logout', [UserController::class, "logout"]);
                Route::put('/me', [UserController::class, "update"]);
                Route::delete('/me', [UserController::class, "destroy"]);
                Route::put('/{id}', [UserController::class, "update"]);
                Route::delete('/{id}', [UserController::class, "destroy"]);
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
            
    
            Route::prefix('users')->group(function () {
                Route::get('/me', [EmployeeController::class, "me"]);
                Route::post('/logout', [EmployeeController::class, "logout"]);
            });



        
            Route::prefix('leave-policies')->group(function () {
                Route::get('/', [LeavePolicyController::class, 'index']); 
                Route::get('/{employeeId}', [LeavePolicyController::class, 'show']); 
            });
        
            Route::prefix('enrollments')->group(function () {
                Route::get('/', [EnrollmentController::class, 'index']);
                Route::post('/', [EnrollmentController::class, 'store']);
                Route::get('{id}', [EnrollmentController::class, 'show']);
                Route::put('{enrollment}', [EnrollmentController::class, 'update']);
            });
            
            Route::get('/programs', [ProgramController::class, 'index']);
            Route::get('/program/{program}', [ProgramController::class, 'show']);
        
            Route::get('/certifications', [CertificationController::class, 'pending']);
            Route::put('/certifications/{certification}', [CertificationController::class, 'approve']);
            
            Route::post('/documents/upload/test', function () {
                return response()->json(['message' => 'API is working!']);
            });
        });

        // Employee Clocking Routes
        Route::post('/clock-in', [MainClockedWorkers::class, 'clockIn']);
        Route::post('/clock-out', [MainClockedWorkers::class, 'clockOut']);

    });
});

