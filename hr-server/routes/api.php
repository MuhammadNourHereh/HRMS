<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\EmployeeController;

Route::group(["prefix" => "v0.1", 'middleware' => 'api'], function () {
    Route::get('/getEmployees', [EmployeeController::class, "getEmployees"]);
			Route::get('/getEmployeeById/{id}', [EmployeeController::class, "getEmployeeById"]);
            Route::post('/addOrUpdateEmployee/{id}', [EmployeeController::class, "addOrUpdateEmployee"]);
            Route::post('/deleteEmployee/{id}', [EmployeeController::class, "deleteEmployee"]);
        		});
