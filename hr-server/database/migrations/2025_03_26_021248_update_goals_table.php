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

        Schema::table('goals', function (Blueprint $table) {
            $table->enum('status', ['Not Started', 'In Progress', 'Completed'])
                  ->default('Not Started')
                  ->after('priority');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::table('goals', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::enableForeignKeyConstraints();
    }
};