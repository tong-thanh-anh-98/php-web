<?php

namespace App\Http\Controllers\admin;

use Exception;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $orders = Order::orderBy('created_at', 'desc')->get();

            return response()->json([
                'status' => 200,
                'data' => $orders
            ]);
        } catch (Exception $e) {
            Log::error('Order Index Error: ' . $e->getMessage());

            return response()->json([
                'status' => 500,
                'message' => 'Unable to fetch orders at this time.'
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
    public function show($id)
    {
        try {
            $order = Order::with('items', 'items.product')->find($id);

            if (!$order) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Order not found.',
                    'data' => []
                ], 404);
            }

            return response()->json([
                'status' => 200,
                'data' => $order
            ], 200);
        } catch (Exception $e) {
            Log::error('Order Show Error (ID: ' . $id . '): ' . $e->getMessage());

            return response()->json([
                'status' => 500,
                'message' => 'Unable to fetch the order details.'
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
    public function update(Request $request, $id)
    {
        DB::beginTransaction();

        try {
            $order = Order::find($id);

            if (!$order) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Order not found'
                ], 404);
            }

            $order->status = $request->status;
            $order->payment_status = $request->payment_status;
            $order->save();

            DB::commit();

            return response()->json([
                'status' => 200,
                'message' => 'Order update successfully.',
                'data' => $order
            ], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Order Update Failed: ' . $e->getMessage());

            return response()->json([
                'status' => 500,
                'message' => 'something went wrong.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
