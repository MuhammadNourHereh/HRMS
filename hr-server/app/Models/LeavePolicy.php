<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LeavePolicy extends Model {
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'employee_id', 
        'leave_type', 
        'balance'
    ];

    public function employee() {
        return $this->belongsTo(Employee::class);
    }
}
