<?php

use App\Http\Controllers\DocumentController;
use App\Http\Controllers\deleteUpdateDisplayDocumentController;
use App\Http\Controllers\MainClockedWorkers;
use App\Http\Controllers\ClockedChartsController; // Import your new controller
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Authentication Test Route
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

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

// Fetch Clocked Workers Data (New Route for ClockedChartsController)
Route::get('/clocked-workers', [ClockedChartsController::class, 'getClockedWorkersData']); // Add this route

Route::post('/documents/upload/test', function () {
    return response()->json(['message' => 'API is working!']);
});
