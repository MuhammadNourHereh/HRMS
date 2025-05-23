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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('document_type', ['tax', 'health', 'contract', 'certification', 'other']);
            $table->foreignId('document_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->enum('status', ['submitted', 'approved', 'rejected', 'pending'])->default('pending');
            $table->foreignId('emp_id')->constrained('employees')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
