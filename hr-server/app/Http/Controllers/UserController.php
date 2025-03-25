<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // get all users
    public function all()
    {
        $users = User::all();
        $status = $users->isEmpty() ? 204 : 200;
        return response()->json($users, $status);
    }

    // Get the currently authenticated user
    public function me()
    {
        return response()->json(Auth::user());
    }

    // Sign up a new user
    public function signUp(Request $request)
    {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users,username',
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                "msg" => "missing attr",
                "errors" => $validator->errors()
            ], 422);
        }

        try {
            // Attempt to create the user
            $user = User::create($request->all());

            return response()->json([
                "msg" => "create",
                "inserted entity" => $user,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "msg" => "user creation failed",
                "error" => $e->getMessage(),
            ], 500);
        }
    }

    function login(Request $request)
    {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                "msg" => "missing attr",
                "errors" => $validator->errors()
            ], 422);
        }
        // login
        $credentials = [
            "username" => $request["username"],
            "password" => $request["password"]
        ];

        if (! $token = Auth::attempt($credentials)) {
            return response()->json([
                "success" => false,
                "error" => "Unauthorized"
            ], 401);
        }

        $user = Auth::user();
        $user->token = $token;

        return response()->json([
            "success" => true,
            "user" => $user
        ]);
    }
    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }
    public function update($id) {
        // TODO
    }
    public function destroy($id) {
        // TODO
    }
}
