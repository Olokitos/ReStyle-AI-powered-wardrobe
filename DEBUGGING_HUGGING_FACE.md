# 🔍 Debugging Guide: Verifying Hugging Face API Requests

## 🎯 Quick Answer

**Check Laravel logs!** The system logs every step of the API interaction. Here's how:

## 📋 Method 1: Monitor Laravel Logs (Recommended)

### Real-Time Monitoring

Open a terminal and run:

```bash
# Windows (PowerShell)
Get-Content storage\logs\laravel.log -Wait -Tail 50

# Linux/Mac
tail -f storage/logs/laravel.log | grep -i "hugging face"
```

### What to Look For

When you click "Refresh Suggestions", you should see these log entries in order:

#### ✅ Success Flow:

```log
[2024-XX-XX XX:XX:XX] local.INFO: Sending request to Hugging Face API 
{
  "input_data": [...14 parameters...],
  "user_id": 1
}

[2024-XX-XX XX:XX:XX] local.INFO: Received event_id from Hugging Face 
{
  "event_id": "abc123xyz..."
}

[2024-XX-XX XX:XX:XX] local.INFO: Received result from Hugging Face 
{
  "result": {...},
  "user_id": 1
}
```

#### ❌ Error Flow:

```log
# No token configured
[2024-XX-XX XX:XX:XX] local.WARNING: Hugging Face API token not configured

# API request failed
[2024-XX-XX XX:XX:XX] local.ERROR: Hugging Face API POST request failed 
{
  "status": 401,
  "response": "...",
  "user_id": 1
}

# No event_id received
[2024-XX-XX XX:XX:XX] local.ERROR: No event_id received from Hugging Face API

# Timeout waiting for results
[2024-XX-XX XX:XX:XX] local.ERROR: Hugging Face API timed out waiting for results
```

## 📊 Method 2: Check Browser Console

Open your browser's Developer Tools (F12) and look at the **Console** and **Network** tabs:

### Console Tab

Look for messages like:
```
Hugging Face API error, falling back to local algorithm: ...
```

### Network Tab

1. Open DevTools → **Network** tab
2. Filter by: **Fetch/XHR**
3. Click "Refresh Suggestions"
4. Look for: **`/api/wardrobe/ai-recommendations`**
5. Click on it to see:
   - **Request Payload**: What was sent
   - **Response**: What was received
   - **Status Code**: 
     - `200` = Success ✅
     - `500` = Server error ❌
     - `504` = Timeout ❌

### Example Network Response

**Success (200):**
```json
{
  "success": true,
  "recommendations": {...},
  "source": "hugging_face_ai",
  "event_id": "abc123..."
}
```

**Failure (500):**
```json
{
  "success": false,
  "error": "API_REQUEST_FAILED",
  "message": "Failed to connect to AI service"
}
```

## 🧪 Method 3: Test API Endpoint Directly

### Using cURL (Command Line)

```bash
# Get your CSRF token first (from browser DevTools → Application → Cookies)
# Then run:

curl -X POST http://localhost:8000/api/wardrobe/ai-recommendations \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "X-CSRF-TOKEN: your_csrf_token_here" \
  -H "Cookie: laravel_session=your_session_here" \
  -d '{
    "wardrobe_items": [
      {
        "id": 1,
        "name": "Blue T-shirt",
        "category": "T-shirt",
        "color": "Blue",
        "brand": "Nike",
        "size": "M"
      }
    ],
    "weather": {
      "main": {"temp": 27, "humidity": 70},
      "weather": [{"main": "Clear"}],
      "wind": {"speed": 5}
    },
    "preferences": {
      "preferredColors": ["Blue", "Black"],
      "preferredCategories": ["T-shirt"],
      "styleNotes": "Casual style"
    },
    "max_recommendations": 6
  }'
```

### Using Postman

1. **Method**: POST
2. **URL**: `http://localhost:8000/api/wardrobe/ai-recommendations`
3. **Headers**:
   - `Content-Type: application/json`
   - `Accept: application/json`
   - `X-CSRF-TOKEN: [get from browser cookies]`
   - `Cookie: laravel_session=[get from browser cookies]`
4. **Body** (raw JSON):
```json
{
  "wardrobe_items": [...],
  "weather": {...},
  "preferences": {...},
  "max_recommendations": 6
}
```

## 🔍 Method 4: Check Hugging Face Space Status

Visit the Hugging Face Space directly to see if it's running:

**Space URL**: https://huggingface.co/spaces/Stylique/recomendation

**Check**:
- ✅ **Green "Running"** badge = Space is active
- ⚠️ **"Paused"** = Space is sleeping (may take time to wake up)
- ❌ **"Error"** = Space has issues

## 🛠️ Method 5: Add Enhanced Logging

If you want more detailed logging, you can add this to `WardrobeController.php`:

### Enhanced Logging Option

After line 343, add:

```php
// Log the actual HTTP request details
Log::info('Hugging Face API Request Details', [
    'url' => $apiUrl,
    'headers' => [
        'Content-Type' => 'application/json',
        'Authorization' => "Bearer " . substr($hfToken, 0, 10) . "...", // Only log first 10 chars
    ],
    'payload_size' => strlen(json_encode(['data' => $inputData])),
    'parameters_count' => count($inputData),
]);
```

After line 344, add:

