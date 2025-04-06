<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\User;

//controller to handle user operations ex- add post , create post ,etc
class Operation extends Controller
{
    //function to add posts in db
    function addPost(Request $req){
        try{
           //check if email exists
            $exists = User::where('email', $req->email)->exists();
            if($exists == false){
                return response()->json([
                    "success" => false,
                    "info" => "User doesn't exist"
                ], 404);  
            }
             //apply validations
            $req->validate([
            'email' => 'required|email',
            'text'  => 'required'
        ]);
        //add values in Blog model's add Post function
        Blog::addPost($req->email,$req->text);

        return response()->json([
            "success" => true,
            "info" => "Successfully posted"
         ], 201);


        }catch(\Exception $e){
            return response()->json([
                "success" => false,
                "info" => $e->getMessage()
             ], 500);
        }
    }
}
