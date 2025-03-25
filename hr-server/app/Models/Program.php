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
        'duration',
        'passing_score'
    ];

    public function scopeFilter($query, $filters){
        if (!empty($filters['search'])) {
            $query->where('name', 'like', "%{$filters['search']}%");
        }
        if (!empty($filters['duration'])) {
            $query->where('duration', '<=', $filters['duration']);
        }
        return $query;
    }
    public function getCertificationCountAttribute()
    {
        return $this->type === 'Certification' 
            ? $this->certifications()->count() 
            : null;
    }
    public function shouldGenerateCertification()
    {
        return $this->type === 'certification';
    }
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
    
    public function certifications() {
        return $this->hasMany(Certification::class);
    }
}
