<?php

use App\Http\Controllers\admin\TempImageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\SizeController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\front\ProductController as FrontProductController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/admin/login', [AuthController::class, 'authenticate']);

// Route frontend
Route::prefix('front')->group(function () {
    Route::get('get-latest-products', [FrontProductController::class, 'indexLatestProducts']);
    Route::get('get-featured-products', [FrontProductController::class, 'indexFeaturedProducts']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('brands', BrandController::class);
    Route::get('sizes', [SizeController::class, 'index']);
    Route::apiResource('products', ProductController::class);
    Route::post('temp-images', [TempImageController::class, 'store']);
    Route::post('save-product-image', [ProductController::class,'saveProductImage']);
    Route::get('change-product-default-image', [ProductController::class,'updateDefaultImage']);
    Route::delete('delete-product-image/{id}', [ProductController::class,'deleteProductImage']);
});

// Admin routes (Có middleware bảo vệ)
// Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
//     Route::apiResource('products', AdminProductController::class);
//     Route::apiResource('categories', CategoryController::class);
//     Route::apiResource('brands', BrandController::class);
//     Route::get('sizes', [SizeController::class, 'index']);
//     Route::post('temp-images', [TempImageController::class, 'store']);
//     Route::post('save-product-image', [AdminProductController::class, 'saveProductImage']);
//     Route::get('change-product-default-image', [AdminProductController::class, 'updateDefaultImage']);
//     Route::delete('delete-product-image/{id}', [AdminProductController::class, 'deleteProductImage']);
// });
