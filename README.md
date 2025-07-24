# AI-Powered Knowledgebase – Build & Search

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)

## 📌 Overview

A full-stack application where users can upload articles or documentation content, and later search or summarize content using AI. The app is well-structured, modular, and built with production readiness in mind.

## 🌍 Live URLs

- **Frontend**: [https://aisummarizationapp.vercel.app/](https://aisummarizationapp.vercel.app/)
- **Backend API**: [https://aisummarizationappbackend.vercel.app/api](https://aisummarizationappbackend.vercel.app/api)

## 📂 Repository Links

- **Frontend**: [AI-Summarization-Frontend](https://github.com/Farsit-007/AI-Summarization-Frontend)
- **Backend**: [AI-Summarization-Backend](https://github.com/Farsit-007/AI-Summarization-Backend)

## 🛠️ Features

- **User Authentication**: JWT-based secure login/registration system
- **Article Management**: Create, view, edit, and delete personal articles
- **Smart Search**: Advanced filtering by keywords, tags, and content
- **AI Summarization**: Generate intelligent summaries using Cohere/OpenAI
- **Tag System**: Organize articles with customizable tags
- **Responsive Design**: Mobile-first UI built with Tailwind CSS
- **Real-time Updates**: Dynamic content management
- **Error Handling**: Graceful error states and user feedback

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **State Management**: React Context + Custom Hooks
- **HTTP Client**: Native Fetch API

### Backend  
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **AI Integration**: Cohere API 
- **Validation**: Zod
- **Environment**: Node.js

### DevOps & Deployment
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Vercel
- **Database**: PostgreSQL (Render/Railway)
- **CI/CD**: GitHub Actions
- **Version Control**: Git

---

## 🏃‍♂️ Frontend Setup Guide

### Prerequisites
- Node.js ≥18.x
- npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Farsit-007/AI-Summarization-Frontend.git
   cd AI-Summarization-Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Configuration**:
   Create a `.env.local` file in the root directory:
   ```bash
   # API Configuration
   NEXT_PUBLIC_API_URL="http://localhost:5000/api"
   # For production: https://aisummarizationappbackend.vercel.app/api
   
   
   # Environment
   NODE_ENV="development"
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

---

## 🏃‍♂️ Backend Setup Guide

### Prerequisites
- Node.js ≥18.x
- PostgreSQL database
- npm/yarn/pnpm
- Cohere API key

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Farsit-007/AI-Summarization-Backend.git
   cd AI-Summarization-Backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory:
   ```bash
   # Server Configuration
   NODE_ENV="development"
   PORT=5000
   
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/knowledgebase"
   # For production: use your hosted PostgreSQL URL
   
   # JWT Configuration
   JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
   JWT_EXPIRATION="7d"
   JWT_REFRESH="your-refresh-token-secret-key"
   JWT_REFRESH_EXPIRATION="30d"
   
   # Password Security
   BCRYPT_SALT_ROUNDS=12
   
   # AI API Configuration (choose one)
   COHERE_API_KEY="your-cohere-api-key"
   
   # CORS Configuration
   FRONTEND_URL="http://localhost:3000"
   # For production: https://aisummarizationapp.vercel.app
   ```

4. **Database Setup**:
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   
   # (Optional) Seed database with sample data
   npm run seed
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **API will be available** at [https://aisummarizationappbackend.vercel.app/api](https://aisummarizationappbackend.vercel.app/api)

### Production Build

```bash
npm run build
npm run start
```

---





## 🧪 Testing

### Frontend Testing
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Backend Testing
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Set Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://aisummarizationappbackend.vercel.app/api
   ```
4. **Deploy automatically on push**

### Backend Deployment (Vercel)

1. **Add `vercel.json`**:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "./dist/index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "./dist/index.js"
       }
     ]
   }
   ```

2. **Set Environment Variables** in Vercel dashboard
3. **Deploy automatically**

### Database Deployment (Render/Railway)

1. **Create PostgreSQL database**
2. **Copy connection string**
3. **Update `DATABASE_URL` in environment variables**
4. **Run migrations**: `npx prisma db push`

---



## 🔒 Security Features

- **Authentication**: JWT with secure token storage
- **Password Security**: bcrypt hashing with salt rounds
- **Input Validation**: Zod schemas for all inputs
- **SQL Injection Prevention**: Prisma ORM protection
- **CORS Configuration**: Restricted origins
- **Rate Limiting**: API request limits

---



## 📝 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run type-check   # TypeScript type checking
```

### Backend
```bash
npm run dev          # Start development server with nodemon
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
```

---

## 🐛 Known Issues

- Search functionality may be slow with large datasets (optimization in progress)
- AI summarization has rate limits (consider implementing queuing system)

---





## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**MIT License** - Do whatever you want to do 😊

---



**Built with ❤️ by [Farsit-007](https://github.com/Farsit-007)**

*Last updated: July 2025*