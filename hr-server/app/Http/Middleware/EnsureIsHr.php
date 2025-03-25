<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureIsHr
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response{
        $employee = Auth::employee();

        if(!$employee || $employee->role != "hr"){
            return response()->json([
                "success" => false,
                "error" => "Unauthorized"
            ], 401);
        }
        return $next($request);
    }
}
