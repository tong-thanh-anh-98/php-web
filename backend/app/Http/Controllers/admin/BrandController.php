<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BrandRequest;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = Brand::orderBy('created_at', 'DESC')->get();

        return response()->json(
            [
                'status' => 200,
                'data' => $brands
            ],
            200
        );
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
    public function store(BrandRequest $request)
    {
        $brand = Brand::create([
            'name' => $request->name,
            'status' => $request->status,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Brand has been created successfully.',
            'data' => $brand
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $brand = Brand::find($id);

        if ($brand === null) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found.',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $brand
        ], 200);
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
    public function update(BrandRequest $request, string $id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found.',
            ], 404);
        }

        $brand->update([
            'name' => $request->name,
            'status' => $request->status
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Brand has been updated successfully.',
            'data' => $brand
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found.',
            ], 404);
        }

        $brand->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Brand has been deleted successfully.',
        ], 200);
    }
}
