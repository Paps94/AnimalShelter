<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shelter extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'capacity',
        'address',
        'city',
        'region',
        'postcode'
    ];

    /**
     * Get the animmals for the shelter.
     */
    public function animals(): HasMany
    {
        return $this->hasMany(Animal::class);
    }
}
