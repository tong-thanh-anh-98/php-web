<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexLatestProducts ()
    {
        $product = Product::orderBy('created_at', 'DESC')
                   ->where('status', 1)
                   ->limit(10)
                   ->get();

        return response()->json([
            'status' => 200,
            'data'   => $product
        ], 200);
    }

    /**
     * Display a listing of the resource.
     */
    public function indexFeaturedProducts ()
    {
        $product = Product::orderBy('created_at', 'DESC')
                   ->where('is_featured', 'yes')
                   ->limit(10)
                   ->get();

        return response()->json([
            'status' => 200,
            'data'   => $product
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
