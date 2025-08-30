# Complete Render Deployment Guide

## Current Status

✅ **Frontend Deployed**: https://network-security-ids.onrender.com/  
❌ **Backend Issue**: https://network-security-analyzer-ids.onrender.com/ (Invalid host header)  
✅ **Code Configuration**: Both services properly configured  

## Fix "Invalid host header" Error

The backend is showing "Invalid host header" because it needs production environment variables.

### Step 1: Set Backend Environment Variables on Render

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Find your backend service: `network-security-analyzer-ids`
   - Click on the service name

2. **Navigate to Environment Tab**
   - Click "Environment" in the left sidebar
   - You'll see the environment variables section

3. **Add These Required Variables**

   Click "Add Environment Variable" for each:

   ```
   ENVIRONMENT=production
   FRONTEND_URL=https://network-security-ids.onrender.com
   PORT=8000
   HOST=0.0.0.0
   JWT_SECRET_KEY=your_secure_random_key_here_min_32_chars
   JWT_ALGORITHM=HS256
   JWT_EXPIRATION_HOURS=24
   ```

4. **Generate a Secure JWT Secret**
   
   Use this command to generate a secure key:
   ```bash
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```
   
   Or use this online generator: https://generate-secret.vercel.app/32

5. **Save and Deploy**
   - Click "Save Changes" after adding all variables
   - Go to "Manual Deploy" tab
   - Click "Deploy latest commit"
   - Wait for deployment to complete (2-3 minutes)

### Step 2: Verify Backend is Working

After deployment completes:

1. **Test Root Endpoint**
   - Visit: https://network-security-analyzer-ids.onrender.com/
   - Should show: `{"message": "Network Security Analyzer API", "status": "running", "version": "1.0.0"}`

2. **Test Health Endpoint**
   - Visit: https://network-security-analyzer-ids.onrender.com/health
   - Should show: `{"status": "healthy", "timestamp": "...", "uptime": "..."}`

3. **Test API Documentation**
   - Visit: https://network-security-analyzer-ids.onrender.com/docs
   - Should show interactive Swagger UI

### Step 3: Test Frontend-Backend Connection

1. **Visit Frontend**
   - Go to: https://network-security-ids.onrender.com/
   - Open browser developer tools (F12)
   - Check Console tab for any CORS errors

2. **Test API Calls**
   - Navigate through the frontend
   - Check Network tab in developer tools
   - API calls should succeed (status 200)

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|----------|
| `ENVIRONMENT` | Sets production mode | `production` |
| `FRONTEND_URL` | Allows CORS from frontend | `https://network-security-ids.onrender.com` |
| `PORT` | Server port (Render requirement) | `8000` |
| `HOST` | Server host (Render requirement) | `0.0.0.0` |
| `JWT_SECRET_KEY` | Secure token signing | `your_32_char_secret` |
| `JWT_ALGORITHM` | Token algorithm | `HS256` |
| `JWT_EXPIRATION_HOURS` | Token validity period | `24` |

## Optional Enhancement Variables

Add these for enhanced features:

```
ABUSEIPDB_API_KEY=your_abuseipdb_key
VIRUSTOTAL_API_KEY=your_virustotal_key
GEOLOCATION_API_KEY=your_geolocation_key
DATABASE_URL=your_database_connection_string
```

## Troubleshooting

### Still Getting "Invalid host header"?
1. Verify `ENVIRONMENT=production` is set exactly
2. Check that deployment completed successfully
3. Look at service logs in Render dashboard
4. Ensure no typos in environment variable names

### CORS Errors in Frontend?
1. Confirm `FRONTEND_URL` matches your frontend domain exactly
2. Verify backend has redeployed after adding variables
3. Check browser console for specific error messages

### Backend Not Responding?
1. Check Render service logs for errors
2. Verify all required environment variables are set
3. Ensure service is not sleeping (visit URL to wake it)

### Frontend Can't Connect?
1. Test backend endpoints directly in browser
2. Check frontend console for network errors
3. Verify API base URL in frontend configuration

## Service URLs Summary

- **Frontend**: https://network-security-ids.onrender.com/
- **Backend API**: https://network-security-analyzer-ids.onrender.com/
- **API Docs**: https://network-security-analyzer-ids.onrender.com/docs
- **Health Check**: https://network-security-analyzer-ids.onrender.com/health

## Next Steps After Fix

1. **Test All Features**: Navigate through frontend and test functionality
2. **Monitor Logs**: Check both services for any errors
3. **Add API Keys**: Configure external service integrations
4. **Set Up Monitoring**: Monitor uptime and performance
5. **Scale if Needed**: Upgrade plans based on usage

## Security Checklist

- ✅ Strong JWT secret key (32+ characters)
- ✅ HTTPS enabled on both services
- ✅ CORS properly configured
- ✅ Environment variables not in code
- ✅ Production environment set

## Support

If issues persist:
1. Check Render service logs first
2. Verify environment variables are saved
3. Ensure deployment completed without errors
4. Test individual components separately

---

**Important**: The "Invalid host header" error will be fixed once you set `ENVIRONMENT=production` on your Render backend service. This is the critical step to make everything work!