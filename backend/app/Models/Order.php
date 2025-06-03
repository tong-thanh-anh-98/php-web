<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Order extends Model
{
    use SoftDeletes;

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
        'state',
        'zip',
    ];

    // If you want to access the fields as formatted currency
    // protected $appends = [
    //     'sub_total_format',
    //     'grand_total_format',
    //     'shipping_format',
    //     'discount_format',
    // ];

    /**
     * Format currency like Product
     */
    public function subTotal(): Attribute
    {
        return Attribute::make(
            get: fn($value) => number_format($value, 0, ',', '.') . ' ₫',
            set: fn($value) => preg_replace('/[^0-9]/', '', $value)
        );
    }

    public function grandTotal(): Attribute
    {
        return Attribute::make(
            get: fn($value) => number_format($value, 0, ',', '.') . ' ₫',
            set: fn($value) => preg_replace('/[^0-9]/', '', $value)
        );
    }

    public function shipping(): Attribute
    {
        return Attribute::make(
            get: fn($value) => number_format($value, 0, ',', '.') . ' ₫',
            set: fn($value) => preg_replace('/[^0-9]/', '', $value)
        );
    }

    public function discount(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value !== null ? number_format($value, 0, ',', '.') . ' ₫' : null,
            set: fn($value) => $value !== null ? preg_replace('/[^0-9]/', '', $value) : null
        );
    }

    // // If you want to add a "read-only" field to the view/frontend
    // public function getSubTotalFormatAttribute()
    // {
    //     return number_format($this->attributes['sub_total'], 0, ',', '.') . ' ₫';
    // }

    // public function getGrandTotalFormatAttribute()
    // {
    //     return number_format($this->attributes['grand_total'], 0, ',', '.') . ' ₫';
    // }

    // public function getShippingFormatAttribute()
    // {
    //     return number_format($this->attributes['shipping'], 0, ',', '.') . ' ₫';
    // }

    // public function getDiscountFormatAttribute()
    // {
    //     return $this->attributes['discount'] !== null
    //         ? number_format($this->attributes['discount'], 0, ',', '.') . ' ₫'
    //         : null;
    // }

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
}
