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
        Schema::disableForeignKeyConstraints();

        Schema::create('review_cycles', function (Blueprint $table) {
            $table->id();
            $table->string('cycle_name');
            $table->date('start_date');
            $table->date('end_date');
            $table->unsignedBigInteger('provided_hr_id');
            $table->foreign('provided_hr_id')
            ->references('id')
            ->on('employees')
            ->onDelete('cascade')
            ->onUpdate('cascade');            
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
            $table->timestamp('deleted_at');

        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('review_cycles');
    }
};