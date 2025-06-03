<?php

namespace App\Http\Controllers\front;

use App\Models\order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function saveOrder(Request $request)
    {
        if (empty($request->cart)) {
            return response()->json([
                'status' => 400,
                'message' => 'Your cart is empty.'
            ], 400);
        }

        DB::beginTransaction();

        try {
            // Save order
            $order = new Order();
            $order->user_id = Auth::id();
            $order->sub_total = $request->sub_total;
            $order->grand_total = $request->grand_total;
            $order->shipping = $request->shipping;
            $order->discount = $request->discount;
            $order->payment_status = $request->payment_status;
            $order->status = $request->status;
            $order->name = $request->name;
            $order->email = $request->email;
            $order->mobile = $request->mobile;
            $order->address = $request->address;
            $order->city = $request->city;
            $order->state = $request->state;
            $order->zip = $request->zip;
            $order->save();

            // Save order items
            foreach ($request->cart as $item) {
                $orderItem = new OrderItem();
                $orderItem->product_id = $item['product_id'];
                $orderItem->order_id = $order->id;
                $orderItem->name = $item['title'];
                $orderItem->size = $item['size'];
                $orderItem->price = $item['qty'] * $item['price'];
                $orderItem->unit_price = $item['price'];
                $orderItem->qty = $item['qty'];
                $orderItem->save();
            }

            DB::commit();

            return response()->json([
                'status' => 200,
                'id' => $order->id,
                'message' => 'You have successfully placed your order.'
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while placing your order.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
