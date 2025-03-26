<?php
namespace App\Models;
    
use App\Models\LeavePolicy;

use Illuminate\Database\Eloquent\Model;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class Employee extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;
    use SoftDeletes;
    
    protected $fillable = [
        'department_id',
        'position_id',
        'first_name',
        'last_name',
        'email',
        'password',
        'date_of_birth',
        'address',
        'phone_number',
        'gender',
        'role',
        'salary'
    ];

    protected static function boot()
    {
        parent::boot();
    
        static::created(function ($employee) {
            LeavePolicy::create([
                'employee_id' => $employee->id,
                'leave_type' => 'Sick',
                'balance' => 10
            ]);
    
            LeavePolicy::create([
                'employee_id' => $employee->id,
                'leave_type' => 'Other',
                'balance' => 0
            ]);
    
            // gender-based leave policies
            if ($employee->gender === 'female') {
                LeavePolicy::create([
                    'employee_id' => $employee->id,
                    'leave_type' => 'Maternity',
                    'balance' => 60
                ]);
            } elseif ($employee->gender === 'male') {
                LeavePolicy::create([
                    'employee_id' => $employee->id,
                    'leave_type' => 'Paternity',
                    'balance' => 15
                ]);
            }
        });
    }
    
    protected $hidden = [
        'password',
        'remember_token',
    ];
    
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date_of_birth' => 'datetime',
            'salary' => 'decimal:2',
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    
    public function salaries()
    {
        return $this->hasMany(Salary::class);
    }
    public function deductions()
    {
        return $this->hasMany(Deduction::class);
    }
    public function payrolls()
    {
        return $this->hasMany(Payroll::class);
    }
    public function overtimes()
    {
        return $this->hasMany(Overtime::class);
    }
    public function leavePolicies()
    {
        return $this->hasMany(LeavePolicy::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    // Relationship: Employee has many Documents
    public function documents()
    {
        return $this->hasMany(DocumentManagement::class, 'employee_id');
    }
    // Relationship: Employee has many Clocked Workers
    public function clockedWorkers()
    {
        return $this->hasMany(ClockedWorker::class, 'employee_id');
    }

    public function leaves() {
        return $this->hasMany(Leave::class);
    }

    public function enrollments() {
        return $this->hasMany(Enrollment::class);
    }

    public function certifications() {
        return $this->hasMany(Certification::class);
    }

    public function leavePolicy() {
        return $this->hasMany(LeavePolicy::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function onboardings()
    {
        return $this->hasMany(EmployeeOnboarding::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'emp_id');
    }

    public function onboardingTasks()
    {
        return OnboardingTask::whereHas('employeeOnboardings', function($query) {
            $query->where('employee_id', $this->id);
        });
    }

    public function goals()
    {
        return $this->hasMany(Goal::class);
    }

public function performanceReviews()
{
    return $this->hasMany(PerformancesReview::class);
}

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}