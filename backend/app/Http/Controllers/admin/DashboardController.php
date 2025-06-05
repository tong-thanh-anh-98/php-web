<?php

namespace App\Http\Controllers\admin;

use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'status' => 200,
            'users' => User::count(),
            'orders' => Order::count(),
            'products' => Product::count()
        ], 200);
    }
}
