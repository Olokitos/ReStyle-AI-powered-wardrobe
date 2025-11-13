<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => ['required', 'integer', 'exists:products,id'],
        ]);

        $user = $request->user();

        // Prevent duplicate favorites without overriding timestamps unnecessarily
        $user->favoriteProducts()->syncWithoutDetaching([$validated['product_id']]);

        return redirect()->back()->with('success', 'Item added to favorites.');
    }

    public function destroy(Request $request, Product $product)
    {
        $request->user()->favoriteProducts()->detach($product->id);

        return redirect()->back()->with('success', 'Item removed from favorites.');
    }
}

