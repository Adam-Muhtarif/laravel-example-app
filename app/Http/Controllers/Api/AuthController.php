<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $token = $user->createToken('api')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Invalid input.',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            Log::error('Register failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTrace(),
            ]);

            return response()->json([
                'message' => 'Something went wrong. Please try again later.',
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            $token = $user->createToken('api')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Invalid input.',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            Log::error('Login failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTrace(),
            ]);

            return response()->json([
                'message' => 'Something went wrong. Please try again later.',
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            /** @var \Laravel\Sanctum\PersonalAccessToken|null $token */
            $token = $request->user()->currentAccessToken();
            if ($token) {
                $token->delete();
            }

            return response()->json(['message' => 'Logged out']);

        } catch (\Exception $e) {
            Log::error('Logout failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTrace(),
            ]);

            return response()->json([
                'message' => 'Something went wrong. Please try again later.',
            ], 500);
        }
    }
}
