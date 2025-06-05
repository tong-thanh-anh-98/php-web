<?php

namespace App\Models;

use App\HasCurrencyFormat;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Order extends Model
{
    use SoftDeletes, HasCurrencyFormat;

    protected $fillable = [
        'user_id',
        'sub_total',
        'grand_total',
        'shipping',
        'discount',
        'payment_status',
        'status',
        'name',
        'email',
        'mobile',
        'address',
        'city',
        'district',
        'zip',
    ];

    /**
     * Convert numeric values to a display-friendly currency format (e.g., 1,000,000 ₫)
     * And vice versa, set the value for the database as a valid float/int
     */
    protected function subTotal(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $this->formatCurrency($value),
            set: fn($value) => $this->parseCurrency($value),
        );
    }

    protected function grandTotal(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $this->formatCurrency($value),
            set: fn($value) => $this->parseCurrency($value),
        );
    }

    protected function shipping(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $this->formatCurrency($value),
            set: fn($value) => $this->parseCurrency($value),
        );
    }

    protected function discount(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value !== null ? $this->formatCurrency($value) : null,
            set: fn($value) => $value !== null ? $this->parseCurrency($value) : null,
        );
    }

    /**
     * Relationships
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime:d M, Y',
        ];
    }
}
