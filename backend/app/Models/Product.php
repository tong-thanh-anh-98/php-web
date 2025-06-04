<?php

namespace App\Models;

use App\Models\Size;
use App\Models\Brand;
use App\Models\Category;
use App\HasCurrencyFormat;
use App\Models\ProductSize;
use App\Models\ProductImage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product extends Model
{
    use SoftDeletes, HasCurrencyFormat;
    protected $fillable = [
        'title',
        'price',
        'compare_price',
        'description',
        'short_description',
        'image',
        'category_id',
        'brand_id',
        'qty',
        'sku',
        'barcode',
        'status',
        'is_featured',
    ];

    protected $appends = ['image_url'];

    public function price(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $this->formatCurrency($value),
            set: fn($value) => $this->parseCurrency($value),
        );
    }

    public function comparePrice(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value !== null ? $this->formatCurrency($value) : null,
            set: fn($value) => $value !== null ? $this->parseCurrency($value) : null,
        );
    }

    /**
     * Image URL
     */
    public function getImageUrlAttribute(): string
    {
        if (!$this->image || !file_exists(public_path('/uploads/products/small/' . $this->image))) {
            return asset('/images/no_image.png');
        }

        return asset('/uploads/products/small/' . $this->image);
    }

    /**
     * The relationship of the database tables
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function product_sizes()
    {
        return $this->hasMany(ProductSize::class);
    }

    public function size()
    {
        return $this->belongsTo(Size::class);
    }

    public function product_images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
