# Render Runtime Configuration Fix

## Problem Identified

The deployment was failing because:
- Render detected `bun.lockb` in the root directory
- Render automatically chose **Bun runtime** for the entire project
- But the backend is a **Python FastAPI** application that needs `uvicorn`
- This caused the error: `uvicorn: command not found`

## Solution Implemented

### 1. Created `render.yaml` Configuration

Added explicit service definitions to force correct runtimes:

```yaml
services:
  # Backend API Service (Python)
  - type: web
    name: network-security-analyzer-backend
    runtime: python  # ← Explicitly set Python runtime
    buildCommand: pip install -r backend/requirements.txt
    startCommand: cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
    
  # Frontend Static Site (Node.js/Bun)
  - type: static
    name: network-security-analyzer-frontend
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
```

### 2. Added Backend Build Script

Created `backend/build.sh` for reliable Python dependency installation.

## Deployment Instructions

### Option A: Using render.yaml (Recommended)

1. **Commit the new files:**
   ```bash
   git add render.yaml backend/build.sh RENDER_RUNTIME_FIX.md
   git commit -m "Fix Render runtime configuration"
   git push origin main
   ```

2. **Deploy via Render Dashboard:**
   - Go to Render Dashboard
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`
   - Both services will deploy with correct runtimes

### Option B: Manual Service Creation

1. **Create Backend Service:**
   - Runtime: **Python**
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Root Directory: `.` (project root)

2. **Create Frontend Service:**
   - Type: **Static Site**
   - Build Command: `npm install && npm run build`
   - Publish Directory: `./dist`

## Environment Variables

Set these in Render Dashboard for the backend service:

```env
ENVIRONMENT=production
HOST=0.0.0.0
FRONTEND_URL=https://network-security-ids.onrender.com
JWT_SECRET_KEY=ns_analyzer_2024_secure_jwt_key_production_render_deployment_v1
LOG_LEVEL=WARNING
DEBUG=false
RELOAD=false
```

## Verification

After deployment:
1. Backend should show: `Application startup complete`
2. Frontend should build successfully
3. API endpoints should be accessible
4. No more "uvicorn: command not found" errors

## Key Points

- ✅ **render.yaml** overrides automatic runtime detection
- ✅ **Explicit Python runtime** for backend service
- ✅ **Proper build commands** for each service
- ✅ **Environment variables** configured correctly
- ✅ **No more Bun/Python runtime conflicts**

This configuration ensures each service uses the appropriate runtime and build process! 🚀