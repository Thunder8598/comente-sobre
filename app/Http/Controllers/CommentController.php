<?php

namespace App\Http\Controllers;

use App\Http\Helpers\Permalink;
use App\Models\Comment;
use App\Models\Topic;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $offset = (int)$request->input("page");
            $offset == 0 ? 1 : $offset;

            $offset--;

            return response()->json(Comment::getAll(), Response::HTTP_OK);
        } catch (Exception $e) {
            Log::error(__CLASS__ . ":" . __FUNCTION__, ["error" => $e]);

            return response()->json(null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function create(Request $request): JsonResponse
    {
        try {
            $permalink = Permalink::generatePermalink($request->input("permalink"));
            $topic = Topic::getTopicByPermalink($permalink);

            if (empty($topic))
                throw new Exception("Topic not found");

            $comment = new Comment(["text" => $request->input("comment"), "email" => $request->input("email"), "topic" => $topic->id]);

            if (!empty($responseTo = $request->input("response_to")))
                $comment->response_to = $responseTo;

            $comment->save();

            return response()->json($comment, Response::HTTP_CREATED);
        } catch (Exception $e) {
            Log::error(__CLASS__ . ":" . __FUNCTION__, ["error" => $e]);

            return response()->json(null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
