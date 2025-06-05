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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('sub_total', 15, 0);
            $table->decimal('grand_total', 15, 0);
            $table->decimal('shipping', 15, 0);
            $table->decimal('discount', 15, 0)->nullable();
            $table->enum('payment_status', ['paid', 'not paid'])->default('not paid');
            $table->enum('status', ['pending', 'shipped', 'delivered', 'cancelled'])->default('pending');
            $table->string('name');
            $table->string('email');
            $table->string('mobile');
            $table->string('address');
             $table->string('district');
            $table->string('city');
            $table->string('zip');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
