<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Hash;


class User extends Authenticable
{
   use HasApiTokens, HasFactory, Notifiable;

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
