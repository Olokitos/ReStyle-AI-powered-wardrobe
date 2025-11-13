# 🎯 Hugging Face Integration - Quick Reference Card

## 🚀 Setup in 30 Seconds

```bash
# 1. Add to .env file
HUGGING_FACE_API_TOKEN=hf_your_token_here

# 2. Clear cache
php artisan config:clear && php artisan cache:clear

# 3. Done! Test it in the wardrobe page
```

## 📍 Key Files

| File | What It Does | Lines |
|------|--------------|-------|
| `WardrobeController.php` | Backend API logic | 289-595 |
| `wardrobe.tsx` | Frontend integration | 854-988 |
| `web.php` | API route | 136-138 |

## 🔄 API Flow

```
Frontend → Laravel Backend → Hugging Face API → Parse Response → User
          (validates)         (processes)        (maps items)
```

## 📊 Input Parameters (14 total)

```javascript
1. Wardrobe Items (JSON)
2. Weather Condition
3. Temperature (°C)
4. Humidity (%)
5. Wind Speed (m/s)
6. Preferred Colors
7. Preferred Categories
8. Preferred Brands
9. Preferred Occasions
10. Style Notes
11. Avoid Colors
12. Avoid Categories
13. Max Recommendations
```

## 📤 Output Format

```json
{
  "recommended_ids": [1, 5, 8, 12],
  "message": "Your outfit message",
  "reason": "Why these items",
  "confidence": 0.85
}
```

## 🎯 Success Indicators

✅ "🤖 AI-powered outfit suggestions..." message
✅ Recommendations in 5-30 seconds
✅ Confidence score 85%+
✅ Logs show "Received result from Hugging Face"

## 🐛 Quick Troubleshooting

| Problem | Fix |
|---------|-----|
| API_NOT_CONFIGURED | Add token to `.env` |
| API_TIMEOUT | Wait, try again (model cold start) |
| No 🤖 emoji | Check logs, verify token |
| Empty results | Check model response format |

## 📝 Testing Commands

```bash
# Watch logs
tail -f storage/logs/laravel.log | grep -i "hugging face"

# Clear everything
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

## 🔧 Common Adjustments

### Change timeout (30s default):
```php
// WardrobeController.php line 381
$maxAttempts = 30; // 30 seconds
```

### Change cache (1 hour default):
```typescript
// wardrobe.tsx line 891
< 3600000 // 1 hour in milliseconds
```

### Change max recommendations (6 default):
```typescript
// wardrobe.tsx line 705
useState(6) // default number
```

## 📚 Full Docs

- **Quick Setup**: `QUICK_SETUP_HUGGING_FACE.md`
- **Technical**: `HUGGING_FACE_INTEGRATION.md`
- **Overview**: `HUGGING_FACE_SUMMARY.md`

## 🆘 Emergency Fallback

If API fails, system automatically uses:
1. Preference-based algorithm
2. Weather-based algorithm
3. Random selection

**User always gets recommendations!**

## ✨ Best Practices

✅ Set detailed user preferences
✅ Keep weather data updated
✅ Monitor Laravel logs
✅ Cache for performance
✅ Test fallback system
✅ Provide user feedback

## 🎊 Integration Status

- [x] Backend implemented
- [x] Frontend integrated
- [x] Routes configured
- [x] Fallback working
- [x] Caching enabled
- [x] Error handling
- [x] Logging active
- [ ] **Add your API token!**
- [ ] **Test it!**

---

**Get Your Token**: https://huggingface.co/settings/tokens
**Model Space**: https://huggingface.co/spaces/Stylique/recomendation

---

*Keep this card handy for quick reference!* 📌

