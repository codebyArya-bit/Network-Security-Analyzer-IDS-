# Frontend-Backend Connection Setup Guide

## Overview

Your Network Security Analyzer now has both frontend and backend deployed:
- **Frontend**: https://network-security-ids.onrender.com/
- **Backend**: https://network-security-analyzer-ids.onrender.com/

## Current Status

✅ **Frontend Configuration**: Updated to connect to deployed backend  
✅ **Backend Configuration**: Updated to allow deployed frontend  
✅ **Local Development**: Frontend configured to use deployed backend  

## Required Render Environment Variables

To complete the connection, you need to set these environment variables on your **backend** Render service:

### 1. Core Configuration
```
ENVIRONMENT=production
FRONTEND_URL=https://network-security-ids.onrender.com
PORT=8000
HOST=0.0.0.0
```

### 2. Security Configuration
```
JWT_SECRET_KEY=your_secure_random_key_here
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24
```

### 3. Optional API Keys (for enhanced features)
```
ABUSEIPDB_API_KEY=your_abuseipdb_key
VIRUSTOTAL_API_KEY=your_virustotal_key
GEOLOCATION_API_KEY=your_geolocation_key
```

## How to Set Environment Variables on Render

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Select your backend service

2. **Navigate to Environment Tab**
   - Click on "Environment" in the left sidebar

3. **Add Variables**
   - Click "Add Environment Variable"
   - Enter each variable name and value
   - Click "Save Changes"

4. **Redeploy Service**
   - Go to "Manual Deploy" section
   - Click "Deploy latest commit"
   - Wait for deployment to complete

## Testing the Connection

### 1. Backend Health Check
Visit: https://network-security-analyzer-ids.onrender.com/

Expected response:
```json
{
  "message": "Network Security Analyzer API",
  "status": "running",
  "version": "1.0.0"
}
```

### 2. API Documentation
Visit: https://network-security-analyzer-ids.onrender.com/docs

This should show the interactive Swagger UI with all available endpoints.

### 3. Frontend Connection
Visit: https://network-security-ids.onrender.com/

The frontend should now be able to:
- Load without CORS errors
- Connect to the backend API
- Display real-time data (when implemented)

## API Endpoints Available

- **Root**: `GET /` - API status
- **Health**: `GET /health` - Health check
- **Threat Intelligence**: `GET /api/v1/threat-intelligence/` - Threat data
- **Network Scan**: `GET /api/v1/network-scan/` - Network scanning
- **WebSocket**: `WS /ws` - Real-time updates

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` is set correctly on backend
- Verify `ENVIRONMENT=production` is set
- Check that both services have redeployed

### "Invalid host header" Error
- Confirm `ENVIRONMENT=production` is set
- Verify the backend service has redeployed after adding environment variables

### API Connection Issues
- Check backend logs in Render dashboard
- Verify all required environment variables are set
- Test backend endpoints directly

### Frontend Not Loading
- Check browser console for errors
- Verify frontend build completed successfully
- Test backend connectivity

## Security Notes

- Use a strong, unique `JWT_SECRET_KEY`
- Never commit `.env` files to version control
- Regularly rotate API keys
- Monitor service logs for security issues

## Next Steps

1. **Set Environment Variables**: Follow the steps above
2. **Test Connection**: Verify both services work together
3. **Monitor Logs**: Check for any errors or issues
4. **Add Features**: Implement additional security analysis features
5. **Scale**: Monitor usage and scale services as needed

## Support

If you encounter issues:
1. Check the Render service logs
2. Verify all environment variables are set correctly
3. Ensure both services have redeployed after configuration changes
4. Test individual components (frontend, backend) separately