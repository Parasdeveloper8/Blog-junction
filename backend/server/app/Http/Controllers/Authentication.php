<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class Authentication extends Controller
{
   //Controller for Registration
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

   //Controller for Login
   function loginController(Request $req){
      try{
        //check if user exists and store password and email
       $user = User::where('email',$req->email)->first();
       if($user){

         $pass = $user->password;
         $email = $user->email;
         //add values in User model's login function
         $status = User::login($pass,$req->password);
         if($status){
            return response()->json([
               "success" => true,
               "info"    => "Login successful"
            ],200);
         }
         return response()->json([
            "success" => false,
            "info"    => "Wrong password"
         ],401); //status code for wrong credentials

       }else{
          return response()->json([
            "success" => false,
            "info"    => "User doesn't exist"
          ],409);
       }

      }catch(\Exception $e){
         return response()->json([
            "success" => false,
            "info" => $e->getMessage()
         ], 500);
      }
   }
}
