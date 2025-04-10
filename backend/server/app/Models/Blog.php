<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Log;

class Blog extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = ['email','text','name','title']; //mass assignment
    
    public static function addPost($email,$text,$name,$title){
        Log::info("Name " . $name); //debugging line
        Log::info("Title" . $title); //debugging line
        Blog::create([
            'email'=>$email,
            'text'=>$text,
            'name' => $name,
            'title' => $title
       ]);
    }

    public static function getOwnPost($email){
        return Blog::where('email', $email)->get();
    }

    public static function getPublicPost(){
        return Blog::all();
    }

    public static function deletePost($id){
        return Blog::destroy($id);
    }
}
