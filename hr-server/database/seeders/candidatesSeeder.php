<?php

namespace Database\Seeders;

use App\Models\Candidate;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class candidatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $candidates = [
            [
                'name' => 'John Doe',
                'email' => 'john.doe@example.com',
                'status' => 'applied',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane.smith@example.com',
                'status' => 'interview',
            ],
            [
                'name' => 'Robert Johnson',
                'email' => 'robert.johnson@example.com',
                'status' => 'accepted',
            ],
            [
                'name' => 'Emily Williams',
                'email' => 'emily.williams@example.com',
                'status' => 'rejected',
            ],
            [
                'name' => 'Michael Brown',
                'email' => 'michael.brown@example.com',
                'status' => 'applied',
            ],
        ];

        foreach ($candidates as $candidate) {
            Candidate::create($candidate);
        }
    }
}
