<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Program extends Model {
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 
        'description',
        'type',
        'difficulty',
        'duration_days',
        'passing_score'
    ];

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
    
    public function certifications() {
        return $this->hasMany(Certification::class);
    }
}
