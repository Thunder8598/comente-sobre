<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Helpers\Permalink;

class TopicController extends Controller
{
    public function create(Request $request): Response
    {
        try {
            $title = $request->input("title");
            $topic = new Topic(["title" => $title, "permalink" => Permalink::generatePermalink($title)]);

            $topic->save();

            return response(null, 201);
        } catch (Exception $e) {
            Log::error(__CLASS__ . ":" . __FUNCTION__, ["error" => $e]);

            return response(null, 500);
        }
    }
}
