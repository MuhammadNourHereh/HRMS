<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    use HasFactory, Notifiable;
    use SoftDeletes;

    protected $fillable = [
        'employee_id',
        'amount',
        'payroll_details',
        'payed_at',
    ];

    protected $casts = [
        'payroll_details' => 'array',
    ];

    protected $dates = [
        'payed_at',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
