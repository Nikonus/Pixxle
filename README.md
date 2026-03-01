# Pixxle – AI Photo Editor SaaS

Full Stack AI Photo Editor built with **Next.js 14**, **Fabric.js**, **ImageKit AI**, **Convex DB**, and **Clerk Authentication**.

Production-ready SaaS with real-time canvas editing, AI-powered transformations, and subscription-based monetization.

---

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Convex](https://img.shields.io/badge/Database-Convex-orange)
![Clerk](https://img.shields.io/badge/Auth-Clerk-purple)
![ImageKit](https://img.shields.io/badge/AI-ImageKit-green)
![Deployment](https://img.shields.io/badge/Deployed-Vercel-black)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

⭐ Star this repository — your support motivates development!

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [SaaS Capabilities](#saas-capabilities)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Roadmap](#roadmap)
- [License](#license)
- [Author](#author)

---

## About

Pixxle is a modern AI-powered Photo Editor SaaS platform designed with scalability, maintainability, and production deployment in mind.

It demonstrates:

- Real-time state synchronization
- AI feature integration
- Subscription-based feature gating
- Secure authentication
- Modular frontend architecture
- Production-ready App Router setup

---

## Features

### Core Editing Tools

- Crop & Resize – Precise canvas editing
- Brightness, Contrast, Saturation adjustments
- Text overlays
- Undo / Redo history
- Autosave with real-time sync

### AI-Powered Features (Pro Plan)

- Background Removal (ImageKit AI)
- AI Image Extension
- AI Retouch & Upscale
- Background Search (Unsplash API)

---

## SaaS Capabilities

- Free Plan – 3 projects limit
- Pro Plan – $12/month unlimited usage
- Clerk JWT-based authentication
- Feature access control based on subscription
- Real-time database sync using Convex
- Protected routes
- Project CRUD operations

---

## Architecture

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Server & Client Components
- Tailwind CSS
- Shadcn UI

### Canvas Engine
- Fabric.js
- Stateful object editing
- Undo/Redo stack management

### Backend
- Convex Realtime Database
- Server functions for project management

### AI Processing
- ImageKit transformation APIs
- Secure server-side key usage

### Authentication & Billing
- Clerk Authentication
- Subscription gating logic

---

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI
- Lucide Icons

### Backend
- Convex (Realtime DB)

### Auth
- Clerk

### AI / Media
- ImageKit AI
- Unsplash API

### Deployment
- Vercel
- Node.js 18+

---

## Project Structure

