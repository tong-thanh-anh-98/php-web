<?php

namespace App\Models;

use App\Models\Brand;
use App\Models\Category;
use App\Models\ProductImage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product extends Model
{
    use SoftDeletes;
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
            get: fn($value) => number_format($value, 0, ',', '.') . ' ₫',
        );
    }

    public function comparePrice(): Attribute
    {
        return Attribute::make(
            get: fn($value) => number_format($value, 0, ',', '.') . ' ₫',
        );
    }

    public function toArray()
    {
        $array = parent::toArray();

        $array['price'] = $this->price;
        $array['compare_price'] = $this->compare_price;

        return $array;
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function product_images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function getImageUrlAttribute()
    {
        if ($this->image === "") {
            return "";
        }

        return asset('/uploads/products/small/' . $this->image);
    }
}
