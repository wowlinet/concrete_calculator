import Link from "next/link";
import { Calculator, Building2, Check, Grid3x3, Ruler, Target, Clock, Blocks } from "lucide-react";
import BlockCalculator from "@/components/block-calculator";
import BlockFAQItem from "@/components/block-faq-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Block Calculator – Estimate Blocks, Mortar & Fill Easily",
  description: "Use our free concrete block calculator to quickly estimate the number of blocks, mortar, and fill needed for your wall project. Accurate, simple, and fast!",
  keywords: "concrete block calculator, cinder block calculator, block wall calculator, masonry calculator, CMU calculator, block quantity calculator, mortar calculator, concrete block estimation",
  openGraph: {
    title: "Concrete Block Calculator – Estimate Blocks, Mortar & Fill Easily",
    description: "Use our free concrete block calculator to quickly estimate the number of blocks, mortar, and fill needed for your wall project. Accurate, simple, and fast!",
    type: "website",
  },
  alternates: {
    canonical: "/block-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Block Calculator – Estimate Blocks, Mortar & Fill Easily",
    description: "Use our free concrete block calculator to quickly estimate the number of blocks, mortar, and fill needed for your wall project. Accurate, simple, and fast!",
  },
};

export default function BlockCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Concrete Block Calculator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Professional block calculator for accurate block quantities, mortar volume and cost estimation for all types of concrete block walls
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Blocks className="h-4 w-4 text-primary" />
              <span>Block Walls</span>
            </div>
            <div className="flex items-center space-x-2">
              <Grid3x3 className="h-4 w-4 text-primary" />
              <span>Fences</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Retaining Walls</span>
            </div>
          </div>
        </div>
      </section>

      {/* Block Calculator Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <BlockCalculator />
        </div>
      </section>

      {/* Why Use Our Block Calculator Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Why Use Our Block Calculator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Block-Specific Calculations</span>
                <span className="text-muted-foreground"> – Optimized for standard and custom block sizes</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Mortar Calculations</span>
                <span className="text-muted-foreground"> – Automatic mortar volume calculation for joints</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Material Breakdown</span>
                <span className="text-muted-foreground"> – Detailed block count, mortar, cement, and sand quantities</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Cost Estimation</span>
                <span className="text-muted-foreground"> – Calculate total project cost with local pricing</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Multiple Units</span>
                <span className="text-muted-foreground"> – Support for both metric (meters) and imperial (feet) measurements</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Calculate Block Concrete Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            How to Calculate Concrete Blocks
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Follow these simple steps to calculate blocks for your wall project:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">1</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Measure Wall Dimensions</span>
                <span className="text-muted-foreground"> – Length and height of the wall</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">2</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Choose Block Size</span>
                <span className="text-muted-foreground"> – Standard (40×20×20cm) or custom dimensions</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">3</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Select Mortar Joint Thickness</span>
                <span className="text-muted-foreground"> – Typically 10mm (standard) or custom</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">4</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Get Instant Results</span>
                <span className="text-muted-foreground"> – Block count, mortar volume, and cost breakdown</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block Types Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Common Block Wall Applications
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-lg mb-6 mx-auto">
                <Blocks className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Block Walls
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Standard concrete block walls for residential and commercial buildings, both interior and exterior.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Common block size:</strong> 40×20×20cm (16×8×8 inches)
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Grid3x3 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Fences
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Concrete block fences for privacy and security. Durable and low-maintenance solution.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Common block size:</strong> 40×20×20cm (16×8×8 inches)
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-lg mb-6 mx-auto">
                <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Retaining Walls
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Structural walls designed to hold back soil and create level areas in sloped terrain.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Common block size:</strong> 40×20×20cm (16×8×8 inches)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Block Calculator Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6 mx-auto">
                <Ruler className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Precise Measurements
              </h3>
              <p className="text-muted-foreground text-center">
                Input exact wall dimensions and block sizes with support for both metric and imperial units.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Accurate Calculations
              </h3>
              <p className="text-muted-foreground text-center">
                Get precise block count and mortar calculations accounting for joints and waste.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-lg mb-6 mx-auto">
                <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Instant Results
              </h3>
              <p className="text-muted-foreground text-center">
                Get immediate calculations with detailed material breakdown and cost estimates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Block FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Block Calculator FAQ
          </h2>
          <div className="space-y-4">
            <BlockFAQItem
              question="What is the standard concrete block size?"
              answer="The most common concrete block size is 40×20×20cm (16×8×8 inches) in metric/imperial. However, blocks come in various sizes including 39×19×19cm, 20×20×40cm, and custom dimensions."
            />
            <BlockFAQItem
              question="How do I calculate blocks needed for a wall?"
              answer="Calculate the wall area (length × height), then divide by the block face area including mortar joints. For example: a 10m × 3m wall = 30m². With standard blocks (0.41m × 0.21m including joints) = 30 ÷ 0.086 ≈ 349 blocks."
            />
            <BlockFAQItem
              question="How much mortar do I need for block walls?"
              answer="Mortar volume depends on joint thickness (typically 10mm) and block size. Our calculator automatically determines mortar volume based on your wall dimensions and block specifications."
            />
            <BlockFAQItem
              question="What is the mortar mix ratio for block laying?"
              answer="Common mortar mix ratio is 1:6 (cement:sand) for general block work, or 1:4 for stronger joints. The exact ratio depends on the application and local building codes."
            />
            <BlockFAQItem
              question="How much extra blocks should I order?"
              answer="Order 5-10% extra blocks to account for breakage, cutting, and waste. This calculator helps you get the base quantity needed for your wall."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center bg-card rounded-2xl shadow-xl p-12">
          <Building2 className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Calculate Your Block Wall Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get accurate block calculations for your wall project. Whether it&apos;s a garden wall, fence, or building foundation, our calculator provides precise block count, mortar volume, and cost estimates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Calculator className="mr-2 h-5 w-5" />
              General Calculator
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Building2 className="mr-2 h-5 w-5" />
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
