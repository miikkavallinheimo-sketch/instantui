import type { DesignState } from "./types";
import { getGlassConfigForVibe, buildGlassBackground, buildBackdropFilter, buildGlassBorder } from "./glassTokens";

export function generateLandingPageHTML(state: DesignState): string {
  const { colors, fontPair, typography } = state;
  const glassConfig = getGlassConfigForVibe("modern-saas");
  const glassBackground = buildGlassBackground(colors.surface, glassConfig);
  const backdropBlur = buildBackdropFilter(glassConfig.blur);
  const glassBorder = buildGlassBorder(colors.borderSubtle, glassConfig);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page</title>
  <style>
    :root {
      --primary: ${colors.primary};
      --secondary: ${colors.secondary};
      --accent: ${colors.accent};
      --background: ${colors.background};
      --surface: ${colors.surface};
      --surface-alt: ${colors.surfaceAlt};
      --text: ${colors.text};
      --text-muted: ${colors.textMuted};
      --border-subtle: ${colors.borderSubtle};
      --border-strong: ${colors.borderStrong};
      --on-primary: ${colors.onPrimary};
      --on-secondary: ${colors.onSecondary};
      --on-accent: ${colors.onAccent};
      --font-heading: "${fontPair.heading}", system-ui, -apple-system, sans-serif;
      --font-body: "${fontPair.body}", system-ui, -apple-system, sans-serif;
      --heading-font-size: 2rem;
      --heading-font-weight: ${typography.heading.weight};
      --subheading-font-size: 1.25rem;
      --body-font-size: 1rem;
      --body-font-weight: ${typography.body.weight};
      --spacing-sm: 0.75rem;
      --spacing-md: 1rem;
      --spacing-lg: 1.5rem;
      --spacing-xl: 2rem;
      --spacing-2xl: 3rem;
      --radius-lg: 16px;
      --shadow-lg: 0 10px 30px rgba(0,0,0,0.15);
      --glass-blur: ${glassConfig.blur}px;
      --glass-background: ${glassBackground};
      --glass-backdrop-filter: ${backdropBlur};
      --glass-border: ${glassBorder};
      --gradient-primary: linear-gradient(135deg, var(--primary), var(--secondary));
      --gradient-accent: linear-gradient(135deg, var(--accent), var(--primary));
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: var(--font-body); font-size: var(--body-font-size); color: var(--text); background-color: var(--background); line-height: 1.6; }
    h1, h2, h3 { font-family: var(--font-heading); font-weight: var(--heading-font-weight); margin-bottom: var(--spacing-lg); }
    h1 { font-size: var(--heading-font-size); }
    h2 { font-size: var(--subheading-font-size); }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 var(--spacing-lg); }
    nav { background-color: var(--surface); border-bottom: 1px solid var(--border-subtle); padding: var(--spacing-md) 0; position: sticky; top: 0; z-index: 100; }
    nav .container { display: flex; justify-content: space-between; align-items: center; }
    nav .logo { font-weight: var(--heading-font-weight); font-size: var(--subheading-font-size); color: var(--text); }
    nav a { color: var(--text); text-decoration: none; margin-left: var(--spacing-lg); transition: color 0.2s; }
    nav a:hover { color: var(--text-muted); }

    .hero { background: var(--gradient-primary); color: var(--on-primary); padding: var(--spacing-2xl) 0; text-align: center; }
    .hero h1 { color: var(--on-primary); margin-bottom: var(--spacing-md); }
    .hero p { color: var(--on-primary); opacity: 0.95; max-width: 600px; margin: var(--spacing-lg) auto; }

    .btn-primary { background-color: var(--primary); color: var(--on-primary); padding: var(--spacing-md) var(--spacing-lg); border-radius: var(--radius-lg); text-decoration: none; font-weight: 600; transition: all 0.2s; border: none; cursor: pointer; font-size: var(--body-font-size); display: inline-block; }
    .btn-primary:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
    .btn-secondary { background-color: var(--secondary); color: var(--on-secondary); padding: var(--spacing-md) var(--spacing-lg); border-radius: var(--radius-lg); margin-left: var(--spacing-md); text-decoration: none; font-weight: 600; transition: all 0.2s; border: none; cursor: pointer; font-size: var(--body-font-size); display: inline-block; }
    .btn-secondary:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }

    .features { padding: var(--spacing-2xl) 0; }
    .features h2 { text-align: center; margin-bottom: var(--spacing-2xl); }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-xl); }

    .card { background-color: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--spacing-xl); transition: all 0.3s; }
    .card:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
    .card h3 { color: var(--text); margin-bottom: var(--spacing-md); }
    .card p { color: var(--text-muted); }

    .cta { background: var(--gradient-accent); color: var(--on-accent); padding: var(--spacing-2xl) 0; text-align: center; }
    .cta h2 { color: var(--on-accent); margin-bottom: var(--spacing-lg); }

    footer { background-color: var(--surface); border-top: 1px solid var(--border-subtle); padding: var(--spacing-xl) 0; text-align: center; color: var(--text-muted); }

    @media (max-width: 768px) {
      h1 { font-size: 1.5rem; }
      h2 { font-size: 1.25rem; }
      .btn-secondary { display: block; margin-left: 0; margin-top: var(--spacing-md); }
    }
  </style>
