<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname','lastname', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function shopping_list():HasMany{
        return $this->hasMany(ShoppingList::class,'seeker_id');
    }

    public function shopping_list_helper():HasMany{
        return $this->hasMany(ShoppingList::class,'helper_id');
    }

    public function comments():HasMany{
        return $this->hasMany(Comment::class);
    }

    public function roles():BelongsToMany{
        return $this->belongsToMany('App\Role', 'user_role', 'user_id', 'role_id');
    }

    public function getRoles(){
        $roles = [];
        if ($this->roles()) {
            $roles = $this->roles()->get();
        }
        return $roles;
    }

    /* ---- auth JWT ---- */
    /**
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return ['user' => ['id' => $this->id, 'role' => $this->getRoles()]];
    }

}
