# Render Environment Setup Guide

## Fix "Invalid host header" Error

The "Invalid host header" error occurs because the backend needs to be configured for production environment. Follow these steps:

### 1. Set Environment Variables on Render

Go to your Render service dashboard and add these environment variables:

#### Required Environment Variables:
```
ENVIRONMENT=production
FRONTEND_URL=https://network-security-analyzer-ids.onrender.com
PORT=8000
HOST=0.0.0.0
```

#### Security Configuration:
```
JWT_SECRET_KEY=your_secure_random_key_here
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24
```

#### API Keys (Optional - for threat intelligence features):
```
ABUSEIPDB_API_KEY=your_abuseipdb_key
VIRUSTOTAL_API_KEY=your_virustotal_key
GEOLOCATION_API_KEY=your_geolocation_key
```

#### Database (Optional):
```
DATABASE_URL=your_database_connection_string
```

### 2. How to Add Environment Variables on Render:

1. Go to your Render dashboard
2. Select your backend service
3. Click on "Environment" tab
4. Click "Add Environment Variable"
5. Add each variable name and value
6. Click "Save Changes"

### 3. Redeploy the Service

After adding the environment variables:
1. Go to the "Manual Deploy" section
2. Click "Deploy latest commit"
3. Wait for the deployment to complete

### 4. Verify the Fix

Once deployed, visit your backend URL:
- **Backend URL**: https://network-security-analyzer-ids.onrender.com
- You should see: `{"message": "Network Security Analyzer API", "status": "running", "version": "1.0.0"}`

### 5. Test API Endpoints

- **Health Check**: `GET /health`
- **API Documentation**: `GET /docs` (Swagger UI)
- **Threat Intelligence**: `GET /api/v1/threat-intelligence/`
- **Network Scan**: `GET /api/v1/network-scan/`

## Troubleshooting

### Still Getting "Invalid host header"?
1. Ensure `ENVIRONMENT=production` is set
2. Verify the service has redeployed after adding environment variables
3. Check the logs for any configuration errors

### CORS Issues?
1. Make sure `FRONTEND_URL` matches your actual frontend domain
2. If testing locally, temporarily add your local URL to CORS origins

### API Not Working?
1. Check that all required environment variables are set
2. Verify API keys are valid (if using threat intelligence features)
3. Check the service logs for detailed error messages

## Security Notes

- Never commit `.env` files to version control
- Use strong, unique values for `JWT_SECRET_KEY`
- Regularly rotate API keys
- Monitor service logs for security issues

## Next Steps

Once the backend is working:
1. Deploy your frontend to Render or another hosting service
2. Update the frontend API configuration to use the backend URL
3. Test the full application functionality