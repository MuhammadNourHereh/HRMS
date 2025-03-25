<?php




use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;

// version v0.1
Route::group(["prefix" => "v0.1", 'middleware' => 'api'], function () {
    // Unauthorized APIs
    Route::get('/getEmployees', [EmployeeController::class, "getEmployees"]);
    Route::get('/getEmployeeById/{id}', [EmployeeController::class, "getEmployeeById"]);
    Route::post('/addOrUpdateEmployee/{id}', [EmployeeController::class, "addOrUpdateEmployee"]);
    Route::post('/deleteEmployee/{id}', [EmployeeController::class, "deleteEmployee"]);

    // Authorized APIs
    Route::middleware('auth:api')->group(function () {
        // Your protected routes will go here
    });
});
