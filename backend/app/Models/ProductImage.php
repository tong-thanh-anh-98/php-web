<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductImage extends Model
{
    use SoftDeletes;

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if ($this->image === "") {
            return asset('/images/no_image.jpg');
        }

        return asset('/uploads/products/small/' . $this->image);
    }
}
