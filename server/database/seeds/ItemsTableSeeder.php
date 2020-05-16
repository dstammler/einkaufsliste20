<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // seeds for list 1
        $item = new \App\Item;
        $item->label = "Klopapier";
        $item->amount = 10;
        $item->unit = "Rollen";
        $item->max_price = 5;
        $item->shopping_list_id = 1;
        $item->checked = true;
        $item->save();

        $item = new \App\Item;
        $item->label = "Kaffee";
        $item->amount = 17;
        $item->unit = "Bohnen";
        $item->max_price = 0.77;
        $item->shopping_list_id = 1;
        $item->checked = true;
        $item->save();

        $item= new \App\Item;
        $item->label = "Schokolade";
        $item->amount = 5;
        $item->unit = "Tafel";
        $item->max_price = 8;
        $item->shopping_list_id = 1;
        $item->checked = true;
        $item->save();

        // seeds for list 2
        $item = new \App\Item;
        $item->label = "Kokosmilch";
        $item->amount = 0.5;
        $item->unit = "Liter";
        $item->max_price = 1.99;
        $item->shopping_list_id = 2;
        $item->checked = true;
        $item->save();

        $item = new \App\Item;
        $item->label = "Bio-Linsen";
        $item->amount = 400;
        $item->unit = "Gramm";
        $item->max_price = 1.50;
        $item->shopping_list_id = 2;
        $item->checked = true;
        $item->save();

        $item = new \App\Item;
        $item->label = "Karotten";
        $item->amount = 1;
        $item->unit = "Kilo";
        $item->max_price = 2;
        $item->shopping_list_id = 2;
        $item->checked = true;
        $item->save();

        $item = new \App\Item;
        $item->label = "Hausbrot";
        $item->amount = 1;
        $item->unit = "Laib";
        $item->max_price = 3;
        $item->shopping_list_id = 2;
        $item->checked = true;
        $item->save();

        $item = new \App\Item;
        $item->label = "Oliven";
        $item->amount = 1;
        $item->unit = "Glas";
        $item->max_price = 2;
        $item->shopping_list_id = 2;
        $item->checked = true;
        $item->save();

        $item = new \App\Item;
        $item->label = "Schokolade";
        $item->amount = 1;
        $item->unit = "Tafel";
        $item->max_price = 2;
        $item->shopping_list_id = 2;
        $item->checked = true;
        $item->save();

        $item = new \App\Item;
        $item->label = "Erdbeeren";
        $item->amount = 500;
        $item->unit = "Gramm";
        $item->max_price = 3;
        $item->shopping_list_id = 2;
        $item->checked = true;
        $item->save();

        $item = new \App\Item;
        $item->label = "Kartoffel";
        $item->amount = 1;
        $item->unit = "Kilo";
        $item->max_price = 4;
        $item->shopping_list_id = 2;
        $item->checked = true;
        $item->save();

        // seeds for list 3
        $item = new \App\Item;
        $item->label = "Kokosmilch";
        $item->amount = 0.5;
        $item->unit = "Liter";
        $item->max_price = 1.99;
        $item->shopping_list_id = 3;
        $item->checked = false;
        $item->save();

        $item = new \App\Item;
        $item->label = "Klopapier";
        $item->amount = 10;
        $item->unit = "Rollen";
        $item->max_price = 5;
        $item->shopping_list_id = 3;
        $item->checked = false;
        $item->save();

        $item = new \App\Item;
        $item->label = "Tomaten";
        $item->amount = 250;
        $item->unit = "Gramm";
        $item->max_price = 2;
        $item->shopping_list_id = 3;
        $item->checked = false;
        $item->save();

        $item = new \App\Item;
        $item->label = "BioBananen";
        $item->amount = 4;
        $item->unit = "Stück";
        $item->max_price = 2;
        $item->shopping_list_id = 3;
        $item->checked = false;
        $item->save();

        $item = new \App\Item;
        $item->label = "Chilipulver";
        $item->amount = 1;
        $item->unit = "Dose";
        $item->max_price = 2.5;
        $item->shopping_list_id = 3;
        $item->checked = false;
        $item->save();

        // seeds for list 4
        $item = new \App\Item;
        $item->label = "Bio-Linsen";
        $item->amount = 400;
        $item->unit = "Gramm";
        $item->max_price = 1.50;
        $item->shopping_list_id = 4;
        $item->checked = true;
        $item->save();

        $item = new \App\Item;
        $item->label = "Hausbrot";
        $item->amount = 1;
        $item->unit = "Laib";
        $item->max_price = 3;
        $item->shopping_list_id = 4;
        $item->checked = true;
        $item->save();

        $item = new \App\Item;
        $item->label = "Klopapier";
        $item->amount = 10;
        $item->unit = "Rollen";
        $item->max_price = 5;
        $item->shopping_list_id = 4;
        $item->checked = true;
        $item->save();

        $item = new \App\Item;
        $item->label = "Kartoffel";
        $item->amount = 1;
        $item->unit = "Kilo";
        $item->max_price = 4;
        $item->shopping_list_id = 4;
        $item->checked = true;
        $item->save();

        $item = new \App\Item;
        $item->label = "BioBananen";
        $item->amount = 4;
        $item->unit = "Stück";
        $item->max_price = 2;
        $item->shopping_list_id = 4;
        $item->checked = true;
        $item->save();
    }
}
