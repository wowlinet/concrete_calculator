import Link from "next/link";
import { Calculator, Building2, Check, Square, Layers, Ruler, Target, Clock, Anchor } from "lucide-react";
import FootingCalculator from "@/components/footing-calculator";
import SlabFAQItem from "@/components/slab-faq-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Footing Calculator - Calculate Volume, Materials & Cost for Footings",
  description: "Professional concrete footing calculator for accurate volume, material quantities and cost estimation. Calculate concrete needs for foundation footings, column footings, and more. Free online tool.",
  keywords: "concrete footing calculator, footing calculator, foundation footing calculator, column footing calculator, concrete footer calculator, footing volume calculator, footing cost calculator",
  openGraph: {
    title: "Concrete Footing Calculator - Calculate Volume, Materials & Cost for Footings",
    description: "Professional concrete footing calculator for accurate volume, material quantities and cost estimation. Calculate concrete needs for foundation footings, column footings, and more. Free online tool.",
    type: "website",
  },
  alternates: {
    canonical: "/footing-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Footing Calculator - Calculate Volume, Materials & Cost for Footings",
    description: "Professional concrete footing calculator for accurate volume, material quantities and cost estimation. Calculate concrete needs for foundation footings, column footings, and more. Free online tool.",
  },
};

export default function FootingCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Concrete Footing Calculator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Professional footing calculator for accurate concrete volume, material quantities and cost estimation for foundation and column footings
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Anchor className="h-4 w-4 text-primary" />
              <span>Foundation Footings</span>
            </div>
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4 text-primary" />
              <span>Column Footings</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Wall Footings</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footing Calculator Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <FootingCalculator />
        </div>
      </section>

      {/* Why Use Our Footing Calculator Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Why Use Our Footing Calculator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Footing-Specific Calculations</span>
                <span className="text-muted-foreground"> – Optimized for foundation, column, and wall footing dimensions</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Depth Recommendations</span>
                <span className="text-muted-foreground"> – Get guidance on appropriate footing depth for different applications</span>
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

      {/* How to Calculate Footing Concrete Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            How to Calculate Footing Concrete
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Follow these simple steps to calculate concrete for your footing project:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">1</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Measure Footing Dimensions</span>
                <span className="text-muted-foreground"> – Length, width, and depth for rectangular footings</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">2</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Choose Measurement Units</span>
                <span className="text-muted-foreground"> – Metric (meters/centimeters) or Imperial (feet/inches)</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">3</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Select Concrete Grade</span>
                <span className="text-muted-foreground"> – Choose appropriate strength (C25, C30, C35, etc.)</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">4</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Get Instant Results</span>
                <span className="text-muted-foreground"> – Volume, material quantities, and cost breakdown</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footing Types Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Common Footing Applications
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-lg mb-6 mx-auto">
                <Anchor className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Foundation Footings
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Continuous strip footings for building foundations and load-bearing walls.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Recommended depth:</strong> 20-30cm (8-12 inches)
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Layers className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Column Footings
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Isolated pad footings supporting individual columns or posts.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Recommended depth:</strong> 30-45cm (12-18 inches)
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-lg mb-6 mx-auto">
                <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Wall Footings
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Footings for retaining walls, boundary walls, and non-load bearing structures.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Recommended depth:</strong> 20-25cm (8-10 inches)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Footing Calculator Features
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
                Input exact footing dimensions with support for both metric and imperial units.
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
                Get precise concrete volume calculations based on standard footing formulas.
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

      {/* Footing FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Footing Calculator FAQ
          </h2>
          <div className="space-y-4">
            <SlabFAQItem
              question="How deep should concrete footings be?"
              answer="Footing depth depends on soil conditions, frost line, and building codes. Typical depths: residential footings 8-12 inches (20-30cm), commercial footings 12-18 inches (30-45cm). Always check local building codes and consider frost depth in your area."
            />
            <SlabFAQItem
              question="How do I calculate concrete for footings?"
              answer="For rectangular footings: multiply length × width × depth. For example: 20ft × 2ft × 1ft = 40 cubic feet or 1.48 cubic yards. Our calculator handles the conversion automatically."
            />
            <SlabFAQItem
              question="What concrete grade should I use for footings?"
              answer="C25 (3000 PSI) is suitable for most residential footings. Use C30 (3500 PSI) or higher for commercial footings or areas with heavy loads. Always consult with a structural engineer for specific requirements."
            />
            <SlabFAQItem
              question="Do footings need reinforcement?"
              answer="Most footings require reinforcement. Use rebar or wire mesh for added strength, especially for wider footings or those supporting heavy loads. Check local codes for specific requirements."
            />
            <SlabFAQItem
              question="How much extra concrete should I order for footings?"
              answer="Order 5-10% extra concrete to account for waste, spillage, and slight variations in excavation depth. This calculator helps you get the base amount needed."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center bg-card rounded-2xl shadow-xl p-12">
          <Anchor className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Calculate Your Footing Concrete Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get accurate concrete calculations for your footing project. Whether it&apos;s foundation footings, column footings, or wall footings, our calculator provides precise volume, material, and cost estimates.
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
