<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'employees'; // Explicitly define the table name

    // Mass assignable attributes
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

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'date_of_birth' => 'datetime',
        'salary' => 'decimal:2',
    ];

    // // Relationship: Employee belongs to a Department
    // public function department()
    // {
    //     return $this->belongsTo(Department::class);
    // }

    // // Relationship: Employee belongs to a Position
    // public function position()
    // {
    //     return $this->belongsTo(Position::class);
    // }

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
