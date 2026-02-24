# 🌮 Taco Tuesday Coffee - Premium Landing Page

A stunning, modern coffee shop landing page with premium dark mode aesthetics, interactive 3D elements, and smooth animations.

![Taco Tuesday Coffee](https://images.unsplash.com/photo-1541167760496-1628856ab772?w=1200&h=630&fit=crop)

## ✨ Features

### Design & Aesthetics
- **Premium Dark Mode** - Warm earth tones (espresso, caramel, terracotta) with glowing accents
- **Glass-morphism** - Frosted glass effects on navbar and cards
- **Mesh Gradients** - Soft, animated background gradients
- **Floating Elements** - Cards and UI elements with soft shadows and lift effects

### Interactive Elements
- **3D Coffee Cup** - Interactive Three.js coffee cup that follows your mouse
- **Steam Animation** - CSS particle effects rising from the coffee
- **Scroll Animations** - GSAP-powered reveal animations on scroll
- **Parallax Effects** - Mouse and scroll-based parallax on images
- **Testimonials Carousel** - Auto-playing carousel with touch support

### Components
- 🧭 Floating glass navbar with mobile menu
- 🎯 Hero section with 3D element
- ☕ Menu highlights grid (6 signature drinks)
- 📖 About section with parallax images
- 💬 Testimonials carousel
- 📍 Location & hours with embedded map
- 📱 Fully responsive (375px - 1440px)
- ♿ Accessible (WCAG AA compliant)

## 🚀 Quick Start

### Option 1: Open Directly
Simply open `index.html` in your browser:

```bash
# macOS
open taco-tuesday-coffee/index.html

# Linux
xdg-open taco-tuesday-coffee/index.html

# Windows
start taco-tuesday-coffee\index.html
```

### Option 2: Use a Local Server (Recommended)
For the best experience (especially for Three.js):

```bash
# Using Python 3
cd taco-tuesday-coffee
python3 -m http.server 8000

# Using Node.js (http-server)
npx http-server taco-tuesday-coffee -p 8000

# Using PHP
php -S localhost:8000 -t taco-tuesday-coffee
```

Then visit `http://localhost:8000`

## 📁 Project Structure

```
taco-tuesday-coffee/
├── index.html              # Main landing page
├── css/
│   ├── variables.css       # Design tokens (colors, typography, spacing)
│   ├── base.css            # CSS reset and base styles
│   ├── components.css      # Reusable components (buttons, cards, navbar)
│   ├── effects.css         # Animations, glass-morphism, gradients
│   └── layout.css          # Section-specific layouts
├── js/
│   ├── coffee-cup-3d.js    # Three.js 3D coffee cup
│   ├── steam-effect.js     # Steam particle animation
│   ├── animations.js       # GSAP scroll animations
│   ├── navbar.js           # Navbar interactions
│   ├── testimonials.js     # Carousel functionality
│   └── parallax.js         # Parallax effects
└── assets/
    ├── images/             # (Optional) Local images
    ├── fonts/              # (Optional) Self-hosted fonts
    └── models/             # (Optional) 3D models
```

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Deep Espresso | `#1A1512` | Main background |
| Cream Latte | `#F5EFE6` | Light sections |
| Warm Caramel | `#D4A574` | Primary accent |
| Terracotta | `#C65D3B` | Secondary accent |
| Golden Crema | `#E8B86D` | Glow effects |

### Typography
- **Font Family:** General Sans / Space Grotesk
- **Weights:** 300, 400, 500, 600, 700
- **Sizing:** Fluid REM units with clamp()

### Spacing
- 8px baseline grid
- Section padding: `clamp(4rem, 3rem + 5vw, 8rem)`

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Three.js** - 3D coffee cup rendering
- **GSAP** - Scroll-triggered animations
- **ScrollTrigger** - GSAP plugin for scroll effects
- **Google Fonts** - General Sans typeface

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | 375px | Single column |
| Mobile Large | 425px | Single column |
| Tablet | 768px | 2-column grid |
| Desktop | 1024px | 3-column grid |
| Large Desktop | 1440px | Max-width container |

## ♿ Accessibility Features

- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ Color contrast (4.5:1 minimum)
- ✅ Reduced motion support
- ✅ Touch targets (44x44px minimum)
- ✅ Skip to main content link

## 🎯 Performance Optimizations

- ✅ Lazy loading images
- ✅ System font fallback
- ✅ CSS containment
- ✅ Debounced scroll handlers
- ✅ Reduced motion detection
- ✅ Efficient animations (transform/opacity)
- ✅ CDN-hosted libraries

## 🖱️ Interactions

### Navbar
- Glass-morphism with blur effect
- Scroll-based transparency
- Mobile hamburger menu with overlay
- Active link highlighting

### Hero Section
- 3D coffee cup follows mouse
- Steam particle animation
- Floating background circles
- Scroll indicator

### Cards
- Hover lift effect
- Soft shadow intensify
- Image zoom on hover
- Glow border on hover

### Carousel
- Auto-play (5s interval)
- Touch/swipe support
- Keyboard navigation
- Pause on hover

## 🎨 Customization

### Change Colors
Edit `css/variables.css`:

```css
:root {
  --color-primary: #YOUR_COLOR;
  --color-secondary: #YOUR_COLOR;
  /* ... */
}
```

### Change Typography
Edit `css/variables.css`:

```css
:root {
  --font-primary: 'Your Font', sans-serif;
}
```

### Update Menu Items
Edit `index.html` - find the `.menu-grid` section and modify card content.

### Update Location
Edit the Google Maps embed URL in `index.html`:

```html
<iframe src="YOUR_GOOGLE_MAPS_EMBED_URL"></iframe>
```

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

## 📸 Image Credits

All images from [Unsplash](https://unsplash.com) - free to use.

- Hero/Latte: [Photo by Element5 Digital](https://unsplash.com/photos/lQ9RtFb8vKk)
- Espresso: [Photo by Manupatha Fernando](https://unsplash.com/photos/lJXxYzHLqDg)
- Caramel: [Photo by Scott Webb](https://unsplash.com/photos/CpCBz1RYf9k)
- And more...

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own coffee shop or business!

## 🙏 Acknowledgments

- Design inspiration from [Minimal.Gallery](https://minimal.gallery)
- 3D concept from [Spline](https://spline.design)
- Animations powered by [GSAP](https://greensock.com/gsap/)

---

**Made with ☕ and ❤️ by Taco Tuesday Coffee**

*Where every day feels like a celebration.*
