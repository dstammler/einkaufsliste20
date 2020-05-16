<?php

use Illuminate\Database\Seeder;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $comment = new \App\Comment;
        $comment->content = "Könntest du mir bitte eine Milka Schoki mitnehmen und nicht die Lindt!!";
        $comment->shopping_list_id = 1;
        $comment->user_id = 1;

        $comment->save();

        $comment2 = new \App\Comment;
        $comment2->content = "Mach ich! Sonst nehm ich einfach ein Twix. #Gönnungs";
        $comment2->shopping_list_id = 1;
        $comment2->user_id = 2;

        $comment2->save();
    }
}
