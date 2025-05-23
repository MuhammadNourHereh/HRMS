<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Enrollment extends Model {
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'employee_id', 
        'program_id', 
        'completion_date', 
        'status',
        'score',
        'progress'
    ];

    protected $casts = [
        'completion_date' => 'date'
    ];

    public function employee() {
        return $this->belongsTo(Employee::class,'employee_id');
    }

    public function program() {
        return $this->belongsTo(Program::class, 'program_id');
    }
}

