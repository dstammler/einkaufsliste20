<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    protected $fillable = [
        'label','amount','unit','max_price', 'shopping_list_id', 'checked'
    ];

    public function shopping_list(): BelongsTo{
        return $this->belongsTo(ShoppingList::class);
    }


}

