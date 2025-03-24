<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'department_name' => 'Information Technology',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'department_name' => 'Human Resources',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        foreach ($departments as $department) {
            Department::create($department);
        }
    }
}