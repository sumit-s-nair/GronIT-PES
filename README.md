
# 🌐 GronIT-PES Website

[![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-000?logo=vercel)](https://gronit-pes.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Built%20with-Next.js%2C%20Firebase%2C%20MongoDB%2C%20TailwindCSS-0a0a0a)](#-tech-stack)

> The official website for **Gronit-PES**, a tech-driven community.  
> Discover events, explore blogs, meet our team, and manage content with our admin dashboard.

---


## Features

Event management with registration windows, participant limits, and smart registration status.
Member list with social media links so you can see who's on the team.
Blog section for writeups and tech insights, with fast image delivery.
Admin panel for managing events, blogs, and members (only for authorized users).
Authentication is handled by Firebase, so only admins get access to the dashboard.
Images are stored and delivered via Cloudinary for speed.
All data is stored in a scalable PostgreSQL database using Prisma ORM.

---

## Live Site

[https://gronit-pes.vercel.app](https://gronit-pes.vercel.app)

---

## 🛠 Tech Stack

| Tech       | Purpose                        |
|------------|--------------------------------|
| **Next.js** | Framework for building fast and SEO-friendly React apps |
| **Firebase Auth** | User authentication and admin protection |
| **PostgreSQL** | Primary database powered by Neon for scalable data storage |
| **Prisma** | Modern database ORM for type-safe database access |
| **Cloudinary** | Cloud-based image storage and optimization |
| **TailwindCSS** | Modern and flexible utility-first styling |
| **Vercel** | Deployment and hosting |

---

## 📦 Local Setup

> To run this project locally, follow the steps below.

### 1. Clone the Repository

```bash
git clone https://github.com/sumit-s-nair/gronit-pes.git
cd gronit-pes
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# MongoDB
MONGODB_URI=your_mongo_connection_string

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Postgres
DATABASE_URL=your_postgres_connection_string
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Admin Access

Admin routes are protected via Firebase Authentication. Only authorized users can access:

- `/admin` – Admin dashboard for managing content

---

## Scripts

- `npm run dev` – Run the app in development mode
- `npm run build` – Build for production
- `npm run start` – Start the production server

---
