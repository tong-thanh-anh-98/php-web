<?php

namespace App\Http\Controllers\admin;

use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::orderBy('created_at', 'DESC')->get();
        return response()->json(
            [
                'status' => 200,
                'data' => $categories
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
    public function store(CategoryRequest $request)
    {
        // $category = CategoryRequest::make($request->all());

        // if ($category->fails()) {
        //     return response()->json([
        //         'status' => 400,
        //         'errors' => $request->errors()
        //     ], 400);
        // }

        // $category = new Category();
        // $category->name = $request->name;
        // $category->status = $request->status;
        // $category->save();

        $category = Category::create([
            'name' => $request->name,
            'status' => $request->status,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Category created successfully.',
            'data' => $category
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::find($id);

        if ($category === null) {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found.',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $category
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
    public function update(CategoryRequest $request, string $id)
    {
        // $category = Category::find($id);
        // if ($category === null) {
        //     return response()->json([
        //         'status' => 404,
        //         'message' => 'Dữ liệu không tồn tại.',
        //     ], 404);
        // }

        // $validator = Validator::make($request->all(), [
        //     'name' => 'required'
        // ]);

        // if ($validator->fails()) {
        //     return response()->json([
        //         'status' => 400,
        //         'errors' => $validator->errors()
        //     ], 400);
        // }

        // $category->name = $request->name;
        // $category->status = $request->status;
        // $category->update();

        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found.',
            ], 404);
        }

        $category->update([
            'name' => $request->name,
            'status' => $request->status
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Category updated successfully.',
            'data' => $category
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found.',
            ], 404);
        }

        $category->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Category deleted successfully.',
        ], 200);
    }
}
