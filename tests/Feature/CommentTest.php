<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CommentTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testCreateNewComment(): void
    {
        $response = $this->post("/api/comment", ["comment" => "Olá mundo", "email" => "teste@gmail.com.br"]);

        $response->assertCreated();
    }

    public function testGetComments(): void
    {
        $response = $this->get("/api/comment");

        $response->assertSuccessful();
    }
}
