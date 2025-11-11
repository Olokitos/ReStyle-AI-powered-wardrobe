<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RatingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'transaction_id' => $this->transaction_id,
            'rating' => (int) $this->rating,
            'comment' => $this->comment,
            'created_at' => $this->created_at?->toDateTimeString(),
            'created_human' => $this->created_at?->diffForHumans(),
            'buyer' => [
                'id' => optional($this->buyer)->id,
                'name' => optional($this->buyer)->name,
            ],
        ];
    }
}

