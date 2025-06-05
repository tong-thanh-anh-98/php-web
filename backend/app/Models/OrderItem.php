<?php

namespace App\Models;

use App\HasCurrencyFormat;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class OrderItem extends Model
{
    use SoftDeletes, HasCurrencyFormat;

    protected $fillable = [
        'product_id',
        'order_id',
        'name',
        'size',
        'price',
        'unit_price',
        'qty',
    ];

    /**
     * Convert numeric values to a display-friendly currency format (e.g., 1,000,000 ₫)
     * And vice versa, set the value for the database as a valid float/int
     */
    public function price(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $this->formatCurrency($value),
            set: fn($value) => $this->parseCurrency($value),
        );
    }

    public function unitPrice(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value !== null ? $this->formatCurrency($value) : null,
            set: fn($value) => $value !== null ? $this->parseCurrency($value) : null,
        );
    }

    /**
     * Relationships
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
