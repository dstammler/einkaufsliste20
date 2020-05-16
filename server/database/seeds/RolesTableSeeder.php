<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role1 = new \App\Role;
        $role1->label = "Seeker";
        $role1->save();

        $role2 = new \App\Role;
        $role2->label = "Helper";
        $role2->save();
    }
}
