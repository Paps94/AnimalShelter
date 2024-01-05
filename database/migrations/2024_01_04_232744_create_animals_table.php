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
        Schema::create('animals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['dog', 'cat']);
            $table->string('breed')->nullable();
            $table->boolean('castrated')->default(false);
            $table->boolean('microchipped')->default(false);
            $table->boolean('reserved')->default(false);
            $table->date('birthday')->nullable();
            $table->float('weight', 6, 2)->nullable();
            $table->enum('sex', ['male', 'female']);
            $table->unsignedBigInteger('shelter_id');
            $table->foreign('shelter_id')->references('id')->on('shelters');
            $table->date('arrived_at_shelter');
            $table->boolean('live_with_cats')->default(false);
            $table->boolean('live_with_dogs')->default(false);
            $table->boolean('live_with_kids')->default(false);
            $table->longText('notes');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
