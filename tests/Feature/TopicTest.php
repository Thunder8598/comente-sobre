<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TopicTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testNotFoundTopic(): void
    {
        $response = $this->get("/api/topic/ola-mundo2");

        $response->assertNotFound();
    }

    public function testCreateTopic(): void
    {
        $response = $this->post("/api/topic", ["title" => "Olá mundo2"]);

        $response->assertCreated();
        $response->assertJsonStructure([
            "id",
            "title",
            "permalink",
            "created_at",
            "updated_at",
        ]);
    }

    public function testGetTopics(): void
    {
        $response = $this->get("/api/topic");

        $response->assertSuccessful();
        $response->assertJsonStructure([
            "current_page",
            "data" => [
                [
                    "created_at",
                    "id",
                    "permalink",
                    "title",
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

    public function testViewTopic(): void
    {
        $response = $this->get("/api/topic/ola-mundo2");

        $response->assertSuccessful();
    }

    public function testDeleteTopic(): void
    {
        $response = $this->delete("/api/topic/ola-mundo2");

        $response->assertNoContent();
    }
}
