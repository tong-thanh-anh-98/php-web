<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\SizeSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SizeSeeder::class,
        ]);
        // Tạo user admin
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'role' => 'admin'
        ]);

        // Tạo user customer
        User::factory()->create([
            'name' => 'Customer',
            'email' => 'customer@gmail.com',
            'role' => 'customer',
        ]);
    }
}
