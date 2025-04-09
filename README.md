
# 🌐 GronIT-PES Website

[![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-000?logo=vercel)](https://gronit-pes.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Built%20with-Next.js%2C%20Firebase%2C%20MongoDB%2C%20TailwindCSS-0a0a0a)](#-tech-stack)

> The official website for **Gronit-PES**, a tech-driven community.  
> Discover events, explore blogs, meet our team, and manage content with our admin dashboard.

---

## ✨ Features

- 🗓️ **Event Showcase** – Discover and explore upcoming tech events.
- 🧑‍💼 **Member List** – Meet the talented minds behind Gronit.
- 📰 **Blog Section** – Dive into writeups and tech insights.
- 🛠️ **Admin Panel** – Seamlessly manage events, blogs, and members (auth-protected).
- 🔐 **Authentication** – Firebase-based secure access for admins.

---

## 🚀 Live Site

👉 [https://gronit-pes.vercel.app](https://gronit-pes.vercel.app)

---

## 🛠 Tech Stack

| Tech       | Purpose                        |
|------------|--------------------------------|
| **Next.js** | Framework for building fast and SEO-friendly React apps |
| **Firebase Auth** | User authentication and admin protection |
| **MongoDB** | Database to store events, blogs, and members |
| **TailwindCSS** | Modern and flexible utility-first styling |
| **Vercel** | Deployment and hosting |

---

## 📦 Local Setup

> To run this project locally, follow the steps below.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/gronit-pes.git
cd gronit-pes
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

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
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔐 Admin Access

Admin routes are protected via Firebase Authentication. Only authorized users can access:

- `/admin` – Admin dashboard for managing content

---

## 🧪 Scripts

- `npm run dev` – Run the app in development mode
- `npm run build` – Build for production
- `npm run start` – Start the production server

---

## 🧑‍💻 Contributing

We welcome contributions! Feel free to fork the repo and submit pull requests.  
Make sure to follow the existing code style and commit guidelines.

---
