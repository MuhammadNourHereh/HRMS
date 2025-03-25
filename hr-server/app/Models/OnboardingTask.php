<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OnboardingTask extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'is_required'
    ];

    protected $casts = [
        'is_required' => 'boolean'
    ];

    public function employeeOnboardings()
    {
        return $this->hasMany(EmployeeOnboarding::class);
    }
}
