<?php

use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\admin\TempImageController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;
use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\SizeController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
// Route::group(['middleware' => 'auth:sanctum'], function () {
//     Route::get('categories', [CategoryController::class, 'index']);
//     Route::post('categories', [CategoryController::class, 'store']);
//     Route::get('categories/{id}', [CategoryController::class, 'show']);
//     Route::put('categories/{id}', [CategoryController::class, 'update']);
//     Route::delete('categories/{id}', [CategoryController::class, 'destroy']);
// });

Route::post('/admin/login', [AuthController::class, 'authenticate']);
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('brands', BrandController::class);
    // Route::apiResource('sizes', SizeController::class);
    Route::get('sizes', [SizeController::class, 'index']);
    Route::apiResource('products', ProductController::class);
    // Route::apiResource('temp-images', TempImageController::class);
    Route::post('temp-images', [TempImageController::class, 'store']);
    Route::post('save-product-image', [ProductController::class,'saveProductImage']);
    Route::get('change-product-default-image', [ProductController::class,'updateDefaultImage']);
    Route::delete('delete-product-image/{id}', [ProductController::class,'deleteProductImage']);
});
