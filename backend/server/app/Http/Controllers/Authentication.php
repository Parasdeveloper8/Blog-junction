<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class Authentication extends Controller
{
   function registerController(Request $req){
        try{
          //check if email exists
        $exists = User::where('email', $req->email)->exists();
        if($exists){
        return response()->json([
            "success" => false,
            "info" => "Email already exists"
         ], 409);
       }
         //apply validations
        $req->validate([
            'name' => 'required|max:255',
            'email' => 'required|email',
            'password' => 'required|min:8'
        ]);
        
         //Add values in User model's register function
         User::register($req->name,$req->email,$req->password);
         return response()->json([
            "success" => true,
            "info" => "User registered successfully"
         ], 201);

        }catch(\Exception $e){
           return response()->json([
            "success" => false,
            "info" => $e->getMessage()
         ], 500);
        }
   }
}
