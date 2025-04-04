<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Authentication;

Route::post('/register', [Authentication::class,'registerController']);
Route::post('/login',[Authentication::class,'loginController']);
Route::post('/logout',[Authentication::class,'logoutController'])->middleware('auth:sanctum');