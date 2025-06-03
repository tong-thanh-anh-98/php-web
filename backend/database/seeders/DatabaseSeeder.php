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
            CategorySeeder::class,
            BrandSeeder::class,
        ]);

        // Create admin
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'role' => 'admin'
        ]);

        // Create customer
        User::factory()->create([
            'name' => 'AnhTT',
            'email' => 'att@gmail.com',
            'role' => 'customer',
        ]);
    }
}
