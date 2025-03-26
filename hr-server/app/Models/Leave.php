<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Leave extends Model {
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'employee_id', 
        'leave_policy_id', 
        'is_paid',
        'start_date', 
        'end_date', 
        'status', 
        'reason'
    ];

    public function employee() {
        return $this->belongsTo(Employee::class);
    }

    public function leavePolicy() {
        return $this->hasMany(LeavePolicy::class);
    }
}

