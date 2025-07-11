# 🚀 Prasad Sawant Portfolio

> A modern, high-performance developer portfolio built with **Next.js 14**, React, Tailwind CSS, and Framer Motion.

🌐 **Live Website:**  
🔗 [https://prasad-sawant-portfolio.vercel.app](https://prasad-sawant-portfolio.vercel.app)

---

## 🖼️ Preview

> Insert a screenshot of the homepage here:

![Portfolio Screenshot](./public/screenshot.png)

_(Replace `screenshot.png` with your actual homepage screenshot in `/public` folder)_

---

## 🔍 Project Overview

This portfolio showcases **Prasad Sawant**, a Backend Software Engineer, and highlights:

- ✨ Fast, mobile-first modern design
- 🌘 Dark/Light theme toggle
- 🎬 Smooth animations via Framer Motion
- 📱 Fully responsive for all devices
- 📄 Downloadable resume (PDF)
- 📬 Contact form (Formspree)
- 🧩 Projects with filters, skill sections, and more

---

## ✨ Major Features

- **⚡ Performance Optimized:**
  - Lazy image loading
  - Hydration-safe rendering
  - Clean layout & optimized builds
- **📱 Responsive Design:**
  - Tailwind CSS mobile-first utility classes
  - Touch-friendly UX
- **🌓 Dark/Light Mode:**
  - Theme toggle persists via `localStorage`
- **🧼 Clean Codebase:**
  - Comments, logical file structure, no unused code
- **🔗 Contact Options:**
  - LinkedIn, Email (reveal + copy), and Formspree
- **📄 Resume Download:**
  - Resume file stored in `/public`, downloadable with rate-limiting

---

## 🛡️ Security & Privacy Enhancements

- **🔐 Rate Limiting Middleware:**
  - `/Resume.pdf` → max 3 downloads per IP per day
  - `/api/contact` → 3 submissions per IP/month
- **🕵️‍♂️ Email Privacy:**
  - Hidden behind a reveal + copy-to-clipboard button
- **🛡️ Secure Headers:**
  - Added via `next.config.js` (CSP, HSTS, etc.)

---

## 🛠️ Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/YOUR_USERNAME/prasad-sawant-portfolio.git
cd prasad-sawant-portfolio
