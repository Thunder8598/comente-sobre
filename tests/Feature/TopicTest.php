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
    public function testCreateTopic(): void
    {
        $response = $this->post("/api/topic", ["topic" => "Olá mundo"]);

        $response->assertCreated();
    }

    public function testGetTopics(): void
    {
        $response = $this->get("/api/topic");

        $response->assertSuccessful();
    }

    public function testViewTopic(): void
    {
        $response = $this->get("/api/topic/1");

        $response->assertSuccessful();
    }

    public function testDeleteTopic(): void
    {
        $response = $this->delete("/api/topic/1");

        $response->assertNoContent();
    }
}
