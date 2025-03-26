<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocationUpdate extends Model
{
    use HasFactory;

    // Table name (optional if it follows Laravel's naming conventions)
    protected $table = 'location_updates';

    // Define the fillable attributes
    protected $fillable = [
        'employee_id',
        'latitude',
        'longitude',
        'timestamp',
    ];

    // Optionally, if you have relationships, you can define them here
    public function employee()
    {
        return $this->belongsTo(Employee::class); // Assuming you have an Employee model
    }
}
