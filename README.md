# EventPro — Next.js Website

Premium event management website for Davao City, built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Ready to deploy on Vercel.

---

## 🗂 Project Structure

```
eventpro/
├── app/
│   ├── api/
│   │   ├── booking/route.ts     ← Booking form API
│   │   ├── quote/route.ts       ← Custom quote API
│   │   └── newsletter/route.ts  ← Newsletter subscribe API
│   ├── components/
│   │   ├── hooks/
│   │   │   └── useScrollReveal.ts
│   │   ├── Nav.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Gallery.tsx
│   │   ├── Packages.tsx
│   │   ├── Footer.tsx
│   │   ├── Modals.tsx
│   │   └── Toasts.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Quick Start (Local)

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm start
```

---

## 🌐 Deploy to Vercel (Step by Step)

### Step 1 — Push to GitHub
1. Create a new repo on [github.com](https://github.com)
2. In your project folder, run:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/eventpro.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `eventpro` repository
4. Keep all settings as default (Vercel auto-detects Next.js)
5. Click **"Deploy"**
6. ✅ Your site is live in ~60 seconds!

### Step 3 — Get a custom domain (optional)
In your Vercel project → **Settings → Domains** → add your domain.

---

## ⚙️ Tech Stack

| Technology   | Purpose                        |
|-------------|-------------------------------|
| Next.js 14  | React framework (App Router)   |
| TypeScript  | Type safety                    |
| Tailwind CSS| Styling                        |
| Lucide React| Icons                          |
| Vercel      | Hosting & serverless functions |

---

## 📧 Connecting Real Email (Optional)

The API routes in `app/api/` log form submissions to the console. To send real emails, install [Resend](https://resend.com) (free 100 emails/day):

```bash
npm install resend
```

Add to `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxx
```

Then update `app/api/booking/route.ts`:
```ts
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'bookings@eventpro.ph',
  to:   'hello@eventpro.ph',
  subject: `New Booking — ${name}`,
  html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p>...`,
})
```

---

## 📝 Customizing Content

All content (package names, prices, contact info) is defined in:
- `app/components/Packages.tsx` — packages array
- `app/components/Footer.tsx`   — contact details, social links
- `app/components/Hero.tsx`     — brand name, subtitle
- `app/layout.tsx`              — page title and SEO metadata
