<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::table('goals', function (Blueprint $table) {
            $table->dropForeign(['pref_rev_id']);
            
            $table->dropColumn('pref_rev_id');
            
            $table->foreignId('review_cycle_id')->constrained('review_cycles')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::enableForeignKeyConstraints();
    }

  
    public function down(): void
    {
    
    }
};