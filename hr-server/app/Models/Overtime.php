<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OverTime extends Model
{
    use HasFactory, SoftDeletes;
    use SoftDeletes;


    protected $fillable = [
        'employee_id',
        'hours',
        'pay_rate',
        'payed_at',
    ];
}