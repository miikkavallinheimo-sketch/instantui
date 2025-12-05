import type { DesignState } from "./types";

export function generateLandingPageHTML(state: DesignState): string {
  const { colors, fontPair, typography, spacing } = state;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page</title>
  <link rel="stylesheet" href="styles.css">
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

      --font-heading: "${fontPair.heading}", system-ui, sans-serif;
      --font-body: "${fontPair.body}", system-ui, sans-serif;

      --heading-font-size: ${typography.heading.size === "2xl" ? "2rem" : "1.875rem"};
      --heading-font-weight: ${typography.heading.weight};
      --subheading-font-size: ${typography.subheading?.size === "xl" ? "1.25rem" : "1.125rem"};
      --subheading-font-weight: ${typography.subheading?.weight ?? typography.heading.weight};
      --body-font-size: ${typography.body.size === "md" ? "1rem" : "0.875rem"};
      --body-font-weight: ${typography.body.weight};

      --spacing-xs: 0.5rem;
      --spacing-sm: 0.75rem;
      --spacing-md: 1rem;
      --spacing-lg: 1.5rem;
      --spacing-xl: 2rem;
      --spacing-2xl: 3rem;

      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 16px;
      --radius-xl: 24px;

      --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
      --shadow-md: 0 4px 8px rgba(0,0,0,0.12);
      --shadow-lg: 0 10px 30px rgba(0,0,0,0.15);

      --gradient-primary: linear-gradient(135deg, var(--primary), var(--secondary));
      --gradient-accent: linear-gradient(135deg, var(--accent), var(--primary));
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: var(--font-body);
      font-size: var(--body-font-size);
      color: var(--text);
      background-color: var(--background);
      line-height: 1.6;
    }

    h1, h2, h3 {
      font-family: var(--font-heading);
      font-weight: var(--heading-font-weight);
      margin-bottom: var(--spacing-lg);
    }

    h1 { font-size: var(--heading-font-size); }
    h2 { font-size: var(--subheading-font-size); }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-lg);
    }

    /* Navigation */
    nav {
      background-color: var(--surface);
      border-bottom: 1px solid var(--border-subtle);
      padding: var(--spacing-md) 0;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    nav .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    nav .logo {
      font-weight: var(--heading-font-weight);
      font-size: var(--subheading-font-size);
      color: var(--primary);
    }

    nav a {
      color: var(--text);
      text-decoration: none;
      margin-left: var(--spacing-lg);
      transition: color 0.2s;
    }

    nav a:hover {
      color: var(--primary);
    }

    /* Hero */
    .hero {
      background: var(--gradient-primary);
      color: var(--on-primary);
      padding: var(--spacing-2xl) 0;
      text-align: center;
    }

    .hero h1 {
      color: var(--on-primary);
      margin-bottom: var(--spacing-md);
    }

    .hero p {
      color: var(--on-primary);
      opacity: 0.95;
      max-width: 600px;
      margin: var(--spacing-lg) auto;
    }

    /* Buttons */
    .btn {
      display: inline-block;
      padding: var(--spacing-md) var(--spacing-lg);
      border-radius: var(--radius-lg);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s;
      border: none;
      cursor: pointer;
      font-size: var(--body-font-size);
    }

    .btn-primary {
      background-color: var(--primary);
      color: var(--on-primary);
    }

    .btn-primary:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }

    .btn-secondary {
      background-color: var(--secondary);
      color: var(--on-secondary);
      margin-left: var(--spacing-md);
    }

    .btn-secondary:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }

    /* Features */
    .features {
      padding: var(--spacing-2xl) 0;
    }

    .features h2 {
      text-align: center;
      margin-bottom: var(--spacing-2xl);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-xl);
    }

    .feature-card {
      background-color: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: var(--spacing-xl);
      transition: all 0.3s;
    }

    .feature-card:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-4px);
    }

    .feature-card h3 {
      color: var(--primary);
      margin-bottom: var(--spacing-md);
    }

    .feature-card p {
      color: var(--text-muted);
    }

    /* CTA Section */
    .cta {
      background: var(--gradient-accent);
      color: var(--on-accent);
      padding: var(--spacing-2xl) 0;
      text-align: center;
    }

    .cta h2 {
      color: var(--on-accent);
      margin-bottom: var(--spacing-lg);
    }

    .cta .btn {
      background-color: var(--on-accent);
      color: var(--accent);
    }

    /* Footer */
    footer {
      background-color: var(--surface);
      border-top: 1px solid var(--border-subtle);
      padding: var(--spacing-xl) 0;
      text-align: center;
      color: var(--text-muted);
    }

    @media (max-width: 768px) {
      h1 { font-size: 1.5rem; }
      h2 { font-size: 1.25rem; }

      .btn-secondary {
        display: block;
        margin-left: 0;
        margin-top: var(--spacing-md);
      }
    }
  </style>
