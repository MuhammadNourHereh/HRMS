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
        Schema::table('certifications', function (Blueprint $table) {
            $table->dropColumn('document_id'); // Remove document_id
            $table->string('document_url')->nullable()->after('status'); // Add document_url
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {        
        Schema::table('certifications', function (Blueprint $table) {
        $table->dropColumn('document_url');
        $table->unsignedBigInteger('document_id')->nullable()->after('status');
    });
    }
};
