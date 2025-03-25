<?php

namespace App\Models;

use App\Models\DocumentManagement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Report extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'document_type',
        'document_id',
        'status',
        'emp_id'
    ];

    protected $casts = [
        'document_type' => 'string',
        'status' => 'string'
    ];

     public function employee(){
         return $this->belongsTo(Employee::class, 'emp_id');
     }

    
    public function document()
    {
        return $this->belongsTo(DocumentManagement::class);
    }
    
}
