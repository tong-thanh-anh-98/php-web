<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
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
            'price'             => 'required|numeric',
            'compare_price'     => 'nullable|numeric',
            'description'       => 'nullable|string',
            'short_description' => 'nullable|string',
            'category_id'       => 'required|exists:categories,id',
            'brand_id'          => 'nullable|exists:brands,id',
            'qty'               => 'nullable|integer|min:0',
            'sku'               => [
                'required',
                Rule::unique('products', 'sku')->ignore($this->product),
            ],
            'barcode'           => 'nullable|string|max:255',
            'status'            => 'required|in:0,1',
            'is_featured'       => 'required|in:yes,no',
        ];
    }
}