</head>
<body>
  <!-- Navigation -->
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

  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <h1>Welcome to Your Amazing Product</h1>
      <p>Build something incredible with our design system. Everything you need to create beautiful, cohesive digital experiences.</p>
      <div style="margin-top: var(--spacing-xl);">
        <button class="btn btn-primary">Get Started</button>
        <button class="btn btn-secondary">Learn More</button>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="features" id="features">
    <div class="container">
      <h2>Why Choose Us?</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Beautiful</h3>
          <p>Professionally designed components and layouts that look stunning out of the box.</p>
        </div>
        <div class="feature-card">
          <h3>Fast</h3>
          <p>Optimized for performance with minimal CSS and clean HTML structure.</p>
        </div>
        <div class="feature-card">
          <h3>Flexible</h3>
          <p>Customize every aspect with CSS variables and semantic design tokens.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta">
    <div class="container">
      <h2>Ready to Get Started?</h2>
      <p style="margin-bottom: var(--spacing-lg);">Join thousands of designers and developers building with our system.</p>
      <button class="btn" style="background-color: var(--on-accent); color: var(--accent);">Start Building Now</button>
    </div>
  </section>

  <!-- Footer -->
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

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog</title>
  <link rel="stylesheet" href="styles.css">
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

      --font-heading: "${fontPair.heading}", system-ui, sans-serif;
      --font-body: "${fontPair.body}", system-ui, sans-serif;
      --heading-font-weight: ${typography.heading.weight};
      --body-font-weight: ${typography.body.weight};
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: var(--font-body);
      color: var(--text);
      background-color: var(--background);
      line-height: 1.6;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    header {
      background-color: var(--surface);
      border-bottom: 1px solid var(--border-subtle);
      padding: 2rem 0;
      margin-bottom: 3rem;
    }

    header h1 {
      font-family: var(--font-heading);
      font-weight: var(--heading-font-weight);
      font-size: 2rem;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }

    header p {
      color: var(--text-muted);
    }

    .blog-grid {
      display: grid;
      gap: 2rem;
    }

    article {
      background-color: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      overflow: hidden;
      transition: all 0.3s;
    }

    article:hover {
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      transform: translateY(-4px);
    }

    .article-header {
      padding: 2rem;
      border-bottom: 4px solid var(--primary);
    }

    article.design .article-header {
      border-bottom-color: var(--primary);
    }

    article.development .article-header {
      border-bottom-color: var(--secondary);
    }

    article.inspiration .article-header {
      border-bottom-color: var(--accent);
    }

    .article-category {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background-color: var(--surface-alt);
      color: var(--text-muted);
      border-radius: 4px;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    article.design .article-category {
      color: var(--on-primary);
      background-color: var(--primary);
    }

    article.development .article-category {
      color: var(--on-secondary);
      background-color: var(--secondary);
    }

    article.inspiration .article-category {
      color: var(--on-accent);
      background-color: var(--accent);
    }

    .article-header h2 {
      font-family: var(--font-heading);
      font-weight: var(--heading-font-weight);
      font-size: 1.5rem;
      color: var(--text);
      margin-bottom: 0.5rem;
    }

    .article-excerpt {
      color: var(--text-muted);
      margin-bottom: 1rem;
    }

    .article-meta {
      font-size: 0.875rem;
      color: var(--text-muted);
    }

    .article-footer {
      padding: 1.5rem 2rem;
      background-color: var(--surface-alt);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .read-more {
      color: var(--primary);
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s;
    }

    .read-more:hover {
      color: var(--accent);
    }

    footer {
      margin-top: 4rem;
      padding: 2rem 0;
      border-top: 1px solid var(--border-subtle);
      text-align: center;
      color: var(--text-muted);
    }

    @media (max-width: 768px) {
      .article-footer {
        flex-direction: column;
        text-align: center;
      }
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

  <main class="container">
    <div class="blog-grid">
      <article class="design">
        <div class="article-header">
          <span class="article-category">Design</span>
          <h2>Creating Cohesive Design Systems</h2>
          <p class="article-excerpt">Learn how to build design systems that scale with your product and team.</p>
          <div class="article-meta">Published on January 15, 2024</div>
        </div>
        <div class="article-footer">
          <div></div>
          <a href="#" class="read-more">Read Article →</a>
        </div>
      </article>

      <article class="development">
        <div class="article-header">
          <span class="article-category">Development</span>
          <h2>Building with CSS Variables</h2>
          <p class="article-excerpt">Master CSS custom properties for flexible and maintainable styling.</p>
          <div class="article-meta">Published on January 10, 2024</div>
        </div>
        <div class="article-footer">
          <div></div>
          <a href="#" class="read-more">Read Article →</a>
        </div>
      </article>

      <article class="inspiration">
        <div class="article-header">
          <span class="article-category">Inspiration</span>
          <h2>Best Design Trends of 2024</h2>
          <p class="article-excerpt">Explore the latest design trends and how they're reshaping digital products.</p>
          <div class="article-meta">Published on January 5, 2024</div>
        </div>
        <div class="article-footer">
          <div></div>
          <a href="#" class="read-more">Read Article →</a>
        </div>
      </article>
    </div>
  </main>

  <footer>
    <div class="container">
      <p>&copy; 2024 Your Blog. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`;
}

export function generatePortfolioPageHTML(state: DesignState): string {
  const { colors, fontPair, typography } = state;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio</title>
  <link rel="stylesheet" href="styles.css">
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

      --font-heading: "${fontPair.heading}", system-ui, sans-serif;
      --font-body: "${fontPair.body}", system-ui, sans-serif;
      --heading-font-weight: ${typography.heading.weight};
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: var(--font-body);
      color: var(--text);
      background-color: var(--background);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* Hero */
    .hero {
      padding: 4rem 0;
      text-align: center;
    }

    .hero h1 {
      font-family: var(--font-heading);
      font-weight: var(--heading-font-weight);
      font-size: 3rem;
      color: var(--primary);
      margin-bottom: 1rem;
    }

    .hero p {
      font-size: 1.125rem;
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto 2rem;
    }

    /* Portfolio Grid */
    .portfolio {
      padding: 3rem 0;
    }

    .portfolio h2 {
      font-family: var(--font-heading);
      font-weight: var(--heading-font-weight);
      font-size: 2rem;
      text-align: center;
      margin-bottom: 3rem;
    }

    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .portfolio-item {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .portfolio-item:hover {
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
      transform: translateY(-8px);
      border-color: var(--primary);
    }

    .portfolio-image {
      width: 100%;
      height: 200px;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 3rem;
      position: relative;
      overflow: hidden;
    }

    .portfolio-image::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1), transparent);
    }

    .portfolio-content {
      padding: 1.5rem;
    }

    .portfolio-content h3 {
      font-family: var(--font-heading);
      color: var(--primary);
      margin-bottom: 0.5rem;
    }

    .portfolio-content p {
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .portfolio-tags {
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tag {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background-color: var(--surface-alt);
      color: var(--text-muted);
      border-radius: 4px;
      font-size: 0.75rem;
    }

    /* Footer */
    footer {
      margin-top: 4rem;
      padding: 3rem 0;
      border-top: 1px solid var(--border-subtle);
      background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
    }

    .footer-content {
      text-align: center;
    }

    .footer-contact {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .contact-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .contact-label {
      font-size: 0.85rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .contact-value {
      color: var(--primary);
      font-weight: 600;
      text-decoration: none;
    }

    .contact-value:hover {
      text-decoration: underline;
    }

    .footer-divider {
      height: 1px;
      background: var(--border-subtle);
      margin: 2rem 0;
    }

    .footer-bottom {
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2rem;
      }

      .footer-contact {
        gap: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="hero">
    <div class="container">
      <h1>My Work</h1>
      <div style="max-width: 800px; margin: 2rem auto; line-height: 1.8;">
        <p style="font-size: 1.1rem; color: var(--text); margin-bottom: 1.5rem;">
          I'm a <strong>creative designer and developer</strong> passionate about crafting beautiful digital experiences. With expertise spanning <em>UI/UX design, web development, and brand identity</em>, I transform ideas into elegant, functional solutions that resonate with users.
        </p>
        <p style="font-size: 1rem; color: var(--text-muted); margin-bottom: 1.5rem;">
          My approach combines <strong>strategic thinking</strong> with <em>meticulous attention to detail</em>. I believe in creating not just visually appealing interfaces, but intuitive experiences that guide users effortlessly toward their goals. Every project is an opportunity to push creative boundaries while maintaining accessibility and performance.
        </p>
        <p style="font-size: 1rem; color: var(--text-muted);">
          Explore my featured projects below to see how I blend <strong>innovation, design thinking, and technical expertise</strong> to deliver impactful digital solutions.
        </p>
      </div>
    </div>
  </div>

  <section class="portfolio">
    <div class="container">
      <h2>Featured Projects</h2>
      <div class="portfolio-grid">
        <div class="portfolio-item">
          <div class="portfolio-image" style="font-size: 0; position: relative; background: linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.1));"></div>
          <div class="portfolio-content">
            <h3>E-Commerce Platform</h3>
            <p>Designed and developed a modern e-commerce platform with seamless user experience, product filtering, and secure checkout flow. Increased conversion rates through intuitive navigation.</p>
            <div class="portfolio-tags">
              <span class="tag">Design</span>
              <span class="tag">Development</span>
              <span class="tag">2024</span>
            </div>
          </div>
        </div>

        <div class="portfolio-item">
          <div class="portfolio-image" style="font-size: 0; position: relative; background: linear-gradient(135deg, rgba(0,0,0,0.15), rgba(0,0,0,0.05));"></div>
          <div class="portfolio-content">
            <h3>Analytics Dashboard</h3>
            <p>Built an interactive analytics dashboard enabling real-time data visualization with customizable widgets. Implemented complex data processing and responsive design for all device sizes.</p>
            <div class="portfolio-tags">
              <span class="tag">Development</span>
              <span class="tag">UI/UX</span>
              <span class="tag">2024</span>
            </div>
          </div>
        </div>

        <div class="portfolio-item">
          <div class="portfolio-image" style="font-size: 0; position: relative; background: linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2));"></div>
          <div class="portfolio-content">
            <h3>Mobile Travel App</h3>
            <p>Created a comprehensive mobile application for travel planning with map integration, itinerary management, and social features. Launched successfully on iOS and Android platforms.</p>
            <div class="portfolio-tags">
              <span class="tag">Mobile</span>
              <span class="tag">Design</span>
              <span class="tag">2023</span>
            </div>
          </div>
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
