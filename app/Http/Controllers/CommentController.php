<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    public function create(Request $request): JsonResponse
    {
        try {
            $comment = new Comment(["text" => $request->input("comment"), "email" => $request->input("email")]);
            $comment->save();

            return response()->json(null, Response::HTTP_CREATED);
        } catch (Exception $e) {
            Log::error(__CLASS__ . ":" . __FUNCTION__, ["error" => $e]);

            return response()->json(null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
