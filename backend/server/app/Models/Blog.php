<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Blog extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = ['email','text']; //mass assignment
    
    public static function addPost($email,$text){
        Blog::create([
            'email'=>$email,
            'text'=>$text
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
