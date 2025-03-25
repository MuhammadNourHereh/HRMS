<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'username' => 'abc',
                'firstname' => 'abc',
                'lastname' => 'abc',
                'password' => bcrypt('121212'),
            ],
            [
                'username' => 'ali_hassan',
                'firstname' => 'Ali',
                'lastname' => 'Hassan',
                'password' => bcrypt('121212'),
            ],
            [
                'username' => 'mohammad_khalil',
                'firstname' => 'Mohammad',
                'lastname' => 'Khalil',
                'password' => bcrypt('121212'),
            ],
            [
                'username' => 'fatima_ahmad',
                'firstname' => 'Fatima',
                'lastname' => 'Ahmad',
                'password' => bcrypt('121212'),
            ],
        ];

        DB::table('users')->insert($users);
    }
}
