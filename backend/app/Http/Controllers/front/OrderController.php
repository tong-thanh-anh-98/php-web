<?php

namespace App\Http\Controllers\front;

use App\Models\order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function saveOrder(Request $request)
    {
        if (empty($request->cart) || !is_array($request->cart)) {
            return response()->json([
                'status' => 400,
                'message' => 'Your cart is empty.'
            ], 400);
        }

        DB::beginTransaction();

        try {
            // Cast to float if string format is present
            $subTotal = (float) preg_replace('/[^\d.]/', '', $request->sub_total);
            $grandTotal = (float) preg_replace('/[^\d.]/', '', $request->grand_total);
            $shipping = (float) preg_replace('/[^\d.]/', '', $request->shipping);
            $discount = $request->discount !== null ? (float) preg_replace('/[^\d.]/', '', $request->discount) : 0;

            $order = new Order();
            $order->user_id = Auth::id();
            $order->sub_total = $subTotal;
            $order->grand_total = $grandTotal;
            $order->shipping = $shipping;
            $order->discount = $discount;
            $order->payment_status = $request->payment_status ?? 'not paid';
            $order->status = $request->status ?? 'pending';
            $order->name = $request->name;
            $order->email = $request->email;
            $order->mobile = $request->mobile;
            $order->address = $request->address;
            $order->city = $request->city;
            $order->district = $request->district;
            $order->zip = $request->zip;
            $order->save();

            foreach ($request->cart as $item) {
                $orderItem = new OrderItem();
                $orderItem->product_id = $item['product_id'];
                $orderItem->order_id = $order->id;
                $orderItem->name = $item['name'];
                $orderItem->size = $item['size'];
                $orderItem->qty = $item['qty'];
                $orderItem->price = $item['qty'] * $item['price'];
                $orderItem->unit_price = $item['price'];
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
            Log::error('Order Save Failed: ' . $e->getMessage());

            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while placing your order.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
