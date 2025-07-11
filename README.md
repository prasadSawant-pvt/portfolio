# Prasad Sawant Portfolio

A modern, high-performance portfolio website built with **Next.js 14**, React, Framer Motion, and Tailwind CSS.

---

## 🚀 Project Overview

This portfolio showcases Prasad Sawant (Backend Software Engineer) and features:
- **Fast loading, mobile-first design**
- **Dark/Light mode toggle** (with persistent preference)
- **Animated page transitions** using Framer Motion
- **Responsive layouts** for all devices
- **Contact form** (Formspree integration)
- **Downloadable Resume** (PDF)
- **Project filtering, skills, and more**

---

## ✨ Major Features & Improvements

- **Performance Optimized:**
  - Smooth, fast page transitions
  - Image lazy loading and hydration-safe rendering
- **Mobile Responsive:**
  - Tailwind CSS utility classes for all breakpoints
  - Touch-friendly navigation and buttons
- **Dark/Light Theme:**
  - Toggle at top left of header
  - Theme persists via localStorage
- **Clean, Maintainable Code:**
  - Friendly comments throughout
  - Unused code and imports removed
- **Contact & Social:**
  - LinkedIn connect, email, and Formspree contact
  - WhatsApp and phone removed for privacy
- **Resume Download:**
  - Button to download the latest PDF CV from `/public`

---

## 🛠️ Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/YOUR_USERNAME/prasad-sawant-portfolio.git
cd prasad-sawant-portfolio
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start the Development Server
```bash
npm run dev
# or
yarn dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🛡️ Security & Privacy Enhancements

- **Resume Download Rate Limiting:**
  - Edge middleware limits `/Resume.pdf` downloads to 3 per IP per day (prevents DoS/download abuse).
- **Contact Form Rate Limiting:**
  - API route `/api/contact` proxies to Formspree and restricts each IP to 3 submissions per month (protects Formspree quota & spam).
- **Secure HTTP Headers:**
  - Enforced via `next.config.js` (CSP, X-Frame-Options, HSTS, etc.).
- **Email Privacy:**
  - Email is hidden behind a reveal button (envelope icon). When clicked, shows email in a styled box with a copy button.
  - Prevents scraping and reduces spam risk.
- **No sensitive data in frontend.**

---

## ✨ Updated Features & Stack

- **Modern UI:** Social icons (LinkedIn, GitHub, Email) use `react-icons` for reliability and style.
- **Resume Download:** Button in header, protected by rate limit middleware.
- **Contact Form:**
  - Submits via `/api/contact` API route with per-IP limit.
  - Integrates with Formspree (set your form ID in code).
- **Email Reveal:**
  - Email is initially hidden; click the mail icon to reveal in a beautiful box with a copy-to-clipboard button and feedback.
- **Frameworks & Libraries:**
  - Next.js 14, React, Tailwind CSS, Framer Motion, react-icons

---

## 📁 Folder Structure

- `/pages` — Main site pages (Home, About, Skills, Experience, Portfolio, Contact, API routes)
- `/components` — Reusable UI components (Layout, Navbar, ThemeContext, etc.)
- `/public` — Static assets (profile photo, `Resume.pdf`, favicon)
- `/styles` — Tailwind and global CSS
- `/middleware.ts` — Edge middleware for rate limiting
- `/next.config.js` — Security headers

---

## 📦 Main Dependencies

- **next** — React framework for SSR and static sites
- **react** — UI library
- **tailwindcss** — Utility-first CSS framework
- **framer-motion** — Animations and transitions
- **react-icons** — Icon library (Font Awesome, etc.)

---

## 🔒 How Security Works

- **Resume Download:** Middleware limits downloads to 3 per IP per day. Returns 429 if exceeded.
- **Contact Form:** API route limits to 3 submissions per IP per month. Returns 429 if exceeded. Proxies to Formspree.
- **Email:** Not directly visible in markup; revealed on click, with copy button and feedback.
- **Headers:** CSP, X-Frame-Options, HSTS, and more set via Next.js config.

---

## 📝 To Update/Configure

- Set your Formspree form ID in `/pages/api/contact.ts`.
- Place your latest resume as `public/Resume.pdf`.
- Customize social/contact links in `/pages/index.tsx`.

---

## 🎨 Customization

- **Resume:** Replace `public/Prasad_Sawant_CV.pdf` with your latest resume.
- **Profile Photo:** Update `public/photo.jpg`.
- **Theme Colors:** Edit `tailwind.config.js` for accent colors.
- **Projects, Skills, Experience:** Edit the corresponding files in `/pages`.

---

## 🌐 Deployment

- Deploy easily to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) with zero-config for Next.js.
- Push your repo and connect to your deployment provider.

---

## 🙏 Credits & Acknowledgements

- Built with [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- Icons: [Font Awesome](https://fontawesome.com/)
- Contact form: [Formspree](https://formspree.io/)

---

**Feel free to fork, customize, and share!**
