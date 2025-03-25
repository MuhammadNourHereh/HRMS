<?php

use App\Http\Controllers\DeductionController;
use App\Http\Controllers\OvertimeController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


// version v0.1
Route::group(["prefix" => "v0.1"], function () {
    // Unauthorized APIs
    Route::post('/login', [UserController::class, "login"]);
    Route::post('/signup', [UserController::class, "signUp"]);

    // authorised apis
    Route::middleware('auth:api')->group(function () {

        Route::prefix('users')->group(function () {
            Route::get('/me', [UserController::class, "me"]);
            Route::post('/logout', [UserController::class, "logout"]);
            Route::put('/me', [UserController::class, "update"]);
            Route::delete('/me', [UserController::class, "destroy"]);
            Route::put('/{id}', [UserController::class, "update"]);
            Route::delete('/{id}', [UserController::class, "destroy"]);
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
    });
});
