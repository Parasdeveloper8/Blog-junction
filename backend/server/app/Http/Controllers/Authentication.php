<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

//Controller for Authentication operations
class Authentication extends Controller
{
   //Function for Registration
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

   //Function for Login
   function loginController(Request $req){
      try{
        //check if user exists and store password and email
       $user = User::where('email',$req->email)->first();
       if($user){
         $name = $user->name;
         $pass = $user->password;
         $email = $user->email;
         //add values in User model's login function
         $status = User::login($pass,$req->password);
         if($status){
            //generate token
            $token = $user->createToken('myapptoken')->plainTextToken;
            return response()->json([
               "success" => true,
               "info"    => "Login successful",
               "token"   => $token,
               "email"   => $email
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
   //destroy entire session
   function logoutController(Request $req){
      try{
         $req->user()->currentAccessToken()->delete();
         return response()->json([
         "success" => true,
         "info"    => "session destroyed"
         ],200);
   }catch(\Exception $e){
      return response()->json([
         "success" => false,
         "info" => $e->getMessage()
      ], 500);
   }
   }
}
