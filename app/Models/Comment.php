<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Pagination\Paginator;
use Ramsey\Collection\Collection;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ["text", "email", "topic"];

    public function responses(): HasMany
    {
        return $this->hasMany(Comment::class, "response_to");
    }

    public static function getCommentsByTopicId(int $id, int $offset = 0): Paginator
    {
        return parent::where("topic", "=", $id)
            ->whereNull("response_to")
            ->orderBy("comments.id", "desc")
            ->with("responses")
            ->offset($offset * parent::LIMIT)
            ->simplePaginate(parent::LIMIT);
    }

    public static function findCommentResponsesById(int $id): Collection
    {
        return parent::where("response_to", "=", $id)
            ->orderBy("comments.id", "desc")
            ->get();
    }
}
