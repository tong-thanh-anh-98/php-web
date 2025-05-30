<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
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
                $user = User::find(Auth::id());

                if ($user->role === 'admin') {
                    $token = $user->createToken('token')->plainTextToken;

                    return response()->json([
                        'status' => 200,
                        'message' => 'You have successfully logged in.',
                        'token' => $token,
                        'id' => $user->id,
                        'name' => $user->name,
                    ], 200);
                } else {
                    return response()->json([
                        'status' => 401,
                        'message' => 'This account is not an admin. Please sign in with an admin account to continue.'
                    ], 401);
                }
            } else {
                return response()->json([
                    'status' => 401,
                    'message' => 'The email or password you entered is incorrect. Please try again.'
                ], 401);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Something went wrong. Please try again later.',
                'error' => $e->getMessage(), // Only enable this line when debugging (should not show in production)
            ], 500);
        }
    }
}
