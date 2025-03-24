<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [
            [
                'department_id' => 1, // IT Department
                'position_id' => 1, // Manager
                'first_name' => 'Ziad',
                'last_name' => 'Khoury',
                'email' => 'ziad.khoury@example.com',
                'password' => bcrypt('password123'),
                'date_of_birth' => '1985-05-15',
                'address' => 'Hamra Street, Beirut',
                'phone_number' => '+961 3 123 456',
                'gender' => 'male',
                'role' => 'hr',
                'salary' => 3500.00,
            ],
            [
                'department_id' => 1, // IT Department
                'position_id' => 2, // Developer
                'first_name' => 'Layla',
                'last_name' => 'Haddad',
                'email' => 'layla.haddad@example.com',
                'password' => bcrypt('password123'),
                'date_of_birth' => '1990-08-22',
                'address' => 'Bliss Street, Beirut',
                'phone_number' => '+961 3 234 567',
                'gender' => 'female',
                'role' => 'employee',
                'salary' => 2200.00,
            ],
            [
                'department_id' => 1, // IT Department
                'position_id' => 2, // Developer
                'first_name' => 'Omar',
                'last_name' => 'Gemayel',
                'email' => 'omar.gemayel@example.com',
                'password' => bcrypt('password123'),
                'date_of_birth' => '1988-03-10',
                'address' => 'Mar Mikhael, Beirut',
                'phone_number' => '+961 3 345 678',
                'gender' => 'male',
                'role' => 'employee',
                'salary' => 2100.00,
            ],
            [
                'department_id' => 1, // IT Department
                'position_id' => 2, // Developer
                'first_name' => 'Nadia',
                'last_name' => 'Saab',
                'email' => 'nadia.saab@example.com',
                'password' => bcrypt('password123'),
                'date_of_birth' => '1992-11-03',
                'address' => 'Gemmayze, Beirut',
                'phone_number' => '+961 3 456 789',
                'gender' => 'female',
                'role' => 'employee',
                'salary' => 1950.00,
            ],
            [
                'department_id' => 1, // IT Department
                'position_id' => 2, // Developer
                'first_name' => 'Karim',
                'last_name' => 'Abou Zeid',
                'email' => 'karim.abouzeid@example.com',
                'password' => bcrypt('password123'),
                'date_of_birth' => '1987-07-25',
                'address' => 'Ashrafieh, Beirut',
                'phone_number' => '+961 3 567 890',
                'gender' => 'male',
                'role' => 'employee',
                'salary' => 2050.00,
            ],
            [
                'department_id' => 2, // HR Department
                'position_id' => 1, // Manager
                'first_name' => 'Rania',
                'last_name' => 'Nassar',
                'email' => 'rania.nassar@example.com',
                'password' => bcrypt('password123'),
                'date_of_birth' => '1983-12-18',
                'address' => 'Verdun, Beirut',
                'phone_number' => '+961 3 678 901',
                'gender' => 'female',
                'role' => 'hr',
                'salary' => 3200.00,
            ],
            [
                'department_id' => 2, // HR Department
                'position_id' => 2, // Developer (used as a general role for non-managers)
                'first_name' => 'Sami',
                'last_name' => 'Rahme',
                'email' => 'sami.rahme@example.com',
                'password' => bcrypt('password123'),
                'date_of_birth' => '1991-04-07',
                'address' => 'Jounieh',
                'phone_number' => '+961 3 789 012',
                'gender' => 'male',
                'role' => 'employee',
                'salary' => 1800.00,
            ],
            [
                'department_id' => 2, // HR Department
                'position_id' => 2, // Developer (used as a general role for non-managers)
                'first_name' => 'Maya',
                'last_name' => 'Aoun',
                'email' => 'maya.aoun@example.com',
                'password' => bcrypt('password123'),
                'date_of_birth' => '1989-09-30',
                'address' => 'Batroun',
                'phone_number' => '+961 3 890 123',
                'gender' => 'female',
                'role' => 'employee',
                'salary' => 1750.00,
            ],
            [
                'department_id' => 2, // HR Department
                'position_id' => 2, // Developer (used as a general role for non-managers)
                'first_name' => 'Fadi',
                'last_name' => 'Ibrahim',
                'email' => 'fadi.ibrahim@example.com',
                'password' => bcrypt('password123'),
                'date_of_birth' => '1986-02-14',
                'address' => 'Tripoli',
                'phone_number' => '+961 3 901 234',
                'gender' => 'male',
                'role' => 'employee',
                'salary' => 1900.00,
            ],
            [
                'department_id' => 2, // HR Department
                'position_id' => 2, // Developer (used as a general role for non-managers)
                'first_name' => 'Yasmine',
                'last_name' => 'Khalil',
                'email' => 'yasmine.khalil@example.com',
                'password' => bcrypt('password123'),
                'date_of_birth' => '1993-06-12',
                'address' => 'Sidon',
                'phone_number' => '+961 3 012 345',
                'gender' => 'female',
                'role' => 'employee',
                'salary' => 1650.00,
            ],
        ];

        foreach ($employees as $employee) {
            Employee::create($employee);
        }
    }
}
