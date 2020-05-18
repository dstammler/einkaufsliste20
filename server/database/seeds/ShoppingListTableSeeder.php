<?php

use Illuminate\Database\Seeder;

class ShoppingListTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $list1 = new \App\ShoppingList;
        $list1->seeker_id = 1;
        $list1->helper_id = 2;
        $list1->end_date = '2020-04-20';
        $list1->finalPrice = '5.30';
        $list1->save();

        $list2 = new \App\ShoppingList;
        $list2->seeker_id = 1;
        $list2->helper_id = 2;
        $list2->end_date = '2020-02-25';
        $list2->finalPrice = '22.60';
        $list2->save();

        $list3 = new \App\ShoppingList;
        $list3->seeker_id = 1;
        $list3->helper_id = 2;
        $list3->end_date = '2020-05-30';
        $list3->save();

        $list4 = new \App\ShoppingList;
        $list4->seeker_id = 1;
        $list4->helper_id = 2;
        $list4->end_date = '2020-03-13';
        $list4->finalPrice = '16.30';
        $list4->save();

        $list5 = new \App\ShoppingList;
        $list5->seeker_id = 1;
        $list5->helper_id = 2;
        $list5->end_date = '2020-04-25';
        $list5->finalPrice = '7.99';
        $list5->save();

        $list6 = new \App\ShoppingList;
        $list6->seeker_id = 1;
        $list6->helper_id = null;
        $list6->end_date = '2020-05-20';
        $list6->save();
    }
}
