<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;

class AuthHelper
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $payload = JWTAUTH::getPayload(JWTAuth::getToken())->toArray();
        $roles = $payload['user']->role;
        foreach($roles as $role){
            if($role->label !== null && $role->label === "Helper") {
                return $next($request);
            }
        } return response()->json(['The user does not have the required rights.'], 401);
    }
}
