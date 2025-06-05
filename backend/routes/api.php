<?php

use App\Http\Controllers\front\AccountController;
use App\Http\Controllers\front\OrderController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\SizeController;
use App\Http\Controllers\front\HomeController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\OrderController as AdminOrderController;
use App\Http\Controllers\admin\TempImageController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/admin/login', [AuthController::class, 'authenticate']);

Route::prefix('front')->group(function () {
    Route::post('register', [AccountController::class, 'register']);
    Route::post('login', [AccountController::class, 'authenticate']);

    Route::get('get-products', [HomeController::class, 'getProducts']);
    Route::get('get-latest-products', [HomeController::class, 'latestProducts']);
    Route::get('get-featured-products', [HomeController::class, 'featuredProducts']);
    Route::get('get-categories', [HomeController::class, 'getCategories']);
    Route::get('get-brands', [HomeController::class, 'getBrands']);
    Route::get('get-product/{id}', [HomeController::class, 'getProduct']);

    Route::middleware(['auth:sanctum', 'checkUserRole'])->group(function () {
        Route::post('save-order', [OrderController::class, 'saveOrder']);
        Route::get('get-order-details/{id}', [AccountController::class, 'getOrderDetails']);
    });
});

Route::prefix('admin')->group(function () {
    Route::post('login', [AuthController::class, 'authenticate']);

    Route::middleware(['auth:sanctum', 'checkAdminRole'])->group(function () {
        Route::get('dashboard', [DashboardController::class, 'stats']);
        Route::apiResource('categories', CategoryController::class);
        Route::apiResource('brands', BrandController::class);
        Route::get('sizes', [SizeController::class, 'index']);
        Route::apiResource('products', ProductController::class);

        Route::post('temp-images', [TempImageController::class, 'store']);
        Route::post('save-product-image', [ProductController::class, 'saveProductImage']);
        Route::get('change-product-default-image', [ProductController::class, 'updateDefaultImage']);
        Route::delete('delete-product-image/{id}', [ProductController::class, 'deleteProductImage']);

        Route::apiResource('orders', AdminOrderController::class);
    });
});
