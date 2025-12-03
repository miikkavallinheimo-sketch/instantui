import type { CSSProperties } from "react";
import type { DesignState } from "../lib/types";

interface PreviewLandingProps {
  designState: DesignState;
}

const sizeMap = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
} as const;

const PreviewLanding = ({ designState }: PreviewLandingProps) => {
  const { colors, fontPair, typography } = designState;

  const features = [
    {
      title: "Fast & Responsive",
      description: "Built for speed with optimized performance across all devices.",
    },
    {
      title: "Beautiful Design",
      description: "Carefully crafted visual hierarchy and color system.",
    },
    {
      title: "Accessible",
      description: "WCAG compliant with proper contrast and semantic HTML.",
    },
    {
      title: "Developer Friendly",
      description: "Clean code, well-documented, and easy to customize.",
    },
    {
      title: "Production Ready",
      description: "Battle-tested components ready for real-world use.",
    },
    {
      title: "Future Proof",
      description: "Built with modern standards and best practices.",
    },
  ];

  const rootStyle: CSSProperties = {
    backgroundColor: colors.background,
    color: colors.text,
  } as React.CSSProperties;

  return (
    <div className="w-full" style={rootStyle}>
      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 text-center space-y-6">
        <div
          style={{
            fontFamily: fontPair.heading,
            fontSize: sizeMap[typography.heading.size],
            fontWeight: typography.heading.weight,
            fontStyle: typography.heading.style,
            color: colors.text,
          }}
          className="max-w-3xl mx-auto"
        >
          Design Beautiful Products Faster
        </div>

        <p
          style={{
            fontFamily: fontPair.body,
            fontSize: sizeMap[typography.body.size],
            fontWeight: typography.body.weight,
            color: colors.textMuted,
          }}
          className="max-w-2xl mx-auto text-lg"
        >
          A comprehensive design system with pre-built components and thoughtful
          defaults. Start your next project with confidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            className="px-6 py-3 rounded-lg font-semibold"
            style={{
              backgroundColor: colors.primary,
              color: colors.onPrimary,
              fontFamily: fontPair.heading,
            }}
          >
            Get Started
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold border"
            style={{
              borderColor: colors.borderSubtle,
              color: colors.text,
              fontFamily: fontPair.heading,
              backgroundColor: "transparent",
            }}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 md:py-24">
        <div
          style={{
            fontFamily: fontPair.heading,
            fontSize: sizeMap[typography.subheading?.size ?? "xl"],
            fontWeight: typography.subheading?.weight ?? 600,
            color: colors.text,
          }}
          className="text-center mb-12"
        >
          Why Choose Us
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.borderSubtle,
              }}
            >
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap["lg"],
                  fontWeight: 600,
                  color: colors.text,
                }}
                className="mb-3"
              >
                {feature.title}
              </div>
              <p
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap[typography.body.size],
                  color: colors.textMuted,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="px-6 py-16 md:py-24 text-center"
        style={{ backgroundColor: colors.primary }}
      >
        <div
          style={{
            fontFamily: fontPair.heading,
            fontSize: sizeMap[typography.heading.size],
            fontWeight: typography.heading.weight,
            color: colors.onPrimary,
          }}
          className="max-w-2xl mx-auto mb-4"
        >
          Ready to Build Something Great?
        </div>
        <p
          style={{
            fontFamily: fontPair.body,
            fontSize: sizeMap[typography.body.size],
            color: `${colors.onPrimary}dd`,
          }}
          className="max-w-xl mx-auto mb-8"
        >
          Start with Elementry today and accelerate your design workflow.
        </p>
        <button
          className="px-6 py-3 rounded-lg font-semibold"
          style={{
            backgroundColor: colors.onPrimary,
            color: colors.primary,
            fontFamily: fontPair.heading,
          }}
        >
          Start Free
        </button>
      </section>
    </div>
  );
};

export default PreviewLanding;
