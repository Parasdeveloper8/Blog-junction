<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\User;
use Illuminate\Support\Facades\Log;

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

    //function to get own posts
    function getOwnPost($email){
        try{
             //check if email exists
             $exists = User::where('email', $email)->exists();
             if($exists == false){
                 return response()->json([
                     "success" => false,
                     "info" => "User doesn't exist"
                 ], 404);  
             }

            //call Blog model's getOwnPost function to get data
            $data = Blog::getOwnPost($email);
           // Log::info($data);
            return response()->json([
                "success" =>true,
                "info" =>$data
            ],200); 
        }catch(\Exception $e){
            return response()->json([
                "success" => false,
                "info" => $e->getMessage()
             ], 500);
        }
    }

    //function to get posts
    function getPosts(){
        try{
            //call Blog model's getPublicPost function to get data
           $data = Blog::getPublicPost();
           return response()->json([
            "success" =>true,
            "info" =>$data
            ],200); 
        }catch(\Exception $e){
            return response()->json([
                "success" => false,
                "info" => $e->getMessage()
             ], 500);
        }
    }

    //function to delete post
    function deletePost($id){
        try{
            //calling Blog model's deletePost function to delete data
           Blog::deletePost($id);
          return response()->json([
            "success" =>true,
            "info" =>"Post deleted successfully"
            ],200); 
        }catch(\Exception $e){
            return response()->json([
                "success" => false,
                "info" => $e->getMessage()
             ], 500);
        }
    }
}
