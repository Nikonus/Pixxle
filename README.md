 🚀 Pixxle – Full Stack AI Photo Editor SaaS

A production-ready AI-powered Photo Editor SaaS built with Next.js 14, Fabric.js, ImageKit AI, Convex, and Clerk Authentication.

Pixxle combines real-time canvas editing with AI-powered transformations and subscription-based access control — built using modern full-stack architecture.

🚀 Features
🎨 Core Editing Tools

✂️ Crop & Resize – Precision canvas manipulation

🎚️ Adjustments – Brightness, contrast, saturation controls

📝 Text Tool – Customizable text overlays

🔄 Undo/Redo – Complete edit history tracking

⚡ Autosave – Real-time canvas state synchronization

🤖 AI-Powered Features (Pro Plan)

🧹 Background Removal – AI-powered instant background removal

🎨 Background Search – Unsplash image integration

📐 AI Image Extension – Intelligent canvas extension

✨ AI Retouch & Upscale – ImageKit AI transformations


💼 SaaS & Production Features

💳 Subscription System

Free Plan – 3 Projects Limit

Pro Plan – $12/month Unlimited Access

🛡️ Authentication & Authorization

Clerk JWT-based auth

Route protection

Usage limits enforcement

📊 Project Dashboard

Create, Read, Update, Delete projects

Real-time sync using Convex

📱 Responsive UI

Desktop-optimized editor experience


🛠️ Tech Stack
Frontend

Next.js 14 (App Router)

TypeScript

Tailwind CSS

Shadcn UI

Lucide Icons

Canvas Engine

Fabric.js

Backend / Database

Convex (Realtime DB + Server Functions)

Authentication & Billing

Clerk (JWT + Subscription Handling)

AI & Image Processing

ImageKit AI

Unsplash API

Storage & CDN

ImageKit CDN

Deployment

Vercel

Node.js 18+

📂 Project Structure

app
 ┣ (auth)
 ┃ ┣ sign-in
 ┃ ┣ sign-up
 ┃ ┗ layout.js
 ┣ (main)
 ┃ ┣ dashboard
 ┃ ┃ ┣ _components
 ┃ ┃ ┃ ┣ _tools
 ┃ ┃ ┃ ┣ canvas.jsx
 ┃ ┃ ┃ ┣ editor-sidebar.jsx
 ┃ ┃ ┃ ┣ editor-topbar.jsx
 ┃ ┃ ┃ ┗ project-grid.jsx
 ┃ ┗ editor/[projectId]
 ┣ api/imagekit/upload
 ┣ context/editor-context.jsx
 ┣ pricing
 ┣ ConvexClientProvider.jsx
 ┗ layout.js
# Convex
CONVEX_DEPLOYMENT=your-deployment
NEXT_PUBLIC_CONVEX_URL=your-url
NEXT_PUBLIC_CONVEX_SITE_URL=your-site-url

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-key
CLERK_SECRET_KEY=your-secret
CLERK_JWT_ISSUER_DOMAIN=your-domain

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your-public-key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your-endpoint
IMAGEKIT_PRIVATE_KEY=your-private-key
