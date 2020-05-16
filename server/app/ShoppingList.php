<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShoppingList extends Model
{
    protected $fillable = [
        "seeker_id", "helper_id", "end_date", "finalPrice"
    ];

    public function seeker(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seeker_id', 'id');
    }

    public function helper(): BelongsTo
    {
        return $this->belongsTo(User::class, 'helper_id', 'id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
