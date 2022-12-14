<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\TopicController;
use App\Http\Helpers\Permalink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(TopicController::class)->group(function () {
    Route::get("/topic", "index");
    Route::post("/topic", "create");
    Route::get("/topic/{permalink}", "view");
    Route::delete("/topic/{permalink}", "delete");
});

Route::controller(CommentController::class)->group(function () {
    Route::post("/comment", "create");
    Route::get("/comment", "index");
});
