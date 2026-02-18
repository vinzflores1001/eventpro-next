

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
## ⚙️ Tech Stack

| Technology   | Purpose                        |
|-------------|-------------------------------|
| Next.js 14  | React framework (App Router)   |
| TypeScript  | Type safety                    |
| Tailwind CSS| Styling                        |
| Lucide React| Icons                          |
| Vercel      | Hosting & serverless functions |
