# Environment Variables Setup Guide

This guide explains how to configure environment variables for the SecureNet Analyzer application.

## Quick Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file** with your actual values (see sections below)

3. **Restart the development server** after making changes:
   ```bash
   npm run dev
   ```

## Required Environment Variables

### 🔑 External API Keys

#### AbuseIPDB API Key (Recommended)
- **Variable:** `VITE_ABUSEIPDB_API_KEY`
- **Purpose:** Provides real threat intelligence data for IP reputation checking
- **How to get:** 
  1. Visit [AbuseIPDB](https://www.abuseipdb.com/api)
  2. Create a free account
  3. Generate an API key
  4. Add it to your `.env` file
- **Impact if missing:** The app will use mock data instead of real threat intelligence

### 🌐 API Configuration

#### Backend API URL
- **Variable:** `VITE_API_BASE_URL`
- **Default:** `http://localhost:8000/api/v1`
- **Purpose:** Points to your FastAPI backend (when implemented)
- **Current Status:** Using mock data, will be needed when backend is ready

### 🔒 Security Settings

#### JWT Secret
- **Variable:** `VITE_JWT_SECRET`
- **Purpose:** Used for authentication token signing
- **Recommendation:** Use a strong, random string in production

#### Session Timeout
- **Variable:** `VITE_SESSION_TIMEOUT`
- **Default:** `60` (minutes)
- **Purpose:** How long user sessions last

## Optional Environment Variables

### 📧 Email Configuration (For Alerts)
```env
VITE_SMTP_HOST=smtp.gmail.com
VITE_SMTP_PORT=587
VITE_SMTP_USER=your_email@gmail.com
VITE_SMTP_PASS=your_app_password
```

### 📊 Analytics & Monitoring
```env
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

### 🎛️ Feature Flags
```env
VITE_ENABLE_REALTIME=true
VITE_ENABLE_AI_FEATURES=true
VITE_ENABLE_THREAT_INTEL=true
```

## Development vs Production

### Development Setup
The included `.env` file has safe defaults for development:
- Mock API keys that won't make real API calls
- Debug mode enabled
- Local development URLs

### Production Setup
For production deployment:
1. Use real API keys
2. Set `VITE_DEBUG=false`
3. Use production URLs
4. Use strong JWT secrets
5. Configure real SMTP settings

## Security Best Practices

1. **Never commit `.env` files** - They're already in `.gitignore`
2. **Use different values** for development and production
3. **Rotate API keys** regularly
4. **Use strong JWT secrets** (at least 32 characters)
5. **Limit API key permissions** when possible

## Troubleshooting

### Environment Variables Not Loading
- Ensure your `.env` file is in the project root
- Restart the development server after changes
- Check that variable names start with `VITE_`

### API Key Issues
- Verify your AbuseIPDB API key is valid
- Check API rate limits
- Ensure the key has proper permissions

### CORS Issues
- Update `VITE_API_BASE_URL` to match your backend
- Ensure your backend allows the frontend origin

## Current Application Status

✅ **Working without environment variables:**
- The app uses mock data and will run fine with default settings
- All core features work in demo mode

🔧 **Enhanced with environment variables:**
- Real threat intelligence data
- Proper API configuration for future backend integration
- Email alerts and notifications
- Analytics and monitoring

## Need Help?

If you encounter issues:
1. Check the console for error messages
2. Verify your `.env` file syntax
3. Ensure all required variables are set
4. Restart the development server

The application is designed to work gracefully even if some environment variables are missing, falling back to mock data and default configurations.