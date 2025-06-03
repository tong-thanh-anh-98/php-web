<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class OrderItem extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'product_id',
        'order_id',
        'name',
        'size',
        'price',
        'unit_price',
        'qty',
    ];

    public function price(): Attribute
    {
        return Attribute::make(
            get: fn($value) => number_format($value, 0, ',', '.') . ' ₫',
            set: fn($value) => preg_replace('/[^0-9]/', '', $value) // if need to set currency format
        );
    }

    public function unitPrice(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value !== null ? number_format($value, 0, ',', '.') . ' ₫' : null,
            set: fn($value) => $value !== null ? preg_replace('/[^0-9]/', '', $value) : null
        );
    }
}
