<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GoalProgress extends Model
{
    use HasFactory, SoftDeletes;
    
   protected $table = "goal_progresses";
   
    protected $fillable = [
        'goal_id',
        'progress_note',
        'progress_bar'
    ];
    
    protected $casts = [
        'progress_bar' => 'decimal:2',
    ];
    
  
    public function goal()
    {
        return $this->belongsTo(Goal::class);
    }
}