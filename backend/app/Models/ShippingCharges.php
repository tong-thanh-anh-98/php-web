<?php

namespace App\Models;

use App\HasCurrencyFormat;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class ShippingCharges extends Model
{
    use SoftDeletes, HasCurrencyFormat;

    protected $fillable = ['shipping_charge'];

    public function shippingCharge(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $this->formatCurrency($value),
            set: fn($value) => $this->parseCurrency($value),
        );
    }
}
