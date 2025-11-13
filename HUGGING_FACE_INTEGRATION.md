# Hugging Face AI Integration Guide

## Overview

The Restyle10 wardrobe system is now integrated with the **Stylique/recomendation** Hugging Face model to provide AI-powered outfit recommendations. This integration uses the Gradio API to send user data (wardrobe items, weather, and preferences) to the model and receive personalized outfit suggestions.

## Features

✨ **AI-Powered Recommendations**: Get intelligent outfit suggestions based on:
- Your wardrobe items (name, category, color, brand, size, description)
- Current weather conditions (temperature, humidity, wind speed, weather condition)
- Your style preferences (preferred colors, categories, brands, occasions, style notes)
- Avoidance preferences (colors and categories to avoid)

🔄 **Automatic Fallback**: If the Hugging Face API is unavailable or fails, the system automatically falls back to the local preference-based algorithm.

💾 **Smart Caching**: Recommendations are cached for 1 hour to reduce API calls and improve performance.

## Setup Instructions

### 1. Get Your Hugging Face API Token

1. Go to [Hugging Face](https://huggingface.co/) and create an account or log in
2. Navigate to your profile settings → Access Tokens
3. Create a new token with `read` access
4. Copy the token (it starts with `hf_...`)

### 2. Configure the Application

Add your Hugging Face API token to your `.env` file:

```env
HUGGING_FACE_API_TOKEN=hf_your_token_here
```

### 3. Restart Your Application

After adding the token, restart your Laravel server:

```bash
php artisan config:clear
php artisan cache:clear
php artisan serve
```

## How It Works

### Backend Flow (Laravel)

1. **Endpoint**: `POST /api/wardrobe/ai-recommendations`
2. **Controller**: `WardrobeController@generateAIRecommendations`
3. **Process**:
   - Validates input (wardrobe items, weather, preferences, max_recommendations)
   - Formats data for Hugging Face API using `prepareHuggingFaceInput()`
   - Makes POST request to Gradio API to initiate prediction
   - Receives `event_id` from the API
   - Polls GET endpoint to retrieve prediction results (max 30 seconds)
   - Parses response using `parseHuggingFaceResponse()`
   - Maps recommended item IDs back to actual wardrobe items
   - Returns formatted recommendations to frontend

### Frontend Flow (React)

1. User clicks "Refresh Suggestions" or system auto-generates on load
2. `generateAISuggestion()` function is called
3. Checks cache first (1-hour TTL)
4. If not cached, sends request to backend API
5. If API succeeds, displays AI recommendations with 🤖 icon
6. If API fails, falls back to local algorithm
7. Caches results for future use

## Data Format

### Input to Hugging Face API

The system sends data in this format:

```javascript
[
  // Wardrobe items (JSON string)
  '[{"id": 1, "name": "Blue T-Shirt", "category": "t-shirt", "color": "blue", ...}, ...]',
  
  // Weather condition
  'Clear',
  
  // Temperature (°C)
  27,
  
  // Humidity (%)
  70,
  
  // Wind speed (m/s)
  5,
  
  // Preferred colors (comma-separated)
  'blue,black,white',
  
  // Preferred categories (comma-separated)
  't-shirt,jeans,sneakers',
  
  // Preferred brands (comma-separated)
  'nike,adidas,zara',
  
  // Preferred occasions (comma-separated)
  'casual,work',
  
  // Style notes (string)
  'I prefer minimalist and comfortable styles',
  
  // Avoid colors (comma-separated)
  'yellow,pink',
  
  // Avoid categories (comma-separated)
  'shorts',
  
  // Max recommendations (integer)
  6
]
```

### Expected Output from Hugging Face API

The model should return:

```json
{
  "data": [
    {
      "recommended_ids": [1, 5, 8, 12, 15, 20],
      "message": "Here's a look that blends your preferences with today's weather.",
      "reason": "Matched your preferred colors, the vibe described in your style notes. Weather: 27°C · Clear",
      "confidence": 0.85,
      "weather_temp": 27,
      "weather_condition": "Clear",
      "wind_speed": 5
    }
  ]
}
```

## Error Handling

The integration includes comprehensive error handling:

- **API_NOT_CONFIGURED**: Hugging Face token not set in `.env`
- **API_REQUEST_FAILED**: Failed to connect to Hugging Face API
- **NO_EVENT_ID**: Invalid response from API (missing event_id)
- **API_TIMEOUT**: API took too long to respond (>30 seconds)
- **VALIDATION_ERROR**: Invalid input data
- **INTERNAL_ERROR**: Unexpected server error

All errors are logged and the system automatically falls back to the local algorithm.

## Monitoring and Debugging

### Check Logs

Laravel logs all API calls and responses:

```bash
tail -f storage/logs/laravel.log
```

Look for these log entries:
- `Sending request to Hugging Face API`
- `Received event_id from Hugging Face`
- `Received result from Hugging Face`
- `Hugging Face API POST request failed` (errors)

### Test the API

You can test the API endpoint directly:

```bash
curl -X POST http://localhost:8000/api/wardrobe/ai-recommendations \
  -H "Content-Type: application/json" \
  -H "X-CSRF-TOKEN: your-csrf-token" \
  -d '{
    "wardrobe_items": [...],
    "weather": {...},
    "preferences": {...},
    "max_recommendations": 6
  }'
```

## Performance Considerations

- **Caching**: Results are cached for 1 hour to reduce API calls
- **Timeout**: API requests timeout after 30 seconds
- **Polling**: System polls every 1 second for up to 30 attempts
- **Fallback**: Instant fallback to local algorithm if API fails

## Model Integration Notes

The Hugging Face model (`Stylique/recomendation`) should be trained to:

1. Accept wardrobe items with their attributes
2. Consider weather conditions (temperature, condition, humidity, wind)
3. Respect user preferences (colors, categories, brands, occasions)
4. Avoid items the user dislikes
5. Return item IDs that form a complete outfit
6. Provide explanatory messages and confidence scores

## Future Improvements

- [ ] Add support for image-based recommendations
- [ ] Implement user feedback loop to improve recommendations
- [ ] Add A/B testing between AI and local algorithms
- [ ] Track recommendation success metrics
- [ ] Support multiple recommendation styles (conservative, bold, trendy)
- [ ] Add outfit occasion filters
- [ ] Implement seasonal preferences

## Troubleshooting

### "API_NOT_CONFIGURED" Error

**Solution**: Add `HUGGING_FACE_API_TOKEN` to your `.env` file

### "API_TIMEOUT" Error

**Solution**: 
- Check Hugging Face model status at https://huggingface.co/spaces/Stylique/recomendation
- The model may be sleeping (cold start takes time)
- Try again in a few moments

### "API_REQUEST_FAILED" Error

**Solution**:
- Verify your API token is valid
- Check if the Hugging Face Space is running
- Check your internet connection
- Look at Laravel logs for detailed error messages

### Recommendations Don't Match Preferences

**Solution**:
- The model may need more training data
- Check if the response format matches expected structure
- Verify the input data is correctly formatted
- Check Laravel logs for parsing errors

## Support

For issues related to:
- **Backend Integration**: Check `app/Http/Controllers/WardrobeController.php`
- **Frontend Integration**: Check `resources/js/pages/wardrobe.tsx`
- **Routes**: Check `routes/web.php`
- **Model Issues**: Visit https://huggingface.co/spaces/Stylique/recomendation

## License

This integration is part of the Restyle10 project and follows the same license.

