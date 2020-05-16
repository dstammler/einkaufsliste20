<?php

use Illuminate\Database\Seeder;

class UserRoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userrole = new \App\UserRole;
        $userrole->role_id = 1;
        $userrole->user_id = 1;
        $userrole->save();

        $userrole = new \App\UserRole;
        $userrole->role_id = 2;
        $userrole->user_id = 2;
        $userrole->save();

        $userrole = new \App\UserRole;
        $userrole->role_id = 1;
        $userrole->user_id = 3;
        $userrole->save();

        $userroles = new \App\UserRole;
        $userroles->role_id = 2;
        $userroles->user_id = 4;
        $userroles->save();
    }
}
