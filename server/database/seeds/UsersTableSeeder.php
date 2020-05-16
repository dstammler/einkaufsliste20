<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user4 = new \App\User;
        $user4->email = "defaultuser@default.com";
        $user4->password = bcrypt('default');
        $user4->firstname = "Default";
        $user4->lastname = "User";
        $user4->city = "Musterstadt";
        $user4->save();

        $user = new \App\User;
        $user->email = "bernd.gruber@hotmail.com";
        $user->password = bcrypt('asdf123');
        $user->firstname = "Bernd";
        $user->lastname = "Gruber";
        $user->street = "Herrenstrasse";
        $user->housenumber = 80;
        $user->city = "Linz";
        $user->zip = 4020;
        $user->save();

        $user1 = new \App\User;
        $user1->email = "super.mario@hotmail.com";
        $user1->password = bcrypt("HelpMario");
        $user1->firstname = "Super";
        $user1->lastname = "Mario";
        $user1->city ="Cityland";
        $user1->save();

        $user2 = new \App\User;
        $user2->email = "DavidWurfel@einrot.com";
        $user2->password = bcrypt("asdf123");
        $user2->firstname = "David";
        $user2->lastname = "Wurfel";
        $user2->street = "Rosenstraße";
        $user2->housenumber = 49;
        $user2->city = "Wöllersdorf";
        $user2->zip = 3064;
        $user2->save();

        $user3 = new \App\User;
        $user3->email = "super.luigi@hotmail.com";
        $user3->password = bcrypt("HelpLuigi");
        $user3->firstname = "Super";
        $user3->lastname = "Luigi";
        $user3->city = "Cityland";
        $user3->save();


    }
}
