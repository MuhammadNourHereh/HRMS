<?php

use Illuminate\Support\Facades\Route;


// version v0.1
Route::group(["prefix" => "v0.1"], function () {
    // Unauthorized APIs


    // authorised apis
    Route::middleware('auth:api')->group(function () {

    });
});
