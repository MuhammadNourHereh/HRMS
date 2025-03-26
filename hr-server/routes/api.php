<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\MainClockedWorkers;
use App\Http\Controllers\OvertimeController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\DeductionController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\LeavePolicyController;
use App\Http\Controllers\ReviewCycleController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\OnboardingTaskController;
use App\Http\Controllers\PerformancesReviewController;
use App\Http\Controllers\deleteUpdateDisplayDocumentController;
use App\Http\Controllers\GoalController;

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

        // performance reviews
        Route::prefix('performance-reviews')->group(function () {
            Route::get('/get-performance-reviews', [PerformancesReviewController::class, "getPerformanceReviews"]);
            Route::get('/get-performance-review-by-id/{id}', [PerformancesReviewController::class, "getPerformanceReviewById"]);
            Route::post('/add-update-performance-review/{id}', [PerformancesReviewController::class, "addOrUpdatePerformanceReview"]);
            Route::post('/delete-performance-review/{id}', [PerformancesReviewController::class, "deletePerformanceReview"]);
            Route::get('/get-employee-performance-reviews/{employeeId}', [PerformancesReviewController::class, "getEmployeePerformanceReviews"]);
            Route::get('/get-review-cycle-performance-reviews/{reviewCycleId}', [PerformancesReviewController::class, "getReviewCyclePerformanceReviews"]);
        });
        // goals
        Route::prefix('goals')->group(function () {
            Route::get('/get-goals', [GoalController::class, 'getGoals']);
            Route::get('/get-goal-by-id/{id}', [GoalController::class, 'getGoalById']);
            Route::post('/add-update-goal/{id}', [GoalController::class, 'addOrUpdateGoal']);
            Route::post('/delete-goal/{id}', [GoalController::class, 'deleteGoal']);
            Route::get('/get-employee-goals/{employeeId}', [GoalController::class, 'getEmployeeGoals']);
            Route::get('/get-review-cycle-goals/{reviewCycleId}', [GoalController::class, 'getReviewCycleGoals']);
        });
        Route::get('/leaves', [LeaveController::class, 'index']);
        Route::get('/leaves/department/{departmentId}', [LeaveController::class, 'getByDepartment']);

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


        Route::prefix('users')->group(function () {
            Route::get('/me', [EmployeeController::class, "me"]);
            Route::post('/logout', [EmployeeController::class, "logout"]);
        });


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

        Route::post('/documents/upload/test', function () {
            return response()->json(['message' => 'API is working!']);
        });
    });

    // Employee Clocking Routes
    Route::post('/clock-in', [MainClockedWorkers::class, 'clockIn']);
    Route::post('/clock-out', [MainClockedWorkers::class, 'clockOut']);
});
        // Employee Clocking Routes
        Route::post('/clock-in', [MainClockedWorkers::class, 'clockIn']);
        Route::post('/clock-out', [MainClockedWorkers::class, 'clockOut']);

        Route::post('/documents/upload/test', function () {
            return response()->json(['message' => 'API is working!']);
        });

        //Candidate Routes 
        Route::prefix('candidates')->group(function () {
            Route::get('/', [CandidateController::class, 'getCandidates']);
            Route::get('/{id}', [CandidateController::class, 'getCandidateById']);
            Route::post('/{id}', [CandidateController::class, 'addOrUpdateCandidate']);
            Route::delete('/{id}', [CandidateController::class, 'deleteCandidate']);
            Route::put('/{id}/status', [CandidateController::class, 'updateCandidateStatus']);
            Route::get('/status/{status}', [CandidateController::class, 'getCandidatesByStatus']);
        });

        //onboarding Task Routes

        Route::prefix('onboarding-tasks')->group(function () {
            
            Route::post('/assign', [OnboardingTaskController::class, 'assignTaskToEmployee']);
            Route::put('/status/{id}', [OnboardingTaskController::class, 'updateTaskStatus']);
            Route::get('/employee/{employeeId}', [OnboardingTaskController::class, 'getEmployeeOnboardingTasks']);
            Route::post('/template', [OnboardingTaskController::class, 'createTemplate']);
            Route::post('/template/apply', [OnboardingTaskController::class, 'applyTemplateToEmployee']);
            Route::get('/progress/{employeeId}', [OnboardingTaskController::class, 'getEmployeeProgress']);
            Route::get('/', [OnboardingTaskController::class, 'getTasks']);
            Route::get('/{id}', [OnboardingTaskController::class, 'getTaskById']);
            Route::post('/{id}', [OnboardingTaskController::class, 'addOrUpdateTask']);
            Route::delete('/{id}', [OnboardingTaskController::class, 'deleteTask']);
        });
    


    