```php
// Log the HTTP response details
Log::info('Hugging Face API Response Details', [
    'status_code' => $postResponse->status(),
    'headers' => $postResponse->headers(),
    'body_preview' => substr($postResponse->body(), 0, 500), // First 500 chars
]);
```

## 📈 Method 6: Create a Test Route (Quick Debug)

Add this temporary route to `routes/web.php` for quick testing:

```php
// Temporary debug route - remove after testing
Route::get('/test-hf-api', function () {
    $token = env('HUGGING_FACE_API_TOKEN');
    
    if (!$token) {
        return response()->json([
            'error' => 'No token configured',
            'check' => 'Add HUGGING_FACE_API_TOKEN to .env'
        ]);
    }
    
    try {
        $response = Http::timeout(10)
            ->withHeaders([
                'Authorization' => "Bearer {$token}",
            ])
            ->get('https://stylique-recomendation.hf.space/');
        
        return response()->json([
            'token_configured' => true,
            'token_preview' => substr($token, 0, 10) . '...',
            'space_status' => $response->status(),
            'space_accessible' => $response->successful(),
            'response_preview' => substr($response->body(), 0, 500)
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
    }
})->middleware('auth');
```

Then visit: `http://localhost:8000/test-hf-api`

**Remove this route after testing!**

## ✅ Verification Checklist

Use this checklist to verify everything is working:

- [ ] **Token Configured**: `.env` has `HUGGING_FACE_API_TOKEN`
- [ ] **Logs Show Request**: See "Sending request to Hugging Face API" in logs
- [ ] **Event ID Received**: See "Received event_id from Hugging Face" in logs
- [ ] **Result Received**: See "Received result from Hugging Face" in logs
- [ ] **Browser Console**: No errors in browser console
- [ ] **Network Tab**: Request returns `200` status
- [ ] **User Sees 🤖 Emoji**: Success message shows AI icon
- [ ] **Space Running**: Hugging Face Space shows "Running" status

## 🐛 Common Issues & Solutions

### Issue 1: No Logs Appearing

**Problem**: Nothing in Laravel logs when clicking "Refresh"

**Solution**:
```bash
# Check if logging is enabled
tail -f storage/logs/laravel.log

# Check file permissions
chmod -R 775 storage/logs/

# Check if route is being hit
# Add dd('test') at the start of generateAIRecommendations()
```

### Issue 2: "API_NOT_CONFIGURED" Error

**Problem**: Logs show "Hugging Face API token not configured"

**Solution**:
```bash
# 1. Check .env file
cat .env | grep HUGGING_FACE_API_TOKEN

# 2. Clear config cache
php artisan config:clear

# 3. Verify token loaded
php artisan tinker
>>> env('HUGGING_FACE_API_TOKEN')
```

### Issue 3: "API_REQUEST_FAILED" Error

**Problem**: POST request fails (401, 403, or 500)

**Solution**:
- ✅ Check token is valid (starts with `hf_`)
- ✅ Check token has read access
- ✅ Verify Space is running
- ✅ Check network connectivity
- ✅ Look at response body in logs for details

### Issue 4: "API_TIMEOUT" Error

**Problem**: Model takes too long to respond

**Solution**:
- ✅ Space might be "cold starting" (wait 1-2 minutes)
- ✅ Model might be processing (check Space status)
- ✅ Increase timeout in controller (line 381)
- ✅ Try again after a few seconds

### Issue 5: Logs Show Request But No Response

**Problem**: See "Sending request" but no "Received event_id"

**Solution**:
- ✅ Check Hugging Face Space status
- ✅ Verify API endpoint URL is correct
- ✅ Check if token is valid
- ✅ Look for error response in logs

## 📊 Success Indicators

You'll know it's working when you see:

### In Laravel Logs:
```
✅ "Sending request to Hugging Face API"
✅ "Received event_id from Hugging Face"
✅ "Received result from Hugging Face"
```

### In Browser:
```
✅ Network tab shows: 200 OK
✅ Response has: "source": "hugging_face_ai"
✅ User sees: "🤖 AI-powered outfit suggestions..."
```

### In Code Response:
```json
{
  "success": true,
  "recommendations": {...},
  "source": "hugging_face_ai",
  "event_id": "abc123..."
}
```

## 🚀 Quick Debug Commands

### Check if Token is Loaded:
```bash
php artisan tinker
>>> env('HUGGING_FACE_API_TOKEN')
# Should show: "hf_..."
```

### Watch Logs in Real-Time:
```bash
# Windows
Get-Content storage\logs\laravel.log -Wait -Tail 20

# Linux/Mac
tail -f storage/logs/laravel.log
```

### Clear Everything:
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

### Test Route Exists:
```bash
php artisan route:list | grep ai-recommendations
# Should show: POST api/wardrobe/ai-recommendations
```

## 📝 Summary

**The easiest way to verify requests are being received:**

1. **Open terminal** → `tail -f storage/logs/laravel.log`
2. **Open browser** → Click "Refresh Suggestions"
3. **Watch terminal** → Should see 3 log entries:
   - ✅ "Sending request to Hugging Face API"
   - ✅ "Received event_id from Hugging Face"  
   - ✅ "Received result from Hugging Face"

**If you see all 3 entries = Success!** 🎉

**If you see errors = Check the error message for details** ❌

---

**Pro Tip**: Keep the logs open in a separate terminal window while testing, so you can see what's happening in real-time!

