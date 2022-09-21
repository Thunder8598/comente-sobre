<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TopicsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("topics")->insert(["id" => "1", "title" => "Olá Mundo", "permalink" => "ola-mundo"]);

        for ($i = 0; $i < 50; $i++) {
            $string = Str::random();
            DB::table("topics")->insert(["title" => $string, "permalink" => $string]);
        }
    }
}
