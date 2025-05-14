<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\CategoryController;

Route::post('/admin/login', [AuthController::class, 'authenticate']);

// Route::group(['middleware' => 'auth:sanctum'], function () {
//     Route::get('categories', [CategoryController::class, 'index']);
//     Route::post('categories', [CategoryController::class, 'store']);
//     Route::get('categories/{id}', [CategoryController::class, 'show']);
//     Route::put('categories/{id}', [CategoryController::class, 'update']);
//     Route::delete('categories/{id}', [CategoryController::class, 'destroy']);
// });

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('brands', BrandController::class);
});