</head>
<body>
  <nav>
    <div class="container">
      <div class="logo">Brand</div>
      <div>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </nav>

  <section class="hero">
    <div class="container">
      <h1>Welcome to Your Amazing Product</h1>
      <p>Build something incredible with our design system. Everything you need to create beautiful, cohesive digital experiences.</p>
      <div style="margin-top: 2rem;">
        <button class="btn-primary">Get Started</button>
        <button class="btn-secondary">Learn More</button>
      </div>
    </div>
  </section>

  <section class="features" id="features">
    <div class="container">
      <h2>Why Choose Us?</h2>
      <div class="features-grid">
        <div class="card">
          <h3>Beautiful Design</h3>
          <p>Professionally designed components and layouts that look stunning out of the box. Every element is crafted with attention to detail.</p>
        </div>
        <div class="card">
          <h3>Lightning Fast</h3>
          <p>Optimized for performance with minimal CSS and clean HTML structure. Load times under 1 second guaranteed.</p>
        </div>
        <div class="card">
          <h3>Highly Flexible</h3>
          <p>Customize every aspect with CSS variables and semantic design tokens. Adapt to any design requirement effortlessly.</p>
        </div>
        <div class="card">
          <h3>Accessible</h3>
          <p>Built with accessibility in mind. WCAG 2.1 compliant components ensure everyone can use your product.</p>
        </div>
        <div class="card">
          <h3>Responsive</h3>
          <p>Mobile-first design approach. Your designs look perfect on any screen size, from mobile to desktop.</p>
        </div>
        <div class="card">
          <h3>Dark Mode Ready</h3>
          <p>Pre-built dark mode support with carefully chosen color palettes. Switch themes seamlessly.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="cta">
    <div class="container">
      <h2>Ready to Get Started?</h2>
      <p style="margin-bottom: 1.5rem;">Join thousands of designers and developers building with our system.</p>
      <button class="btn-primary">Start Building Now</button>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`;
}

export function generateBlogPageHTML(state: DesignState): string {
  const { colors, fontPair, typography } = state;
  const glassConfig = getGlassConfigForVibe("modern-saas");
  const glassBackground = buildGlassBackground(colors.surface, glassConfig);
  const backdropBlur = buildBackdropFilter(glassConfig.blur);
  const glassBorder = buildGlassBorder(colors.borderSubtle, glassConfig);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog</title>
  <style>
    :root {
      --primary: ${colors.primary};
      --secondary: ${colors.secondary};
      --accent: ${colors.accent};
      --background: ${colors.background};
      --surface: ${colors.surface};
      --surface-alt: ${colors.surfaceAlt};
      --text: ${colors.text};
      --text-muted: ${colors.textMuted};
      --border-subtle: ${colors.borderSubtle};
      --border-strong: ${colors.borderStrong};
      --font-heading: "${fontPair.heading}", system-ui, -apple-system, sans-serif;
      --font-body: "${fontPair.body}", system-ui, -apple-system, sans-serif;
      --heading-font-weight: ${typography.heading.weight};
      --body-font-weight: ${typography.body.weight};
      --glass-blur: ${glassConfig.blur}px;
      --glass-background: ${glassBackground};
      --glass-backdrop-filter: ${backdropBlur};
      --glass-border: ${glassBorder};
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: var(--font-body); color: var(--text); background-color: var(--background); line-height: 1.6; }
    .container { max-width: 900px; margin: 0 auto; padding: 0 1.5rem; }

    header { background: linear-gradient(135deg, var(--primary), var(--secondary)); padding: 3rem 0; margin-bottom: 3rem; }
    header .container { text-align: center; }
    header h1 { font-family: var(--font-heading); font-weight: var(--heading-font-weight); font-size: 2.5rem; color: var(--on-primary); margin-bottom: 0.5rem; }
    header p { color: var(--on-primary); font-size: 1.1rem; opacity: 0.9; }

    .hero { padding: 3rem 0; margin-bottom: 3rem; text-align: center; }
    .hero p { max-width: 700px; margin: 0 auto 2rem; font-size: 1.05rem; color: var(--text-muted); }

    .blog-grid { display: grid; gap: 2rem; }
    article { background-color: var(--surface); border: 1px solid var(--border-subtle); border-radius: 10px; overflow: hidden; transition: all 0.3s; padding: 2rem; }
    article:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.15); transform: translateY(-4px); }
    article h2 { font-family: var(--font-heading); font-weight: var(--heading-font-weight); font-size: 1.5rem; color: var(--text); margin-bottom: 0.5rem; }
    article p { color: var(--text-muted); margin-bottom: 1rem; }

    .article-category { display: inline-block; padding: 0.35rem 0.85rem; background-color: var(--surface-alt); color: var(--text-muted); border-radius: 6px; font-size: 0.8rem; font-weight: 600; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .read-more { color: var(--text); text-decoration: none; font-weight: 600; transition: color 0.2s; }
    .read-more:hover { color: var(--text-muted); }

    footer { margin-top: 4rem; padding: 3rem 0; border-top: 1px solid var(--border-subtle); background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%); }
    .footer-content { text-align: center; }
    .footer-contact { display: flex; justify-content: center; flex-wrap: wrap; gap: 2rem; margin-bottom: 2rem; }
    .contact-item { display: flex; flex-direction: column; align-items: center; }
    .contact-label { font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
    .contact-value { color: var(--text); font-weight: 600; text-decoration: none; }
    .contact-value:hover { color: var(--text-muted); text-decoration: underline; }
    .footer-divider { height: 1px; background: var(--border-subtle); margin: 2rem 0; }
    .footer-bottom { color: var(--text-muted); font-size: 0.9rem; }

    @media (max-width: 768px) {
      .footer-contact { gap: 1.5rem; }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <h1>Blog</h1>
      <p>Insights, tutorials, and inspiration for designers and developers</p>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <p>Explore our latest articles covering design systems, development practices, and industry trends. Find practical guides, case studies, and creative inspiration to elevate your work.</p>
    </div>
  </section>

  <main class="container">
    <div class="blog-grid">
      <article>
        <span class="article-category">Design</span>
        <h2>Creating Cohesive Design Systems</h2>
        <p>Build design systems that scale with your product and team. Learn best practices for color palettes, typography scales, component architecture, and design documentation that keeps everyone aligned.</p>
        <div style="font-size: 0.875rem; color: var(--text-muted); margin-top: 1rem;">Published on January 15, 2024 • 8 min read</div>
        <div style="margin-top: 1.5rem;">
          <a href="#" class="read-more">Read Article →</a>
        </div>
      </article>

      <article>
        <span class="article-category">Development</span>
        <h2>Building with CSS Variables</h2>
        <p>Master CSS custom properties for flexible and maintainable styling. Discover how to create theming systems, dynamic color schemes, and responsive layouts using modern CSS techniques.</p>
        <div style="font-size: 0.875rem; color: var(--text-muted); margin-top: 1rem;">Published on January 10, 2024 • 10 min read</div>
        <div style="margin-top: 1.5rem;">
          <a href="#" class="read-more">Read Article →</a>
        </div>
      </article>

      <article>
        <span class="article-category">Inspiration</span>
        <h2>Best Design Trends of 2024</h2>
        <p>Explore glassmorphism, micro-interactions, variable fonts, and bold color schemes reshaping digital design. See real-world examples and learn how to incorporate these trends into your projects.</p>
        <div style="font-size: 0.875rem; color: var(--text-muted); margin-top: 1rem;">Published on January 5, 2024 • 12 min read</div>
        <div style="margin-top: 1.5rem;">
          <a href="#" class="read-more">Read Article →</a>
        </div>
      </article>

      <article>
        <span class="article-category">Design</span>
        <h2>Accessible Color Contrast Guide</h2>
        <p>Understand WCAG standards and create accessible color combinations. Learn how proper contrast ratios improve usability for everyone and implement testing tools in your workflow.</p>
        <div style="font-size: 0.875rem; color: var(--text-muted); margin-top: 1rem;">Published on December 28, 2023 • 7 min read</div>
        <div style="margin-top: 1.5rem;">
          <a href="#" class="read-more">Read Article →</a>
        </div>
      </article>
    </div>
  </main>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-contact">
          <div class="contact-item">
            <div class="contact-label">Email</div>
            <a href="mailto:hello@example.com" class="contact-value">hello@example.com</a>
          </div>
          <div class="contact-item">
            <div class="contact-label">Phone</div>
            <a href="tel:+1234567890" class="contact-value">+1 (234) 567-890</a>
          </div>
          <div class="contact-item">
            <div class="contact-label">Location</div>
            <div class="contact-value">San Francisco, CA</div>
          </div>
        </div>
        <div class="footer-divider"></div>
        <p class="footer-bottom">&copy; 2024 Your Blog. All rights reserved. | Privacy Policy | Terms of Service</p>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

export function generatePortfolioPageHTML(state: DesignState): string {
  const { colors, fontPair, typography } = state;
  const glassConfig = getGlassConfigForVibe("modern-saas");
  const glassBackground = buildGlassBackground(colors.surface, glassConfig);
  const backdropBlur = buildBackdropFilter(glassConfig.blur);
  const glassBorder = buildGlassBorder(colors.borderSubtle, glassConfig);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio</title>
  <style>
    :root {
      --primary: ${colors.primary};
      --secondary: ${colors.secondary};
      --accent: ${colors.accent};
      --background: ${colors.background};
      --surface: ${colors.surface};
      --surface-alt: ${colors.surfaceAlt};
      --text: ${colors.text};
      --text-muted: ${colors.textMuted};
      --border-subtle: ${colors.borderSubtle};
      --font-heading: "${fontPair.heading}", system-ui, -apple-system, sans-serif;
      --font-body: "${fontPair.body}", system-ui, -apple-system, sans-serif;
      --heading-font-weight: ${typography.heading.weight};
      --glass-blur: ${glassConfig.blur}px;
      --glass-background: ${glassBackground};
      --glass-backdrop-filter: ${backdropBlur};
      --glass-border: ${glassBorder};
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: var(--font-body); color: var(--text); background-color: var(--background); }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

    .hero { padding: 4rem 0; text-align: center; }
    .hero h1 { font-family: var(--font-heading); font-weight: var(--heading-font-weight); font-size: 3rem; color: var(--text); margin-bottom: 1rem; }
    .hero p { font-size: 1.125rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 2rem; }

    .portfolio { padding: 3rem 0; }
    .portfolio h2 { font-family: var(--font-heading); font-weight: var(--heading-font-weight); font-size: 2rem; text-align: center; margin-bottom: 3rem; color: var(--text); }
    .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }

    .glass { background: var(--glass-background); backdrop-filter: var(--glass-backdrop-filter); border: var(--glass-border); border-radius: 10px; padding: 1.5rem; }
    .glass h3 { font-family: var(--font-heading); color: var(--text); margin-bottom: 0.5rem; }
    .glass p { color: var(--text-muted); font-size: 0.9rem; }

    footer { margin-top: 4rem; padding: 3rem 0; border-top: 1px solid var(--border-subtle); background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%); }
    .footer-content { text-align: center; }
    .footer-contact { display: flex; justify-content: center; flex-wrap: wrap; gap: 2rem; margin-bottom: 2rem; }
    .contact-item { display: flex; flex-direction: column; align-items: center; }
    .contact-label { font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
    .contact-value { color: var(--text); font-weight: 600; text-decoration: none; }
    .contact-value:hover { color: var(--text-muted); text-decoration: underline; }
    .footer-divider { height: 1px; background: var(--border-subtle); margin: 2rem 0; }
    .footer-bottom { color: var(--text-muted); font-size: 0.9rem; }

    @media (max-width: 768px) {
      .hero h1 { font-size: 2rem; }
      .footer-contact { gap: 1.5rem; }
    }
  </style>
</head>
<body>
  <div class="hero">
    <div class="container">
      <h1>My Work</h1>
      <div style="max-width: 800px; margin: 2rem auto; line-height: 1.8;">
        <p>I'm a <strong>creative designer and developer</strong> passionate about crafting beautiful digital experiences. With expertise spanning <em>UI/UX design, web development, and brand identity</em>, I transform ideas into elegant, functional solutions that resonate with users.</p>
        <p style="margin-top: 1rem;">My approach combines <strong>strategic thinking</strong> with <em>meticulous attention to detail</em>. I believe in creating not just visually appealing interfaces, but intuitive experiences that guide users effortlessly toward their goals. Every project is an opportunity to push creative boundaries while maintaining accessibility and performance.</p>
        <p style="margin-top: 1rem;">Explore my featured projects below to see how I blend <strong>innovation, design thinking, and technical expertise</strong> to deliver impactful digital solutions.</p>
      </div>
    </div>
  </div>

  <section class="portfolio">
    <div class="container">
      <h2>Featured Projects</h2>
      <div class="portfolio-grid">
        <div class="glass">
          <h3>E-Commerce Platform</h3>
          <p>Designed and developed a modern e-commerce platform with seamless user experience, advanced product filtering, smart recommendations, and secure checkout flow. Increased conversion rates by 45% through intuitive navigation and optimized checkout process.</p>
        </div>

        <div class="glass">
          <h3>Analytics Dashboard</h3>
          <p>Built an interactive analytics dashboard enabling real-time data visualization with customizable widgets, trend analysis, and predictive insights. Implemented complex data processing and fully responsive design for all device sizes.</p>
        </div>

        <div class="glass">
          <h3>Mobile Travel App</h3>
          <p>Created a comprehensive mobile application for travel planning with integrated maps, intelligent itinerary management, social collaboration, and offline functionality. Successfully launched on iOS and Android with 4.8-star ratings.</p>
        </div>

        <div class="glass">
          <h3>Project Management Suite</h3>
          <p>Engineered an enterprise project management platform with real-time collaboration, team workspaces, task automation, and comprehensive reporting. Supports teams of all sizes from startups to Fortune 500 companies.</p>
        </div>

        <div class="glass">
          <h3>Design System Library</h3>
          <p>Created a comprehensive design system with reusable components, detailed documentation, and interactive component explorer. Used across multiple products and teams to ensure design consistency and accelerate development.</p>
        </div>

        <div class="glass">
          <h3>SaaS Platform</h3>
          <p>Developed a secure Software-as-a-Service platform with advanced user authentication, role-based access control, and comprehensive audit logging. Achieved SOC 2 compliance and serves thousands of enterprise customers.</p>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-contact">
          <div class="contact-item">
            <div class="contact-label">Email</div>
            <a href="mailto:hello@example.com" class="contact-value">hello@example.com</a>
          </div>
          <div class="contact-item">
            <div class="contact-label">Phone</div>
            <a href="tel:+1234567890" class="contact-value">+1 (234) 567-890</a>
          </div>
          <div class="contact-item">
            <div class="contact-label">Location</div>
            <div class="contact-value">San Francisco, CA</div>
          </div>
        </div>
        <div class="footer-divider"></div>
        <p class="footer-bottom">&copy; 2024 Your Name. All rights reserved. | Privacy Policy | Terms of Service</p>
      </div>
    </div>
  </footer>
</body>
</html>`;
}
