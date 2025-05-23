<?php

namespace App\Models;

use App\Models\Report;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DocumentManagement extends Model
{
    use HasFactory, SoftDeletes;

    // Explicitly set the correct table name

    protected $table = 'documents';

    // Mass assignable attributes
    protected $fillable = ['file_type', 'file_url', 'file_description', 'employee_id', 'deleted_at'];

    // Enable timestamps if they exist in the migration
    public $timestamps = true; // If timestamps are in the migration

    /**
     * Get the employee that owns the document.
     */
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }


    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    public function candidates()
    {
        return $this->hasMany(Candidate::class);
    }
}
