<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CommentTest extends TestCase
{
    public function testCreateNewComment(): void
    {
        $response = $this->post("/api/comment", ["comment" => "Olá mundo", "email" => "teste@gmail.com.br", "topic" => "1"]);

        $response->assertCreated();
    }

    public function testGetComments(): void
    {
        $response = $this->get("/api/comment");

        $response->assertSuccessful();
        $response->assertJsonStructure([
            "current_page",
            "data" => [
                [
                    "id",
                    "created_at",
                    "email",
                    "text",
                    "topic",
                    "updated_at",
                ]
            ],
            "first_page_url",
            "from",
            "next_page_url",
            "path",
            "per_page",
            "prev_page_url",
            "to",
        ]);
    }
}
