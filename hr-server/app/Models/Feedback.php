<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Feedback extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $table = "feedbacks";
    
    protected $fillable = [
        'employee_id',
        'review_cycle_id',
        'title',
        'description'
    ];
    
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];
    
   
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
    
   
    public function reviewCycle()
    {
        return $this->belongsTo(ReviewCycle::class);
    }
}