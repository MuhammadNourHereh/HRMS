<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class EnsureIsHr
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response{
        $employee = Auth::guard('employee')->user(); 

        if(!$employee || $employee->role != "hr"){
            return response()->json([
                "success" => false,
                "error" => "Unauthorized"
            ], 401);
        }
        return $next($request);
    }
}
