<?php

namespace App\Http\Controllers\admin;

use App\Models\Product;
use App\Models\TempImage;
use App\Models\ProductSize;
use Illuminate\Support\Str;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManager;
use App\Http\Requests\ProductRequest;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::orderBy('created_at', 'DESC')->with(['product_images', 'product_sizes'])->get();

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

            if (!empty($request->sizes)) {
                foreach ($request->sizes as $sizeId) {
                    $productSize = new ProductSize();
                    $productSize->size_id = $sizeId;
                    $productSize->product_id = $product->id;
                    $productSize->save();
                }
            }

            if (!empty($request->gallery)) {
                foreach ($request->gallery as $key => $tempImageId) {
                    $tempImage = TempImage::find($tempImageId);

                    // Large thumbnail
                    // thay thế time() bằng Str::uuid() để đảm bảo tên file là duy nhất tuyệt đối.
                    $extArray = explode('.', $tempImage->name);
                    $ext = end($extArray);
                    $imageName = $product->id . '-' . Str::uuid() . '.' . $ext;
                    // $imageName = $product->id . '-' . Str::uuid() . '.' . $tempImage->extension();

                    $manager = new ImageManager(new Driver());
                    $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                    $img->scaleDown(1200);
                    $img->save(public_path('uploads/products/large/' . $imageName));

                    // Small thumbnail
                    $manager = new ImageManager(new Driver());
                    $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                    $img->coverDown(400, 460);
                    $img->save(public_path('uploads/products/small/' . $imageName));

                    $productImage = new ProductImage();
                    $productImage->image = $imageName;
                    $productImage->product_id = $product->id;
                    $productImage->save();

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
            $product = Product::with(['product_images', 'product_sizes'])->find($id);
            $productSizes = $product->product_sizes->pluck('size_id');

            return response()->json([
                'message' => 'Product fetched successfully.',
                'data' => $product,
                'productSizes' => $productSizes
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

            if (!empty($request->sizes)) {
                ProductSize::where('product_id', $product->id)->delete();
                foreach ($request->sizes as $sizeId) {
                    $productSize = new ProductSize();
                    $productSize->size_id = $sizeId;
                    $productSize->product_id = $product->id;
                    $productSize->save();
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
            $product = Product::with('product_images')->find($id);

            if ($product->product_images) {
                foreach ($product->product_images as $productImage) {
                    $largePath = public_path('uploads/products/large/' . $productImage->image);
                    $smallPath = public_path('uploads/products/small/' . $productImage->image);

                    if (File::exists($largePath)) {
                        File::delete($largePath);
                    }

                    if (File::exists($smallPath)) {
                        File::delete($smallPath);
                    }
                }
            }

            $product->product_images()->delete();
            $product->product_sizes()->delete();
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

    public function saveProductImage(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif',
                'product_id' => 'required|exists:products,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 400,
                    'errors' => $validator->errors(),
                ], 400);
            }

            $image = $request->file('image');
            // thay thế time() bằng Str::uuid() để đảm bảo tên file là duy nhất tuyệt đối.
            $imageName = $request->product_id . '-' . Str::uuid() . '.' . $image->extension();
            $imagePath = public_path('uploads/temp/' . $imageName);
            $image->move(public_path('uploads/temp/'), $imageName);

            $manager = new ImageManager(new Driver());

            // Large thumbnail
            $img = $manager->read($imagePath);
            $img->scaleDown(1200);
            $img->save(public_path('uploads/products/large/' . $imageName));

            // Small thumbnail
            $img = $manager->read($imagePath);
            $img->coverDown(400, 460);
            $img->save(public_path('uploads/products/small/' . $imageName));

            // insert a record in product_images table
            $productImage = new ProductImage();
            $productImage->image = $imageName;
            $productImage->product_id = $request->product_id;
            $productImage->save();

            return response()->json([
                'status' => 200,
                'message' => 'Temp image uploaded successfully.',
                'data' => $productImage
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error while creating temp image: ' . $e->getMessage());

            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while uploading the product image.',
            ], 500);
        }
    }

    public function updateDefaultImage(Request $request)
    {
        try {
            $product = Product::find($request->product_id);
            $product->image = $request->image;
            $product->save();

            return response()->json([
                'status' => 200,
                'message' => 'Product default image changed successfully.',
                'data' => $product
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error while creating temp image: ' . $e->getMessage());

            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while uploading the product image.',
            ], 500);
        }
    }

    function deleteProductImage($id)
    {
        try {
            $productImage = ProductImage::findOrFail($id);

            $largePath = public_path('uploads/products/large/' . $productImage->image);
            $smallPath = public_path('uploads/products/small/' . $productImage->image);

            if (File::exists($largePath)) {
                File::delete($largePath);
            }

            if (File::exists($smallPath)) {
                File::delete($smallPath);
            }

            $productImage->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Product image deleted successfully.',
            ]);
        } catch (ModelNotFoundException | NotFoundHttpException $e) {
            return response()->json([
                'status' => 404,
                'message' => 'Product image not found.',
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error deleting product image', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'image_id' => $id,
            ]);

            return response()->json([
                'status' => 500,
                'message' => 'An unexpected error occurred while deleting the product image. Please try again later.',
            ], 500);
        }
    }
}
