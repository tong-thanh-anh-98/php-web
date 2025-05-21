<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'             => 'required|string|max:255',
            'price'             => 'required|numeric|min:0',
            'compare_price'     => 'nullable|numeric',
            // 'compare_price'     => 'nullable|numeric|gte:price',
            // 'description'       => 'nullable|string',
            // 'short_description' => 'nullable|string',
            'image'             => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'category_id'       => 'required|exists:categories,id',
            // 'brand_id'          => 'nullable|exists:brands,id',
            // 'qty'               => 'nullable|integer|min:0',
            'sku'               => 'required|unique:products,sku',
            // 'barcode'           => 'nullable|string|max:255',
            'status'            => 'required|in:0,1',
            'is_featured'       => 'required|in:yes,no',
        ];
    }
}
