<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shelter>
 */
class ShelterFactory extends Factory
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
            'capacity' => fake()->randomNumber(3, false),
            'address' => fake()->streetAddress(),
            'city' => fake()->city(),
            'region' => fake()->state(),
            'postcode' => fake()->postcode(),
        ];
    }
}
