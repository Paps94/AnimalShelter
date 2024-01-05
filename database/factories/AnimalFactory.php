<?php

namespace Database\Factories;

use App\Models\Shelter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Animal>
 */
class AnimalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'type' => fake()->randomElement(['cat', 'dog']),
            'breed' => fake()->word(),
            'castrated' => fake()->boolean(),
            'reserved' => fake()->boolean(),
            'microchipped' => fake()->boolean(),
            'birthday' => fake()->dateTime()->format('d-m-Y'),
            'weight' => fake()->randomFloat(2, 1, 10),
            'sex' => fake()->randomElement(['male', 'female']),
            'shelter_id' => fake()->randomElement(Shelter::pluck('id')),
            'arrived_at_shelter' => fake()->dateTimeThisYear(),
            'live_with_cats' => fake()->boolean(),
            'live_with_dogs' => fake()->boolean(),
            'live_with_kids' => fake()->boolean(),
            'notes' => fake()->paragraph()
        ];
    }
}
