<?php
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\LeavePolicyController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(["prefix" => "v0.1"], function () {
    // Unauthorized APIs

    // authorised apis
    Route::middleware('auth:api')->group(function () {
        Route::group(["prefix" => "hr", "middleware" => "isHr"], function(){
            Route::get('/getEmployees', [EmployeeController::class, "getEmployees"]);
            Route::get('/getEmployeeById/{id}', [EmployeeController::class, "getEmployeeById"]);
            Route::post('/addOrUpdateEmployee/{id}', [EmployeeController::class, "addOrUpdateEmployee"]);
            Route::post('/deleteEmployee/{id}', [EmployeeController::class, "deleteEmployee"]);
            Route::get('/leaves', [LeaveController::class, 'index']);
            Route::get('/leaves/department/{departmentId}', [LeaveController::class, 'getByDepartment']);
        
            Route::patch('/leave/{leave}/approve', [LeaveController::class, 'approve']);
            Route::patch('/leave/{leave}/reject', [LeaveController::class, 'reject']);
        
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
        });
    });
});
