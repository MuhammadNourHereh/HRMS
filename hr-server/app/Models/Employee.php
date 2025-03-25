<?php

namespace App\Models;

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
