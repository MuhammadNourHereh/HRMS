<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClockedWorker extends Model
{
    // Mass assignable attributes
    protected $fillable = [
        'employee_id',
        'longitude',
        'latitude',
        // 'clock_in_time',
        'clock_out_time'
    ];

    // Relationship method to fetch the employee associated with the clocked worker
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
