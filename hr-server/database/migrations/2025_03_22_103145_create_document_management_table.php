<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('document_management', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->unsignedBigInteger('employee_id'); // Employee ID (foreign key)
            $table->string('file_type', 25); // File type (e.g., CV, PDF, IMAGE, etc.)
            $table->string('file_url', 255); // URL or file path to the document
            $table->text('file_description')->nullable(); // Optional file description
            $table->timestamp('upload_date')->useCurrent(); // Default timestamp for upload


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
        Schema::dropIfExists('document_management');
    }
};
