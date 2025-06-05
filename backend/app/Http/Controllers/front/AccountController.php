<?php

namespace App\Http\Controllers\front;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\AccountRequest;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
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
    public function register(AccountRequest $request)
    {
        try {
            // Data has been validated
            $data = $request->validated();

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => 'customer',
            ]);

            // You can login immediately after registration if you want.
            // Auth::login($user);

            return response()->json([
                'status' => 200,
                'message' => 'You have successfully registered an account!',
                'user' => $user
            ], 200);
        } catch (\Exception $e) {
            Log::error('You have failed to register an account:', ['error' => $e->getMessage()]);

            return response()->json([
                'message' => 'An error occurred while registering. Please try again.',
            ], 500);
        }
    }

    public function authenticate(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 400,
                    'errors' => $validator->errors()
                ], 400);
            }

            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                $user = User::find(Auth::user()->id);
                $token = $user->createToken('token')->plainTextToken;

                return response()->json([
                    'id' => $user->id,
                    'name' => $user->name,
                    'token' => $token,
                    'status' => 200,
                    'message' => 'You have successfully logged an account!',
                ], 200);
            } else {
                return response()->json([
                    'status' => 401,
                    'message' => 'Email/Password is incorrect.',
                ], 401);
            }
        } catch (\Exception $e) {
            Log::error('You have failed to register an account:', ['error' => $e->getMessage()]);

            return response()->json([
                'message' => 'An error occurred while registering. Please try again.',
            ], 500);
        }
    }

    public function getOrderDetails($id, Request $request)
    {
        try {
            $order = Order::where([
                'user_id' => $request->user()->id,
                'id' => $id
            ])->with('items', 'items.product')
                ->first();

            if ($order === null) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Order not found',
                    'data' => []
                ], 404);
            } else {
                return response()->json([
                    'status' => 200,
                    'message' => 'You have order.',
                    'data' => $order
                ], 200);
            }
        } catch (\Throwable $e) {
            Log::error('Something went wrong:', ['error' => $e->getMessage()]);

            return response()->json([
                'message' => 'An error occurred. Please check again.',
            ], 500);
        }
    }

    public function getOrders(Request $request)
    {
        try {
            $order = Order::where('user_id', $request->user()->id)->get();

            if (!$order) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Order not found',
                    'data' => []
                ], 404);
            } else {
                return response()->json([
                    'status' => 200,
                    'message' => 'You have order.',
                    'data' => $order
                ], 200);
            }
        } catch (\Throwable $e) {
            Log::error('Something went wrong:', ['error' => $e->getMessage()]);

            return response()->json([
                'message' => 'An error occurred. Please check again.',
            ], 500);
        }
    }
}
