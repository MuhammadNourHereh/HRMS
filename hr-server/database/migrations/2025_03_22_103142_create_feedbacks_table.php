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

        Schema::create('feedbacks', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('emp_id');
            $table->foreign('emp_id')->references('id')->on('employees')->onDelete('cascade')
            ->onUpdate('cascade');
            $table->string('title');
            $table->string('description');
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
            $table->timestamp('deleted_at');
            $table->bigInteger('review_cycle_id');
            $table->foreign('review_cycle_id')->references('id')->on('review_cycles')->onDelete('cascade')
            ->onUpdate('cascade');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedbacks');
    }
};
