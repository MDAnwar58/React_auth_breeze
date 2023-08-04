<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    function user()
    {
        $user = Auth::user();
        return $user;
    }
    function login(LoginRequest $request)
    {
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('App')->plainTextToken;

            return response([
                'message' => 'Successfully Login',
                'token' => $token,
                'user' => $user
            ], 200);
        }
    }
    function register(RegisterRequest $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        Auth::login($user);
        $token = $user->createToken('user')->plainTextToken;

        return response([
            'success' => 'User Registration Successfully!',
            'user' => $user,
            'token' => $token,
        ]);
    }

    function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
