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
            $offset = (int)$request->input("page");
            $offset == 0 ? 1 : $offset;

            $offset--;

            return response()->json(Topic::getAll($offset));
        } catch (Exception $e) {
            Log::error(__CLASS__ . ":" . __FUNCTION__, ["error" => $e]);

            return response()->json(null, 500);
        }
    }

    public function create(Request $request): JsonResponse
    {
        try {
            $title = $request->input("topic");
            $topic = Topic::getTopicByPermalink(Permalink::generatePermalink($title));

            if (!empty($topic))
                return response()->json($topic, Response::HTTP_OK);

            $topic = new Topic(["title" => $title, "permalink" => Permalink::generatePermalink($title)]);

            $topic->save();

            return response()->json($topic, Response::HTTP_CREATED);
        } catch (Exception $e) {
            Log::error(__CLASS__ . ":" . __FUNCTION__, ["error" => $e]);

            return response()->json(null, 500);
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

    public function delete(Request $request, string $permalink): JsonResponse
    {
        try {
            Topic::deleteTopicByPermalink($permalink);

            return response()->json(null, 204);
        } catch (Exception $e) {
            Log::error(__CLASS__ . ":" . __FUNCTION__, ["error" => $e]);

            return response()->json(null, 500);
        }
    }
}
