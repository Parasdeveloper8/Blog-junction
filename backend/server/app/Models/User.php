<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

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

    public static function login($dbPassHash,$pass){
        //compare user password and db password hash
         if(Hash::check($pass,$dbPassHash)) {
            return true;
         }
         return false;
    }
}
