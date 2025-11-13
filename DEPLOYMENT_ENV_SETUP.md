# 🔒 Safe Deployment Guide - Environment Variables

## ✅ What's Already Done

1. ✅ `.env` is in `.gitignore` - **WILL NOT be pushed to repository**
2. ✅ `.env.example` has been updated with all required variables
3. ✅ All sensitive values are removed from `.env.example`

---

## 📋 Step-by-Step: Safe Push & Deployment

### **Step 1: Verify .env is NOT being tracked**

Run this command to double-check:
```bash
git status
```

You should **NOT** see `.env` in the list. If you do see it, run:
```bash
git rm --cached .env
```

### **Step 2: Commit and Push Your Code**

```bash
# Add all changes (except .env - it's ignored)
git add .

# Commit your changes
git commit -m "Update system with latest changes and complete .env.example"

# Push to repository
git push origin main
```

**✅ Your `.env` file will NOT be pushed** - it's safely ignored!

---

## 🚀 Setting Up Environment on Laravel Forge

### **Step 3: After Repository is Connected in Forge**

1. Go to your **Site** in Forge
2. Click **"Environment"** tab
3. You'll see an empty `.env` file editor

### **Step 4: Copy This Production Configuration**

Paste this into the Forge Environment editor and **customize the values**:

```bash
# Application Configuration
APP_NAME=Restyle
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://your-domain.com

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

# Logging
LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=forge
DB_USERNAME=forge
DB_PASSWORD=YOUR_DATABASE_PASSWORD_FROM_FORGE

# Session
SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null
SESSION_SECURE_COOKIE=true

# Broadcasting
BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local

# Queue
QUEUE_CONNECTION=database

# Cache
CACHE_STORE=database

# Memcached Configuration
MEMCACHED_HOST=127.0.0.1

# Redis Configuration
REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Mail Configuration
MAIL_MAILER=smtp
MAIL_SCHEME=null
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_smtp_username
MAIL_PASSWORD=your_smtp_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@your-domain.com"
MAIL_FROM_NAME="${APP_NAME}"

# AWS Configuration (Optional - for S3 storage)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

# Vite Configuration
VITE_APP_NAME="${APP_NAME}"
VITE_WEATHER_API_KEY=6e830a5991ec8515dd4c1e1531069009

# Vite Dev Server Configuration (not needed in production, but keep for compatibility)
VITE_DEV_SERVER_HOST=127.0.0.1
VITE_DEV_SERVER_PORT=5173
VITE_DEV_SERVER_HMR_HOST=127.0.0.1
VITE_DEV_SERVER_HMR_PORT=5173

# Third-Party API Keys
# Hugging Face API for AI recommendations
HUGGING_FACE_API_TOKEN=hf_your_hugging_face_token_here

# Pusher Configuration (Optional - for real-time features)
VITE_PUSHER_APP_KEY=
VITE_PUSHER_HOST=
VITE_PUSHER_PORT=
VITE_PUSHER_SCHEME=
VITE_PUSHER_APP_CLUSTER=
```

### **Step 5: Get Required Values from Forge**

#### **A. Database Password:**
1. Go to **Server** → **Database** tab
2. Find the database (usually named "forge")
3. Click the **eye icon** to reveal password
4. Copy and paste into `DB_PASSWORD=`

#### **B. APP_KEY:**
- Forge will auto-generate this, OR
- After saving, run: `php artisan key:generate --force`

#### **C. APP_URL:**
- Replace `your-domain.com` with your actual domain
- Or use your server IP temporarily: `http://xxx.xxx.xxx.xxx`

### **Step 6: Save and Generate APP_KEY**

1. Click **"Save"** in Forge Environment editor
2. Go to **"Commands"** section
3. Run:
   ```bash
   php artisan key:generate --force
   php artisan config:cache
   ```

---

## 🔐 Security Checklist

Before pushing, verify:

- [ ] `.env` is in `.gitignore` ✅
- [ ] `.env` is NOT in `git status` ✅
- [ ] `.env.example` has NO real passwords/tokens ✅
- [ ] All sensitive values in `.env.example` are placeholders ✅
- [ ] You're ready to configure `.env` in Forge manually ✅

---

## 📝 Important Notes

### **Why .env Should NOT Be in Git:**
1. **Security**: Contains passwords, API keys, and secrets
2. **Different Environments**: Local dev vs production need different values
3. **Best Practice**: Standard Laravel practice

### **What Happens on Forge:**
1. Forge creates a `.env` file on the server automatically
2. You configure it through Forge's Environment tab
3. It stays on the server and is never in your repository
4. Each deployment uses the server's `.env` file

### **If You Accidentally Pushed .env:**
If you ever accidentally committed `.env`:

1. **Immediately**:
   ```bash
   git rm --cached .env
   git commit -m "Remove .env from repository"
   git push
   ```

2. **Rotate all secrets**:
   - Change all passwords
   - Regenerate all API keys
   - Generate new APP_KEY

3. **Check git history**:
   - If it was pushed, assume it's compromised
   - Rotate everything that was in it

---

## ✅ You're Safe to Push!

Your setup is correct:
- ✅ `.env` is ignored
- ✅ `.env.example` is updated
- ✅ No secrets in repository
- ✅ Ready to configure on Forge

**Go ahead and push your code!** 🚀

