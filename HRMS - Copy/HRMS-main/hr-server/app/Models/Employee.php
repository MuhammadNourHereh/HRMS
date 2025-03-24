<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    // Mass assignable attributes
    protected $fillable = ['first_name', 'last_name'];

    // Relationship method to fetch documents associated with the employee
    public function documents()
    {
        return $this->hasMany(DocumentManagement::class, 'employee_id');
    }
    // Relationship method to fetch clocked workers associated with the employee
    public function clockedWorkers()
    {
        return $this->hasMany(ClockedWorker::class, 'employee_id');
    }

}
