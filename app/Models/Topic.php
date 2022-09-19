<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Topic extends Model
{
    use HasFactory;

    protected $fillable = ["title", "permalink"];

    public function getTopicByPermalink(string $permalink, int $offset = 0): Collection
    {
        return parent::where("permalink", "=", $permalink)
            ->orderBy("topics.id", "desc")
            ->offset($offset * parent::LIMIT)
            ->simplePaginate(parent::LIMIT);
    }
}
