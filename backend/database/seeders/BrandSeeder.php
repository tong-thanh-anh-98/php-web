<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('brands')->insert([
            ['name' => 'Nike', 'status' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Adidas', 'status' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Yame', 'status' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => '4MEN', 'status' => 1, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
