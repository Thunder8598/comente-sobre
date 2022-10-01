<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Model;
use Illuminate\Pagination\Paginator;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ["text", "email", "topic"];

    public static function getAll(int $offset = 0): Paginator
    {
        return parent::orderBy("comments.id", "desc")
            ->offset($offset * parent::LIMIT)
            ->simplePaginate(parent::LIMIT);
    }

    public static function getCommentsByTopicId(int $id, int $offset = 0): Paginator
    {
        return parent::where("topic", "=", $id)
            ->orderBy("comments.id", "desc")
            ->offset($offset * parent::LIMIT)
            ->simplePaginate(parent::LIMIT);
    }
}
