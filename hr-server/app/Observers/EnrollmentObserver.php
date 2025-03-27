<?php

namespace App\Observers;

use App\Models\Enrollment;
use App\Models\Certification;

class EnrollmentObserver
{
    /**
     * Handle the Enrollment "created" event.
     */
    public function created(Enrollment $enrollment): void
    {
        //
    }

    /**
     * Handle the Enrollment "updated" event.
     */
    public function updated(Enrollment $enrollment) 
    {
        if ($enrollment->progress == 100 && $enrollment->score >= $enrollment->program->passing_score) {
            // Prevent unnecessary update if already completed
            if ($enrollment->status !== 'Completed') {
                $enrollment->update(['status' => 'Completed']);
            }
    
            // Avoid creating duplicate certifications
            Certification::firstOrCreate([
                'employee_id' => $enrollment->employee_id,
                'program_id' => $enrollment->program_id,
            ], [
                'status' => 'Pending',
                'certificate_name' => $enrollment->program->name,
                'issued_date' => now(), 
            ]);
        }
    }
    

    /**
     * Handle the Enrollment "deleted" event.
     */
    public function deleted(Enrollment $enrollment): void
    {
        //
    }

    /**
     * Handle the Enrollment "restored" event.
     */
    public function restored(Enrollment $enrollment): void
    {
        //
    }

    /**
     * Handle the Enrollment "force deleted" event.
     */
    public function forceDeleted(Enrollment $enrollment): void
    {
        //
    }
}
