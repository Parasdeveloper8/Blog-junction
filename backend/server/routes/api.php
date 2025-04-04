<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Authentication;

Route::post('/register', [Authentication::class,'registerController']);
