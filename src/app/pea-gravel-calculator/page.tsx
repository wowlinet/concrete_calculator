import Link from "next/link";
import { Calculator, Building2, Check, Mountain, Ruler, Target, Clock, Boxes } from "lucide-react";
import GravelCalculator from "@/components/gravel-calculator";
import SlabFAQItem from "@/components/slab-faq-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pea Gravel Calculator – Estimate Coverage, Depth & Tons Needed",
  description: "Use our pea gravel calculator to find out how many tons or yards you'll need for patios, walkways, or landscaping projects.",
  keywords: "pea gravel calculator, pea stone calculator, pea gravel estimator, pea gravel coverage calculator, pea gravel cost calculator, how much pea gravel do i need",
  openGraph: {
    title: "Pea Gravel Calculator – Estimate Coverage, Depth & Tons Needed",
    description: "Use our pea gravel calculator to find out how many tons or yards you'll need for patios, walkways, or landscaping projects.",
    type: "website",
  },
  alternates: {
    canonical: "/pea-gravel-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pea Gravel Calculator – Estimate Coverage, Depth & Tons Needed",
    description: "Use our pea gravel calculator to find out how many tons or yards you'll need for patios, walkways, or landscaping projects.",
  },
};

export default function PeaGravelCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Pea Gravel Calculator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Professional pea gravel calculator for accurate quantity estimation. Calculate volume, weight, and cost for patios, walkways, and landscaping projects
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Mountain className="h-4 w-4 text-primary" />
              <span>Patios</span>
            </div>
            <div className="flex items-center space-x-2">
              <Boxes className="h-4 w-4 text-primary" />
              <span>Walkways</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Landscaping</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pea Gravel Calculator Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <GravelCalculator defaultGravelType="pea-gravel" />
        </div>
      </section>

      {/* Why Use Our Pea Gravel Calculator Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Why Use Our Pea Gravel Calculator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Pea Gravel Specific</span>
                <span className="text-muted-foreground"> – Pre-configured density for pea gravel (1788 kg/m³)</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Accurate Weight Calculations</span>
                <span className="text-muted-foreground"> – Calculate exact weight in tons and kilograms for pea gravel</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Volume in Multiple Units</span>
                <span className="text-muted-foreground"> – See results in cubic meters, cubic yards, and cubic feet</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Waste Factor Included</span>
                <span className="text-muted-foreground"> – Add extra material for spillage, compaction, and uneven surfaces</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Cost Estimation</span>
                <span className="text-muted-foreground"> – Calculate total project cost with local pricing per ton</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Calculate Pea Gravel Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            How to Calculate Pea Gravel Quantity
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Follow these simple steps to calculate pea gravel for your project:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">1</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Measure Area Dimensions</span>
                <span className="text-muted-foreground"> – Length, width, and desired depth of coverage</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">2</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Pea Gravel Selected</span>
                <span className="text-muted-foreground"> – Pre-configured with pea gravel density</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">3</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Add Waste Factor</span>
                <span className="text-muted-foreground"> – Include 5-15% extra for compaction and spillage</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">4</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Get Instant Results</span>
                <span className="text-muted-foreground"> – Volume, weight, and cost breakdown in multiple units</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pea Gravel Applications Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Common Pea Gravel Applications
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-lg mb-6 mx-auto">
                <Mountain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Patios
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Pea gravel creates attractive, permeable patios with excellent drainage. Ideal depth: 2-4 inches.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Coverage:</strong> Smooth, decorative surface
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Boxes className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Walkways & Paths
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Soft underfoot and visually appealing for garden paths and walkways. Typical depth: 2-3 inches.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Coverage:</strong> Comfortable walking surface
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-lg mb-6 mx-auto">
                <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Landscaping & Gardens
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Ground cover, mulch alternative, and decorative accents around plants. Depth: 2-4 inches.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Coverage:</strong> Decorative and functional
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Pea Gravel Calculator Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6 mx-auto">
                <Ruler className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Flexible Units
              </h3>
              <p className="text-muted-foreground text-center">
                Input dimensions in feet, inches, yards, meters, or centimeters with automatic conversion.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Pea Gravel Optimized
              </h3>
              <p className="text-muted-foreground text-center">
                Pre-configured with accurate pea gravel density for precise weight calculations.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-lg mb-6 mx-auto">
                <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Instant Estimates
              </h3>
              <p className="text-muted-foreground text-center">
                Get immediate volume, weight, and cost calculations with detailed breakdown.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pea Gravel FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Pea Gravel Calculator FAQ
          </h2>
          <div className="space-y-4">
            <SlabFAQItem
              question="How much pea gravel do I need for my patio?"
              answer="For a standard patio, calculate length × width × depth (typically 2-4 inches). For example, a 12ft × 10ft patio at 3 inches deep requires approximately 1.1 cubic yards (about 2 tons) of pea gravel."
            />
            <SlabFAQItem
              question="What size is pea gravel?"
              answer="Pea gravel consists of small, rounded stones typically 1/4 to 1/2 inch in diameter. The smooth, pea-sized stones are comfortable to walk on and create an attractive, natural appearance."
            />
            <SlabFAQItem
              question="How deep should pea gravel be for a walkway?"
              answer="For walkways, pea gravel should be 2-3 inches deep. This provides adequate coverage while remaining comfortable to walk on. For patios and play areas, 3-4 inches is recommended for better stability."
            />
            <SlabFAQItem
              question="How much does a yard of pea gravel weigh?"
              answer="Pea gravel weighs approximately 2,400-2,600 lbs per cubic yard (1.2-1.3 tons). This calculator uses a density of 1788 kg/m³ (approximately 2,340 lbs per cubic yard) for accurate estimates."
            />
            <SlabFAQItem
              question="What should I put under pea gravel?"
              answer="Use landscape fabric or weed barrier to prevent weed growth, then add a 2-3 inch base layer of crushed stone for drainage and stability. This prevents pea gravel from sinking into soil and provides better long-term performance."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center bg-card rounded-2xl shadow-xl p-12">
          <Mountain className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Calculate Your Pea Gravel Needs Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get accurate pea gravel calculations for your patio, walkway, or landscaping project. Our calculator provides precise volume, weight, and cost estimates specifically optimized for pea gravel.
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
