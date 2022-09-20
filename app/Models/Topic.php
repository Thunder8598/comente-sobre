<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Pagination\Paginator;
use App\Models\Model;

class Topic extends Model
{
    use HasFactory;

    protected $fillable = ["title", "permalink"];

    public static function getAll(int $offset = 0): Paginator
    {
        return parent::orderBy("topics.id", "desc")
            ->offset($offset * parent::LIMIT)
            ->simplePaginate(parent::LIMIT);
    }

    public static function getTopicByPermalink(string $permalink, int $offset = 0): ?Topic
    {
        return parent::where("permalink", "like", "%{$permalink}%")->first();
    }

    public static function deleteTopicByPermalink(string $permalink): void
    {
        parent::where("permalink", "like", "%{$permalink}%")->delete();
    }
}
