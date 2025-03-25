<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Certification extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'employee_id', 
        'program_id',
        'document_id', 
        'certificate_name', 
        'issued_date', 
        'expiry_date',
        'status'
    ];

    protected $casts = [
        'issued_date' => 'date', 
        'expiry_date' => 'date', 
    ];

    public function employee() {
        return $this->belongsTo(Employee::class);
    }

    public function program() {
        return $this->belongsTo(Program::class);
    }

    public function document() {
        return $this->belongsTo(Document::class);
    }
}
