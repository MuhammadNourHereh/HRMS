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

        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('password_hash');
            $table->dateTime('date_of_birth');
            $table->string('address');
            $table->integer('phone_number');
            $table->bigInteger('dep_id');
            $table->foreign('dep_id')->references('id')->on('departments');
            $table->bigInteger('pos_id');
            $table->foreign('pos_id')->references('id')->on('positions');
            $table->enum('gender', ["Male", "Female"]);
            $table->decimal('salary');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
