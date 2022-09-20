<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Helpers\Permalink;
use Illuminate\Http\JsonResponse;

class TopicController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            return response()->json(Topic::getAll());
        } catch (Exception $e) {
            Log::error(__CLASS__ . ":" . __FUNCTION__, ["error" => $e]);

            return response()->json(null, 500);
        }
    }

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

    public function view(Request $request, string $permalink): JsonResponse
    {
        try {
            $topic = Topic::getTopicByPermalink($permalink);

            if (empty($topic))
                return response()->json(null, 404);

            return response()->json($topic);
        } catch (Exception $e) {
            Log::error(__CLASS__ . ":" . __FUNCTION__, ["error" => $e]);

            return response()->json(null, 500);
        }
    }
}
