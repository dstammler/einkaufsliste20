<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    public function users():BelongsToMany{
        return $this->belongsToMany('App\User');
    }
}
