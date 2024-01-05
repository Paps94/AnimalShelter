<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Animal extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'type',
        'breed',
        'castrated',
        'reserved',
        'microchipped',
        'birthday',
        'weight',
        'sex',
        'shelter_id',
        'arrived_at_shelter',
        'live_with_cats',
        'live_with_dogs',
        'live_with_kids',
        'notes'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'birthday' => 'date',
    ];

    /**
     * Get the shelter that accomodates the animal.
     */
    public function shelter(): BelongsTo
    {
        return $this->belongsTo(Shelter::class);
    }
}
