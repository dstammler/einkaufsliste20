<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShoppingListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopping_lists', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('seeker_id')->unsigned();
            $table->foreign('seeker_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->integer('helper_id')->unsigned()->nullable();
            $table->foreign('helper_id')->references('id')->on('users');
            $table->date('end_date')->nullable();
            $table->decimal('finalPrice', 5,2)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shopping_list');
    }
}
