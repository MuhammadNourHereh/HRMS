<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PerformancesReview extends Model
{
    use HasFactory, SoftDeletes;
    
  
    
  
    protected $fillable = [
        'employee_id',
        'review_cycle_id',
        'overall_rating',
        'comments'
    ];


    protected $casts = [
        'overall_rating' => 'decimal:2',
    ];
    
 
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
  
    public function reviewCycle()
    {
        return $this->belongsTo(ReviewCycle::class);
    }
    

    // public function goals()
    // {
    //     return $this->hasMany(Goal::class, 'pref_rev_id');
    // }
}