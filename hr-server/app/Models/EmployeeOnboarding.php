<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmployeeOnboarding extends Model
{

    use HasFactory, SoftDeletes;
    protected $fillable = [
        'employee_id',
        'onboarding_task_id',
        'status',
        'completed_date'
    ];

    protected $casts = [
        'status' => 'string',
        'completed_date' => 'datetime'
    ];

    public function employee()
{
    return $this->belongsTo(Employee::class);
}

public function onboardingTask()
{
    return $this->belongsTo(OnboardingTask::class);
}
}
