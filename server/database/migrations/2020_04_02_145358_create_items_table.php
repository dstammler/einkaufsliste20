<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->increments('id');
            $table->string('label');
            $table->integer('amount');
            $table->string('unit');
            $table->integer('max_price')->nullable();
            $table->boolean('checked')->default(false);

            $table->integer('shopping_list_id')->unsigned();
            $table->foreign('shopping_list_id')
                ->references('id')->on('shopping_lists')
                ->onDelete('cascade');


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
        Schema::dropIfExists('items');
    }
}
