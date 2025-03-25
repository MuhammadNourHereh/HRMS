<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');
            $table->foreignId('program_id')->constrained('programs')->onDelete('cascade');
            $table->date('completion_date');
            $table->enum('status', ['InProgress', 'Completed', 'Failed'])->default('InProgress'); 
            $table->decimal('score', 5, 2)->nullable;
            $table->decimal('progress', 5, 2)->nullable;
            $table->timestamps();
            $table->softDeletes();
            $table->unique(['employee_id', 'program_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};
