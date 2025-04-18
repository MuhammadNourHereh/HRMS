<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'status'
    ];

    protected $casts = [
        'status' => 'string'
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
