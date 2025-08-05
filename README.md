# 🎓 Web School Profile

A modern and responsive admin dashboard for managing school announcements, reports, galleries, and more. Built with **React + Vite**, styled using **Tailwind CSS** and **DaisyUI**, and structured using **SOLID principles** for clean and maintainable code.

---

## ✨ Features

- 🔒 Authentication (mock API)
- 📢 Announcement CRUD (with semester filtering)
- 📄 Report management with PDF upload
- 📸 Gallery/documentation manager
- 🧭 Admin dashboard with sidebar & navbar
- 🌐 Responsive UI (mobile-first)
- 🔔 Toast notifications
- 🧱 Scalable architecture (SOLID-based API layer)

---

## 🛠️ Tech Stack

| Tech                | Description                               |
| :------------------ | :---------------------------------------- |
| **React 19**        | UI library                                |
| **Vite**            | Lightning-fast build tool                 |
| **Tailwind CSS 4**  | Utility-first CSS framework               |
| **DaisyUI**         | UI component library for Tailwind         |
| **Axios**           | HTTP client for API requests              |
| **React Router 7**  | Client-side routing                       |
| **SOLID Structure** | Modular API layer (`clients`, `services`) |

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js `v18+`
- NPM or Yarn

### 📄 Setup Environment Variables

Create a `.env` file in the root folder and set your base API URL:

```env
VITE_BASE_URL=https://your-api-url.com
```

### 📦 Install Dependencies

```
npm install
# or
yarn install
```

### 💻 Start Development Server

```diff
npm run dev
# or
yarn dev
```

### 📦 Build for Production

```
npm run build
# or
yarn build
```

### 📁 Project Structure

```
src/
│
├── api/
│   ├── clients/        # Axios base instance(s)
│   └── services/       # SOLID-based API service modules
│
├── components/         # Shared UI components
├── pages/              # Page-level components
├── layouts/            # Layouts (Admin, Visitor, etc.)
├── utils/              # Helper functions (e.g. dateFormatter)
└── main.jsx            # App entry point

```
