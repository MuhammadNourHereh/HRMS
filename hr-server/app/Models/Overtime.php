<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Overtime extends Model
{
    use HasFactory, Notifiable;
    use SoftDeletes;

    protected $fillable = [
        'employee_id',
        'hours',
        'pay_rate',
        'payed_at',
    ];

    protected $dates = [
        'payed_at',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
