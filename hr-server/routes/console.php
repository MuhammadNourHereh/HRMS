<?php

use App\Models\Employee;
use App\Models\Salary;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Foundation\Console\ClosureCommand;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    /** @var ClosureCommand $this */
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(function () {
    Log::channel('daily')->info('Scheduler started');
    $employees = Employee::all();

    foreach ($employees as $emp) {
        Salary::create([
            "employee_id" => $emp->id,
            "amount" => $emp->salary,
        ]);
    }
})->weekends();
