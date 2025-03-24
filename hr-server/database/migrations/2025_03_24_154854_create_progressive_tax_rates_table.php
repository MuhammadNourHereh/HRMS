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

        Schema::create('progressive_tax_rates', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('salary_min')->unique();
            $table->bigInteger('salary_max')->unique();
            $table->bigInteger('tax_rate');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progressive_tax_rates');
    }
};
