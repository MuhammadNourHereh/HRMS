<?php

namespace Database\Seeders;
use Carbon\Carbon;

use App\Models\Employee;
use App\Models\Leave;
use App\Models\LeavePolicy;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LeaveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('leaves')->insert([
            [
                'employee_id' => 2,
                'leave_policy_id' => 1, 
                'is_paid' => true, 
                'start_date' => Carbon::now()->addDays(1),
                'end_date' => Carbon::now()->addDays(3), 
                'reason' => 'Feeling unwell',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'employee_id' => 2, 
                'leave_policy_id' => 2, 
                'is_paid' => false,
                'start_date' => Carbon::now()->addMonth(), 
                'end_date' => Carbon::now()->addMonths(2), 
                'reason' => 'family event',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'employee_id' => 3, 
                'leave_policy_id' => 6, 
                'is_paid' => true, 
                'start_date' => Carbon::now()->addWeeks(2), 
                'end_date' => Carbon::now()->addWeeks(2)->addDays(14), 
                'reason' => 'giving birth', 
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'employee_id' => 4, 
                'leave_policy_id' => 8, 
                'is_paid' => false,
                'start_date' => Carbon::now()->addDays(5), 
                'end_date' => Carbon::now()->addDays(7), 
                'reason' => 'Personal reasons', 
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
