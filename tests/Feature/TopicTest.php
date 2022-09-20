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
        $response = $this->get("/api/topic/ola-mundo");

        $response->assertNotFound();
    }

    public function testCreateTopic(): void
    {
        $response = $this->post("/api/topic", ["title" => "Olá mundo"]);

        $response->assertCreated();
    }

    public function testGetTopics(): void
    {
        $response = $this->get("/api/topic");

        $response->assertSuccessful();
    }

    public function testViewTopic(): void
    {
        $response = $this->get("/api/topic/ola-mundo");

        $response->assertSuccessful();
    }

    public function testDeleteTopic(): void
    {
        $response = $this->delete("/api/topic/1");

        $response->assertNoContent();
    }
}
