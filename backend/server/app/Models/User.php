<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['name','email','password']; //mass assignment

    public static function register($name,$email,$pass){
       
       User::create([
            'name'=>$name,
            'email'=>$email,
            'password'=>bcrypt($pass)
       ]);
    }
}
