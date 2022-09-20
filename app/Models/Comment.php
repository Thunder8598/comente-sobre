<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Model;
use Illuminate\Pagination\Paginator;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ["text", "email"];

    public static function getAll(int $offset = 0): Paginator
    {
        return parent::orderBy("topics.id", "desc")
            ->offset($offset * parent::LIMIT)
            ->simplePaginate(parent::LIMIT);
    }
}
