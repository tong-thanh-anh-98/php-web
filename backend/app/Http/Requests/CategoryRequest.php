<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
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
        $rules = [
        'status' => 'required|in:0,1'
    ];

    if ($this->isMethod('post')) {
        // Create
        $rules['name'] = 'required|string|max:255|unique:categories,name';
    }

    if ($this->isMethod('put') || $this->isMethod('patch')) {
        // Update
        $categoryId = $this->route('category'); // get ID from route /categories/{category}
        $rules['name'] = 'required|string|max:255|unique:categories,name,' . $categoryId;
    }

    return $rules;
    }
}
