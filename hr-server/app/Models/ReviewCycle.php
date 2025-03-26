<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReviewCycle extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'provided_hr_id',
        'cycle_name',
        'start_date',
        'end_date'
    ];
    
    protected $dates = [
        'start_date',
        'end_date',
        'created_at',
        'updated_at',
        'deleted_at'
    ];
    
    public function hr()
    {
        return $this->belongsTo(Employee::class, 'provided_hr_id');
    }
    
    public function performanceReviews()
    {
        return $this->hasMany(PerformancesReview::class);
    }

/*     public function feedbacks()
{
    return $this->hasMany(Feedback::class);
}

*/
public function goals()
{
    return $this->hasMany(Goal::class);
} 
}