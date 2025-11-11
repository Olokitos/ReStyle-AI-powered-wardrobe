<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Activewear',
                'slug' => 'activewear',
                'description' => 'Sportswear, gym clothes, and athletic apparel',
            ],
            [
                'name' => 'Accessories',
                'slug' => 'accessories',
                'description' => 'Bags, jewelry, scarves, hats, and other accessories',
            ],
            [
                'name' => 'Bottoms',
                'slug' => 'bottoms',
                'description' => 'Pants, jeans, skirts, and other lower body clothing',
            ],
            [
                'name' => 'Pants',
                'slug' => 'pants',
                'description' => 'Standalone pants and trousers for every occasion',
            ],
            [
                'name' => 'Hats',
                'slug' => 'hats',
                'description' => 'Caps, beanies, and headwear accessories',
            ],
            [
                'name' => 'Dresses',
                'slug' => 'dresses',
                'description' => 'One-piece garments including casual and formal dresses',
            ],
            [
                'name' => 'Jackets',
                'slug' => 'jackets',
                'description' => 'Jackets, coats, blazers, and other outer garments',
            ],
            [
                'name' => 'Shoes',
                'slug' => 'shoes',
                'description' => 'Footwear including sneakers, heels, boots, and sandals',
            ],
            [
                'name' => 'Tops',
                'slug' => 'tops',
                'description' => 'Shirts, blouses, t-shirts, and other upper body clothing',
            ],
            [
                'name' => 'Polos',
                'slug' => 'polos',
                'description' => 'Classic polo shirts for casual to smart-casual outfits',
            ],
            [
                'name' => 'Underwear',
                'slug' => 'underwear',
                'description' => 'Intimates, lingerie, and foundational garments',
            ],
            [
                'name' => 'Vintage',
                'slug' => 'vintage',
                'description' => 'Vintage and retro clothing items',
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                array_merge($category, ['is_active' => true]),
            );
        }
    }
}