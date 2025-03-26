<?php

namespace App\Models;

use App\Models\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'project_id',
        'title',
        'description',
        'employee_id',
        'due_date',
        'status'
    ];

    protected $casts = [
        'due_date' => 'date',
        'status' => 'string'
    ];

    protected $appends = ['is_overdue'];

    //  check if task is overdue
    public function getIsOverdueAttribute()
    {
        if (!$this->due_date || $this->status === 'completed') {
            return false;
        }
        
        return $this->due_date < now();
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

     public function employee()
     {
         return $this->belongsTo(Employee::class);
     }
}
