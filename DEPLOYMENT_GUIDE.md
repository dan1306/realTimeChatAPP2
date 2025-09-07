# Deployment Guide: Socket.io Server on Render + Next.js on Vercel

## Step 1: Deploy Socket.io Server on Render

### 1.1 Prepare Your Repository
1. Push your code to GitHub (if not already done)
2. Make sure `server.js` is in the root directory
3. Ensure `package.json` has the correct start script: `"start": "node server.js"`

### 1.2 Deploy on Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `realtime-chat-socket-server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid if you prefer)

### 1.3 Set Environment Variables in Render
In your Render dashboard, go to Environment tab and add:
```
NODE_ENV=production
HOSTNAME=0.0.0.0
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### 1.4 Deploy
Click "Deploy Web Service" and wait for deployment to complete.

## Step 2: Update Frontend for Production

### 2.1 Update Socket Connection
The frontend is already updated to use environment variables:
```typescript
export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000");
```

### 2.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and import your project
2. In Vercel dashboard, go to your project settings
3. Add environment variable:
   - **Name**: `NEXT_PUBLIC_SOCKET_URL`
   - **Value**: `https://your-render-app.onrender.com` (replace with your actual Render URL)

### 2.3 Redeploy
After adding the environment variable, redeploy your Vercel app.

## Step 3: Update CORS Configuration

### 3.1 Update server.js CORS
Replace `https://your-vercel-app.vercel.app` in `server.js` with your actual Vercel URL:
```javascript
origin: process.env.NODE_ENV === "production" 
  ? [process.env.FRONTEND_URL, "https://your-actual-vercel-url.vercel.app"] 
  : "http://localhost:3000",
```

### 3.2 Update Render Environment
In Render dashboard, update the `FRONTEND_URL` environment variable with your actual Vercel URL.

## Step 4: Test the Connection

1. Open your Vercel app in browser
2. Open browser developer tools → Network tab
3. Look for WebSocket connections to your Render server
4. Test sending messages between users

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Make sure both URLs are correctly set in environment variables
2. **Connection Failed**: Check that your Render service is running and accessible
3. **Messages Not Sending**: Verify socket events are properly configured

### Debug Steps:
1. Check Render logs for any errors
2. Verify environment variables are set correctly
3. Test socket connection in browser console:
   ```javascript
   const socket = io('https://your-render-app.onrender.com');
   socket.on('connect', () => console.log('Connected!'));
   ```

## Environment Variables Summary

### Render (Socket.io Server):
- `NODE_ENV=production`
- `HOSTNAME=0.0.0.0`
- `FRONTEND_URL=https://your-vercel-app.vercel.app`

### Vercel (Next.js Frontend):
- `NEXT_PUBLIC_SOCKET_URL=https://your-render-app.onrender.com`
