<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    /**
     * Fields that can be mass-assigned
     */
    protected $fillable = [
        'title',
        'completed',
    ];

    /**
     * A task belongs to a user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
