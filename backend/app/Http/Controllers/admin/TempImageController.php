<?php

namespace App\Http\Controllers\admin;

use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TempImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        try {
            $validator = Validator::make($request->all(), [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'message' => 'Validation failed.',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $imageName = null;

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();

                // $destinationPath = public_path('uploads/temp/');
                // if (!file_exists($destinationPath)) {
                //     mkdir($destinationPath, 0755, true);
                // }

                $image->move(public_path('uploads/temp/'), $imageName);
            }

            $tempImage = TempImage::create(['name' => $imageName]);

            // Create thumbnail
            // $thumbPath = public_path('uploads/temp/thumb');
            // if (!file_exists($thumbPath)) {
            //     mkdir($thumbPath, 0755, true);
            // }

            $manager = new ImageManager(new Driver());
            $img = $manager->read(public_path('uploads/temp/') . '/' . $imageName);
            $img->coverDown(400, 450);
            $img->save(public_path('uploads/temp/thumb') . '/' . $imageName);

            return response()->json([
                'status' => 201,
                'message' => 'Temp image uploaded successfully.',
                'data' => $tempImage
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error while creating temp image: ' . $e->getMessage());

            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while uploading the temp image.',
                'error' => app()->isDebug() ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tempImage = TempImage::find($id);

        if (!$tempImage) {
            return response()->json([
                'status' => 404,
                'message' => 'Temp image not found.',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $tempImage,
        ]);
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
        try {
            $tempImage = TempImage::find($id);

            if (!$tempImage) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Temp image not found.',
                ], 404);
            }

            if (!$request->hasFile('image')) {
                return response()->json([
                    'status' => 422,
                    'message' => 'No image file provided.',
                ], 422);
            }

            $validator = Validator::make($request->all(), [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'message' => 'Validation failed.',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $oldImagePath = public_path('uploads/temp/' . $tempImage->name);
            $oldThumbPath = public_path('uploads/temp/thumb/' . $tempImage->name);

            if (file_exists($oldImagePath)) unlink($oldImagePath);
            if (file_exists($oldThumbPath)) unlink($oldThumbPath);

            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/temp/'), $imageName);

            $tempImage->update(['name' => $imageName]);

            $manager = new ImageManager(new Driver());
            $img = $manager->read(public_path('uploads/temp/') . '/' . $imageName);
            $img->coverDown(400, 450);
            $img->save(public_path('uploads/temp/thumb') . '/' . $imageName);

            return response()->json([
                'status' => 200,
                'message' => 'Temp image updated successfully.',
                'data' => $tempImage
            ]);
        } catch (\Exception $e) {
            Log::error('Error while updating temp image: ' . $e->getMessage());

            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while updating the temp image.',
                'error' => app()->isDebug() ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tempImage = TempImage::find($id);

        if (!$tempImage) {
            return response()->json([
                'status' => 404,
                'message' => 'Temp image not found.',
            ], 404);
        }

        try {
            // Xóa file ảnh chính và thumbnail nếu tồn tại
            $imagePath = public_path('uploads/temp/' . $tempImage->name);
            $thumbPath = public_path('uploads/temp/thumb/' . $tempImage->name);

            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
            if (file_exists($thumbPath)) {
                unlink($thumbPath);
            }

            $tempImage->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Temp image deleted successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error('Error while deleting temp image: ' . $e->getMessage());

            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while deleting the temp image.',
                'error' => app()->isDebug() ? $e->getMessage() : null
            ], 500);
        }
    }
}
