<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            [
                'position_name' => 'Manager',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'position_name' => 'Developer',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        foreach ($positions as $position) {
            Position::create($position);
        }
    }
}