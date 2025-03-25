<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Notifications\Notifiable;

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
        'salary'
    ];
    protected $casts = [
        'date_of_birth' => 'datetime',
        'salary' => 'decimal:2',
    ];
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

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function position()
    {
        return $this->belongsTo(Position::class);
    }




    // Relationship: Employee has many Documents
    public function documents()
    {
        return $this->hasMany(DocumentManagement::class, 'employee_id');
    }

    // Relationship: Employee has many Clocked Workers
    public function clockedWorkers()
    {
        return $this->hasMany(ClockedWorker::class, 'employee_id');
    }
}
