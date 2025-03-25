<?php

namespace App\Models;

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

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // public function employee()
    // {
    //     return $this->belongsTo(Employee::class);
    // }
}
