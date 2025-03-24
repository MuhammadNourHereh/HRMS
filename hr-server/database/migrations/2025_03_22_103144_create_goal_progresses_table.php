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

        Schema::create('goal_progresses', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('goal_id');
            $table->foreign('goal_id')->references('id')->on('goals')->onDelete('cascade')
            ->onUpdate('cascade');
            $table->string('progress_note');
            $table->timestamp('created_at');
            $table->decimal('progress_bar');
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
        Schema::dropIfExists('goal_progresses');
    }
};
