<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Authentication;
use App\Http\Controllers\Operation;

Route::post('/register', [Authentication::class,'registerController']);
Route::post('/login',[Authentication::class,'loginController']);

Route::get('/posts',[Operation::class,'getPosts']);

Route::middleware(['auth:sanctum'])->group(function (){
    Route::post('/logout',[Authentication::class,'logoutController']);
    Route::post('/save-blog',[Operation::class,'addPost']);
    Route::get('/myposts/{email}',[Operation::class,'getOwnPost']);
    Route::delete('/delete/{id}',[Operation::class,'deletePost']);
});