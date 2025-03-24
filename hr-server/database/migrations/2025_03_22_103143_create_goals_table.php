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

        Schema::create('goals', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('emp_id');
            $table->foreign('emp_id')->references('id')->on('employees')->onDelete('cascade')
            ->onUpdate('cascade');
            $table->bigInteger('pref_rev_id');
            $table->foreign('pref_rev_id')->references('id')->on('performances_reviews')->onDelete('cascade')
            ->onUpdate('cascade');
            $table->string('title');
            $table->string('description');
            $table->enum('priortiy', ["Low", "Medium", "High"]);
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
        Schema::dropIfExists('goals');
    }
};
