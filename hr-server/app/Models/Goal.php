<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Goal extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $fillable = [
        'employee_id',
        'review_cycle_id',
        'title',
        'description',
        'priority',
        'status'
    ];
    
    protected $casts = [
        'priority' => 'string',
        'status' => 'string',
    ];
    

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function reviewCycle()
    {
        return $this->belongsTo(ReviewCycle::class);
    }
   
    public function progresses()
    {
        return $this->hasMany(GoalProgress::class);
    }
}