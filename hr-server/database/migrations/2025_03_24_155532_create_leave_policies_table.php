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
        Schema::create('leave_policies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');
            $table->integer('balance')->default(0);
            $table->enum('leave_type', ['Maternity', 'Paternity', 'Sick', 'Annual', 'Other']);
            $table->timestamps();
            $table->softDeletes();
        
            $table->unique(['employee_id', 'leave_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('leave_policies');
        Schema::enableForeignKeyConstraints();
    }
};
