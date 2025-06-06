<?php

namespace App\Http\Controllers\front;

use Exception;
use Illuminate\Http\Request;
use App\Models\ShippingCharges;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class ShippingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getShipping()
    {
        try {
            $shipping = ShippingCharges::first();

            if (!$shipping) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Shipping charge not found.',
                ], 404);
            }

            return response()->json([
                'status' => 200,
                'data' => $shipping
            ], 200);
        } catch (Exception $e) {
            Log::error('Something went wrong: ' . $e->getMessage());

            return response()->json([
                'status' => 500,
                'message' => 'Something went wrong'
            ], 500);
        }
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
