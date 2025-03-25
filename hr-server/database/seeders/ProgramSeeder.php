<?php

namespace Database\Seeders;
use App\Models\Program;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;


class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Program::create([
            'name' => 'Computer Science Fundamentals',
            'description' => 'An introductory course on computer science principles.',
            'type' => 'Certification', 
            'difficulty' => 'Beginner', 
            'duration' => 30, 
            'passing_score' => 60, 
        ]);

        Program::create([
            'name' => 'Computer Engineering Fundamentals',
            'description' => 'An introductory course on computer engineering principles.',
            'type' => 'Certification', 
            'difficulty' => 'Advanced', 
            'duration' => 70, 
            'passing_score' => 70, 
        ]);

        Program::create([
            'name' => 'Electric Engineering Fundamentals',
            'description' => 'An introductory course on electric engineering principles.',
            'type' => 'Assessment', 
            'difficulty' => 'Beginner', 
            'duration' => 60, 
            'passing_score' => 50, 
        ]);
    }
}
