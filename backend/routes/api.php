<?php

use App\Http\Controllers\admin\TempImageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\SizeController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\front\HomeController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/admin/login', [AuthController::class, 'authenticate']);

// Route frontend
// Route::get('get-products', [HomeController::class, 'getProducts']);
// Route::get('get-latest-products', [HomeController::class, 'latestProducts']);
// Route::get('get-featured-products', [HomeController::class, 'featuredProducts']);
// Route::get('get-categories', [HomeController::class, 'getCategories']);
// Route::get('get-brands', [HomeController::class, 'getBrands']);
// Route::get('get-product/{id}', [HomeController::class, 'getProduct']);
Route::prefix('front')->group(function () {
    Route::get('get-products', [HomeController::class, 'getProducts']);
    Route::get('get-latest-products', [HomeController::class, 'latestProducts']);
    Route::get('get-featured-products', [HomeController::class, 'featuredProducts']);
    Route::get('get-categories', [HomeController::class, 'getCategories']);
    Route::get('get-brands', [HomeController::class, 'getBrands']);
    Route::get('get-product/{id}', [HomeController::class, 'getProduct']);
});


// Route::middleware('auth:sanctum')->group(function () {
//     Route::apiResource('categories', CategoryController::class);
//     Route::apiResource('brands', BrandController::class);
//     Route::get('sizes', [SizeController::class, 'index']);
//     Route::apiResource('products', ProductController::class);
//     Route::post('temp-images', [TempImageController::class, 'store']);
//     Route::post('save-product-image', [ProductController::class, 'saveProductImage']);
//     Route::get('change-product-default-image', [ProductController::class, 'updateDefaultImage']);
//     Route::delete('delete-product-image/{id}', [ProductController::class, 'deleteProductImage']);
// });
Route::prefix('admin')->group(function () {
    Route::post('login', [AuthController::class, 'authenticate']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('categories', CategoryController::class);
        Route::apiResource('brands', BrandController::class);
        Route::get('sizes', [SizeController::class, 'index']);
        Route::apiResource('products', ProductController::class);
        Route::post('temp-images', [TempImageController::class, 'store']);
        Route::post('save-product-image', [ProductController::class, 'saveProductImage']);
        Route::get('change-product-default-image', [ProductController::class, 'updateDefaultImage']);
        Route::delete('delete-product-image/{id}', [ProductController::class, 'deleteProductImage']);
    });
});
