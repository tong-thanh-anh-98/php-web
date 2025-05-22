<?php

namespace App\Http\Controllers\admin;

use App\Models\Product;
use App\Models\TempImage;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Intervention\Image\ImageManager;
use App\Http\Requests\ProductRequest;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::orderBy('created_at', 'DESC')->get();

        return response()->json(
            [
                'status' => 200,
                'data' => $products
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
    public function store(ProductRequest $request)
    {
        try {
            $data = $request->validated();
            $product = Product::create($data);

            if (!empty($request->gallery)) {
                foreach ($request->gallery as $key => $tempImageId) {
                    $tempImage = TempImage::find($tempImageId);

                    // Large thumbnail
                    $extArray = explode('.', $tempImage->name);
                    $ext = end($extArray);
                    $imageName = $product->id . '_' . time() . '_' . $key . '.' . $ext;

                    $manager = new ImageManager(new Driver());
                    $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                    $img->scaleDown(1200);
                    $img->save(public_path('uploads/products/large/' . $imageName));

                    // Small thumbnail
                    $manager = new ImageManager(new Driver());
                    $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                    $img->coverDown(420, 600);
                    $img->save(public_path('uploads/products/small/' . $imageName));

                    if ($key === 0) {
                        $product->image = $imageName;
                        $product->save();
                    }
                }
            }

            return response()->json([
                'status' => 201,
                'message' => 'Product created successfully.',
                'data' => $product
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error while creating product: ' . $e->getMessage());

            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while creating the product.',
                'error' => $e->getMessage() // Consider hiding this in production
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $product = Product::with(['category', 'brand'])->findOrFail($id);
            // $product = Product::findOrFail($id);

            return response()->json([
                'message' => 'Product fetched successfully.',
                'data' => $product
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Product not found.'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
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
    public function update(ProductRequest $request, string $id)
    {
        try {
            $product = Product::findOrFail($id);
            $data = $request->validated();
            $product->update($data);

            if (!empty($request->gallery)) {
                if (!empty($product->image)) {
                    $oldLarge = public_path('uploads/products/large/' . $product->image);
                    $oldSmall = public_path('uploads/products/small/' . $product->image);

                    if (file_exists($oldLarge)) unlink($oldLarge);
                    if (file_exists($oldSmall)) unlink($oldSmall);
                }

                foreach ($request->gallery as $key => $tempImageId) {
                    $tempImage = TempImage::find($tempImageId);
                    if (!$tempImage) continue;

                    $extArray = explode('.', $tempImage->name);
                    $ext = end($extArray);
                    $imageName = $product->id . '_' . time() . '_' . $key . '.' . $ext;

                    // Large
                    $manager = new ImageManager(new Driver());
                    $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                    $img->scaleDown(1200);
                    $img->save(public_path('uploads/products/large/' . $imageName));

                    // Small
                    $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                    $img->coverDown(400, 460);
                    $img->save(public_path('uploads/products/small/' . $imageName));

                    // Update main image if it is the first image
                    if ($key === 0) {
                        $product->image = $imageName;
                        $product->save();
                    }
                }
            }

            return response()->json([
                'status' => 200,
                'message' => 'Product updated successfully.',
                'data' => $product
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error while updating product: ' . $e->getMessage());

            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while updating the product.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $product = Product::findOrFail($id);

            $product->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Product deleted successfully.'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found.'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error deleting product: ' . $e->getMessage());

            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while deleting the product.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
