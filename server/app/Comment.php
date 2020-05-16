<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $fillable = [
        'content','user_id','shopping_list_id'
    ];

    public function shopping_list(): BelongsTo{
        return $this->belongsTo(ShoppingList::class);
    }

    public function user() :BelongsTo{
        return $this->belongsTo(User::class);
    }
}

