<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentManagement extends Model
{
    // You can define the table name if it's different from the plural form of the model name
    // protected $table = 'document_management';
    // Disable the default timestamps management by Laravel
    public $timestamps = false;

    // Mass assignable attributes
    protected $fillable = ['file_type', 'file_url', 'file_description', 'employee_id'];

    /**
     * Get the employee that owns the document.
     */
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
