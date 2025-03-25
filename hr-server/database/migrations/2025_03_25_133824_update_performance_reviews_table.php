<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::table('performances_reviews', function (Blueprint $table) {
            $table->dropForeign(['rev_cyc_id']);
            
            $table->renameColumn('rev_cyc_id', 'review_cycle_id');
            
            $table->foreign('review_cycle_id')
                ->references('id')
                ->on('review_cycles')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });

        Schema::enableForeignKeyConstraints();
    }

    public function down(): void
    {
        
    }
};