<?php

namespace App\Models;
    
use App\Models\LeavePolicy;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'department_id',
        'position_id',
        'first_name',
        'last_name',
        'email',
        'password',
        'date_of_birth',
        'address',
        'phone_number',
        'gender',
        'role',
        'salary'
    ];



    protected static function boot()
    {
        parent::boot();
    
        static::created(function ($employee) {
            LeavePolicy::create([
                'employee_id' => $employee->id,
                'leave_type' => 'Sick',
                'balance' => 10
            ]);
    
            LeavePolicy::create([
                'employee_id' => $employee->id,
                'leave_type' => 'Other',
                'balance' => 0
            ]);
    
            // gender-based leave policies
            if ($employee->gender === 'female') {
                LeavePolicy::create([
                    'employee_id' => $employee->id,
                    'leave_type' => 'Maternity',
                    'balance' => 60
                ]);
            } elseif ($employee->gender === 'male') {
                LeavePolicy::create([
                    'employee_id' => $employee->id,
                    'leave_type' => 'Paternity',
                    'balance' => 15
                ]);
            }
        });
    }
    
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    public function leaves() {
        return $this->hasMany(Leave::class);
    }

    public function enrollments() {
        return $this->hasMany(Enrollment::class);
    }

    public function certifications() {
        return $this->hasMany(Certification::class);
    }

    public function leavePolicy() {
        return $this->hasMany(LeavePolicy::class);
    }
}
