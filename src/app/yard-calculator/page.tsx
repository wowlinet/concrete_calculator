import Link from "next/link";
import { Calculator, Building2, Check, Square, Layers, Ruler, Target, Clock } from "lucide-react";
import YardCalculator from "@/components/yard-calculator";
import SlabFAQItem from "@/components/slab-faq-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Yard Calculator - Calculate Volume, Materials & Cost in Yards",
  description: "Professional concrete yard calculator for accurate volume, material quantities and cost estimation. Calculate concrete needs in cubic yards for construction projects. Free online tool.",
  keywords: "concrete yard calculator, cubic yard calculator, concrete calculator yards, yard calculator concrete, concrete volume calculator yards, concrete cost calculator yards, concrete estimation yards",
  openGraph: {
    title: "Concrete Yard Calculator - Calculate Volume, Materials & Cost in Yards",
    description: "Professional concrete yard calculator for accurate volume, material quantities and cost estimation. Calculate concrete needs in cubic yards for construction projects. Free online tool.",
    type: "website",
  },
  alternates: {
    canonical: "/yard-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Yard Calculator - Calculate Volume, Materials & Cost in Yards",
    description: "Professional concrete yard calculator for accurate volume, material quantities and cost estimation. Calculate concrete needs in cubic yards for construction projects. Free online tool.",
  },
};

export default function YardCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Concrete Yard Calculator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Professional yard calculator for accurate concrete volume, material quantities and cost estimation measured in cubic yards
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Square className="h-4 w-4 text-primary" />
              <span>Cubic Yards</span>
            </div>
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4 text-primary" />
              <span>Yard Measurements</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span>All Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* Yard Calculator Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <YardCalculator />
        </div>
      </section>

      {/* Why Use Our Yard Calculator Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Why Use Our Yard Calculator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Yard-Based Calculations</span>
                <span className="text-muted-foreground"> – Default measurements in yards for convenient project planning</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Cubic Yard Results</span>
                <span className="text-muted-foreground"> – Get instant cubic yard calculations for ordering concrete</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Material Breakdown</span>
                <span className="text-muted-foreground"> – Detailed cement, sand, gravel, and water quantities</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Cost Estimation</span>
                <span className="text-muted-foreground"> – Calculate total project cost per cubic yard</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Multiple Units</span>
                <span className="text-muted-foreground"> – Support for yards, feet, inches, and metric measurements</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Calculate Concrete in Yards Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            How to Calculate Concrete in Yards
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Follow these simple steps to calculate concrete for your project in cubic yards:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">1</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Measure Project Dimensions</span>
                <span className="text-muted-foreground"> – Enter length, width, and height in yards or other units</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">2</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Choose Measurement Units</span>
                <span className="text-muted-foreground"> – Select yards, feet, inches, or metric units for each dimension</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">3</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Select Concrete Grade</span>
                <span className="text-muted-foreground"> – Choose appropriate strength (C20, C25, C30, etc.)</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">4</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Get Results in Cubic Yards</span>
                <span className="text-muted-foreground"> – Volume in cubic yards, material quantities, and cost breakdown</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yard Applications Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Common Applications Using Yards
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-lg mb-6 mx-auto">
                <Square className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Large Slabs
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Calculate concrete for large commercial and industrial slabs measured in yards.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Typical size:</strong> 10+ yards length
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Layers className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Foundations
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Foundation projects often use yard measurements for large-scale calculations.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Common for:</strong> Commercial buildings
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-lg mb-6 mx-auto">
                <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Driveways & Parking
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Large driveways and parking areas are typically measured in yards.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Ideal for:</strong> Multi-vehicle areas
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Yard Calculator Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6 mx-auto">
                <Ruler className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Yard-Based Input
              </h3>
              <p className="text-muted-foreground text-center">
                Input dimensions in yards by default, or choose from feet, inches, and metric units.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Cubic Yard Results
              </h3>
              <p className="text-muted-foreground text-center">
                Get precise cubic yard calculations perfect for ordering ready-mix concrete.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-lg mb-6 mx-auto">
                <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Instant Calculations
              </h3>
              <p className="text-muted-foreground text-center">
                Get immediate calculations with detailed material breakdown and cost estimates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Yard Calculator FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Yard Calculator FAQ
          </h2>
          <div className="space-y-4">
            <SlabFAQItem
              question="How do I calculate cubic yards of concrete?"
              answer="To calculate cubic yards, multiply length × width × height (all in yards). For example: 10 yards × 5 yards × 0.111 yards (4 inches) = 5.55 cubic yards. Our calculator handles the conversion automatically."
            />
            <SlabFAQItem
              question="Why use yards instead of feet for concrete?"
              answer="Concrete is typically sold by the cubic yard. Using yards simplifies ordering from ready-mix suppliers, as you can directly use the calculated cubic yards when placing orders."
            />
            <SlabFAQItem
              question="How many bags of concrete equal one cubic yard?"
              answer="Approximately 45 bags of 80-lb concrete mix or 60 bags of 60-lb mix equal one cubic yard. For large projects over 1 cubic yard, ready-mix concrete is more economical."
            />
            <SlabFAQItem
              question="What's the difference between cubic feet and cubic yards?"
              answer="One cubic yard equals 27 cubic feet (3ft × 3ft × 3ft = 27 ft³). Our calculator displays results in both units for convenience."
            />
            <SlabFAQItem
              question="How much should I add to my cubic yard calculation?"
              answer="Order 5-10% extra concrete to account for waste, spillage, and slight variations. Use the Reserve Volume field in our calculator to add this buffer automatically."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center bg-card rounded-2xl shadow-xl p-12">
          <Building2 className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Calculate Your Concrete in Yards Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get accurate concrete calculations in cubic yards for your project. Whether it&apos;s a large slab, foundation, or driveway, our yard calculator provides precise volume, material, and cost estimates.
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
