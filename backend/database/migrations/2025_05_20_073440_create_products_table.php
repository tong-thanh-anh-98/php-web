<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            // $table->decimal('price', 10, 2);
            // $table->decimal('compare_price', 10, 2)->nullable(); // Chỉ dùng nếu cần xử lý phần lẻ (như thanh toán thẻ quốc tế).
            $table->unsignedBigInteger('price'); // Và phù hợp với đặc thù tiền tệ VN.
            $table->unsignedBigInteger('compare_price')->nullable();
            $table->text('description')->nullable();
            $table->text('short_description')->nullable();
            $table->string('image')->nullable();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('brand_id')->nullable()->constrained()->onDelete('cascade');
            $table->integer('qty')->nullable();
            $table->string('sku');
            $table->string('barcode')->nullable();
            $table->integer('status')->default(1);
            $table->enum('is_featured', ['yes', 'no'])->default('no');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
