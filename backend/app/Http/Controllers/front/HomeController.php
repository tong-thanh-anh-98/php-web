<?php

namespace App\Http\Controllers\front;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function getProducts(Request $request)
    {
        try {
            $products = Product::orderBy('created_at', 'desc')
                ->where('status', 1);

            // Filter products by category
            if (!empty($request->category)) {
                $categoryArray = explode(',', $request->category);
                $products = $products->whereIn('category_id', $categoryArray);
            }

            // Filter products by brand
            if (!empty($request->brand)) {
                $brandArray = explode(',', $request->brand);
                $products = $products->whereIn('brand_id', $brandArray);
            }

            $products = $products->get();

            return response()->json([
                'status' => 200,
                'data'   => $products
            ]);
        } catch (\Exception $e) {
            Log::error('Error in latestProducts: ' . $e->getMessage());

            return response()->json([
                'status'  => 500,
                'message' => 'Unable to retrieve latest products. Please try again later.'
            ], 500);
        }
    }

    public function latestProducts()
    {
        try {
            $products = Product::orderBy('created_at', 'DESC')
                ->where('status', 1)
                ->limit(10)
                ->get();

            return response()->json([
                'status' => 200,
                'data'   => $products
            ]);
        } catch (\Exception $e) {
            Log::error('Error in latestProducts: ' . $e->getMessage());

            return response()->json([
                'status'  => 500,
                'message' => 'Unable to retrieve latest products. Please try again later.'
            ], 500);
        }
    }

    public function featuredProducts()
    {
        try {
            $products = Product::orderBy('created_at', 'DESC')
                ->where('is_featured', 'yes')
                ->limit(10)
                ->get();

            return response()->json([
                'status' => 200,
                'data'   => $products
            ]);
        } catch (\Exception $e) {
            Log::error('Error in featuredProducts: ' . $e->getMessage());

            return response()->json([
                'status'  => 500,
                'message' => 'Unable to retrieve featured products. Please try again later.'
            ], 500);
        }
    }

    public function getCategories()
    {
        try {
            $categories = Category::orderBy('name', 'ASC')
                ->where('status', 1)
                ->get();

            return response()->json([
                'status' => 200,
                'data'   => $categories
            ]);
        } catch (\Exception $e) {
            Log::error('Error in getCategories: ' . $e->getMessage());

            return response()->json([
                'status'  => 500,
                'message' => 'Unable to retrieve categories. Please try again later.'
            ], 500);
        }
    }

    public function getBrands()
    {
        try {
            $brands = Brand::orderBy('name', 'ASC')
                ->where('status', 1)
                ->get();

            return response()->json([
                'status' => 200,
                'data'   => $brands
            ]);
        } catch (\Exception $e) {
            Log::error('Error in getCategories: ' . $e->getMessage());

            return response()->json([
                'status'  => 500,
                'message' => 'Unable to retrieve categories. Please try again later.'
            ], 500);
        }
    }
}
