# 🚀 Deployment Guide for CSE Quiz Website

This project is now ready to be deployed to the internet. Follow these steps to get your website live:

## 1. Prepare your MongoDB Atlas
You already have a `MONGO_URI` in your `.env` file. To ensure it works in production:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Go to **Network Access**.
3. Click **Add IP Address**.
4. Choose **Allow Access from Anywhere** (0.0.0.0/0) and click **Confirm**. (This allows your cloud server to connect).

## 2. Deploy the Backend (Recommended: Render)
Render is a great platform for deploying Node.js apps.
1. Create a free account on [Render.com](https://render.com).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository (or upload your code).
4. Set the following configurations:
   - **Environment**: `Node`
   - **Build Command**: `npm install` (Run this inside the `server` directory)
   - **Start Command**: `node server.js`
   - **Root Directory**: `server`
5. Click **Advanced** and add **Environment Variables**:
   - `MONGO_URI`: (Copy-paste your connection string from `.env`)
   - `PORT`: `5000` (Render will override this, but it's good to have)
6. Click **Create Web Service**.

## 3. How it Works
- The Backend Express server serves the static frontend from the `/public` folder.
- `BACKEND_URL` is set to `window.location.origin` in your JavaScript, so it automatically knows where to find the API, whether you are running locally or on the internet.
- The `health` route has been added to ensure the platform knows your server is running.

## 4. Local Testing
To test everything is still working locally:
1. Open a terminal in the `server` folder.
2. Run `npm install` (if you haven't already).
3. Run `npm start`.
4. Open `http://localhost:5000` in your browser.

Your app is now production-ready! 🌐
