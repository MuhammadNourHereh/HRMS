<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory, Notifiable;
    use SoftDeletes;

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
        'salary',
    ];

    // Define relationships with other models

    public function salaries()
    {
        return $this->hasMany(Salary::class);
    }

    public function deductions()
    {
        return $this->hasMany(Deduction::class);
    }

    public function payrolls()
    {
        return $this->hasMany(Payroll::class);
    }

    public function overtimes()
    {
        return $this->hasMany(Overtime::class);
    }

    public function leavePolicies()
    {
        return $this->hasMany(LeavePolicy::class);
    }
}
