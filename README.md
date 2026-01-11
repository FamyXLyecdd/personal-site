# Premium Portfolio Website

🚀 A butter-smooth, 120fps portfolio website built with Next.js 14, featuring 3D interactions, glassmorphism, and premium animations.

![Portfolio Preview](/public/og-image.png)

## ✨ Features

- **120fps Smooth Animations** - GPU-accelerated animations with Framer Motion
- **Interactive 3D Elements** - React Three Fiber with Rapier physics
- **Glassmorphism UI** - Modern glass-effect design
- **Custom Cursor** - Lerp-based smooth cursor with magnetic effects  
- **Butter-Smooth Scrolling** - Lenis smooth scroll integration
- **Bento Grid Layout** - Unique asymmetric card layout
- **Horizontal Projects Scroll** - Touch-friendly project showcase
- **3D Skills Globe** - Interactive network visualization
- **Contact Form** - With validation and confetti celebration
- **Fully Responsive** - Mobile-first design, works on all devices
- **Accessible** - WCAG compliant, keyboard navigable

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + GSAP
- **3D**: Three.js + React Three Fiber + Rapier
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React
- **Font**: Inter (Variable)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with providers
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles
├── components/
│   ├── ui/             # UI primitives
│   │   ├── button.tsx
│   │   ├── glass-card.tsx
│   │   ├── input.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   ├── 3d/             # Three.js components
│   │   ├── rubber-ball.tsx
│   │   ├── floating-scene.tsx
│   │   └── skills-globe.tsx
│   ├── sections/       # Page sections
│   │   ├── hero.tsx
│   │   ├── bento-grid.tsx
│   │   ├── projects-showcase.tsx
│   │   └── ...
│   └── providers/      # Context providers
│       └── smooth-scroll.tsx
├── lib/
│   ├── utils.ts        # Utility functions
│   └── animations.ts   # Framer Motion variants
├── public/             # Static assets
└── ...config files
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to change the color palette:

```ts
colors: {
  background: '#FAFAFA',
  foreground: '#1a1a1a',
  accent: {
    primary: '#0066FF',
    secondary: '#00D4AA',
  },
}
```

### Content

Update the content in section components:
- `components/sections/hero.tsx` - Hero text and stats
- `components/sections/bento-grid.tsx` - About cards
- `components/sections/projects-showcase.tsx` - Projects data
- `components/sections/contact.tsx` - Contact form

## ⚡ Performance

This site is optimized for 120fps smoothness:

- GPU-accelerated animations (transform, opacity)
- `will-change` on animated elements
- Code splitting with dynamic imports
- Image optimization with `next/image`
- Lazy loading for heavy 3D components
- React.memo for preventing re-renders

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Deploy

### Other Platforms

```bash
npm run build
npm start
```

## 📝 License

MIT License - feel free to use for your own portfolio!

## 🤝 Contributing

Contributions welcome! Feel free to submit issues and PRs.

---

Built with ❤️ and way too much ☕
