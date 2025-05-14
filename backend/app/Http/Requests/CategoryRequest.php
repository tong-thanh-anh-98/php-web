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
             'name' => 'required|string|max:255',
            'status' => 'nullable|in:0,1' // 1: kích hoạt, 0: ẩn
        ];

        return $rules;
    }

    // public function messages(): array
    // {
    //     return [
    //         'name.required' => 'Tên danh mục là bắt buộc.',
    //         'name.string' => 'Tên danh mục phải là chuỗi.',
    //         'name.max' => 'Tên danh mục không được vượt quá 255 ký tự.',
    //         'status.in' => 'Trạng thái phải là 0 hoặc 1.'
    //     ];
    // }
}
