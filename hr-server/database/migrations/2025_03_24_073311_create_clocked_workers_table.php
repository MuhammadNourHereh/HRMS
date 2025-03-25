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
        Schema::create('clocked_workers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('employee_id'); // Employee ID (foreign key)
            // $table->timestamps();

            $table->decimal('longitude', 10, 6)->nullable();
            $table->decimal('latitude', 10, 6)->nullable();
            // $table->timestamp('clock_in_time');
            $table->timestamp('clock_out_time')->nullable();




            $table->timestamps(); // Adds created_at and updated_at
            $table->softDeletes(); // Adds deleted_at for soft deletes

            $table->foreign('employee_id')->references('id')->on('employees')->onDelete('cascade'); // Foreign key constraint
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clocked_workers');
    }
};
