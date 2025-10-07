import Link from "next/link";
import { Calculator, Building2, Shield, Check, Square, Layers, Ruler, Target, Clock } from "lucide-react";
import SlabCalculator from "@/components/slab-calculator";
import SlabFAQItem from "@/components/slab-faq-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Slab Calculator - Calculate Volume, Materials & Cost for Slabs",
  description: "Professional concrete slab calculator for accurate volume, material quantities and cost estimation. Calculate concrete needs for floor slabs, garage slabs, basement slabs, and more. Free online tool.",
  keywords: "concrete slab calculator, slab volume calculator, concrete slab cost calculator, floor slab calculator, garage slab calculator, basement slab calculator, slab thickness calculator, concrete estimation",
  openGraph: {
    title: "Concrete Slab Calculator - Calculate Volume, Materials & Cost for Slabs",
    description: "Professional concrete slab calculator for accurate volume, material quantities and cost estimation. Calculate concrete needs for floor slabs, garage slabs, basement slabs, and more. Free online tool.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Slab Calculator - Calculate Volume, Materials & Cost for Slabs",
    description: "Professional concrete slab calculator for accurate volume, material quantities and cost estimation. Calculate concrete needs for floor slabs, garage slabs, basement slabs, and more. Free online tool.",
  },
};

export default function SlabCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Concrete Slab Calculator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Professional slab calculator for accurate concrete volume, material quantities and cost estimation for all types of concrete slabs
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Square className="h-4 w-4 text-primary" />
              <span>Floor Slabs</span>
            </div>
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4 text-primary" />
              <span>Garage Slabs</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Basement Slabs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Slab Calculator Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <SlabCalculator />
        </div>
      </section>

      {/* Why Use Our Slab Calculator Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Why Use Our Slab Calculator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Slab-Specific Calculations</span>
                <span className="text-muted-foreground"> – Optimized for rectangular slab dimensions and thickness</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Thickness Recommendations</span>
                <span className="text-muted-foreground"> – Get guidance on appropriate slab thickness for different applications</span>
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

      {/* How to Calculate Slab Concrete Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            How to Calculate Slab Concrete
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Follow these simple steps to calculate concrete for your slab project:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">1</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Measure Slab Dimensions</span>
                <span className="text-muted-foreground"> – Length, width, and desired thickness</span>
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
                <span className="text-muted-foreground"> – Choose appropriate strength (C20, C25, C30, etc.)</span>
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

      {/* Slab Types Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Common Slab Applications
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-lg mb-6 mx-auto">
                <Square className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Floor Slabs
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Ground floor slabs for residential and commercial buildings. Typically 4-6 inches thick.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Recommended thickness:</strong> 10-15cm (4-6 inches)
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Layers className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Garage Slabs
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Heavy-duty slabs designed to support vehicle loads. Requires thicker concrete.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Recommended thickness:</strong> 15-20cm (6-8 inches)
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-lg mb-6 mx-auto">
                <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Basement Slabs
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Foundation slabs for basements and below-grade applications with moisture considerations.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Recommended thickness:</strong> 10-15cm (4-6 inches)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Slab Calculator Features
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
                Input exact slab dimensions with support for both metric and imperial units.
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
                Get precise concrete volume calculations based on standard slab formulas.
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

      {/* Slab FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Slab Calculator FAQ
          </h2>
          <div className="space-y-4">
            <SlabFAQItem 
              question="What thickness should my concrete slab be?"
              answer="Slab thickness depends on the application: 4-6 inches (10-15cm) for residential floors, 6-8 inches (15-20cm) for garages and driveways, and 4-6 inches (10-15cm) for basement slabs. Always consult local building codes."
            />
            <SlabFAQItem 
              question="How do I calculate concrete volume for a slab?"
              answer="Multiply length × width × thickness to get volume. For example: 10ft × 12ft × 0.33ft (4 inches) = 39.6 cubic feet or 1.47 cubic yards."
            />
            <SlabFAQItem 
              question="What concrete grade should I use for slabs?"
              answer="C25 (3000 PSI) is suitable for most residential slabs. Use C30 (3500 PSI) or higher for heavy-duty applications like garage slabs or commercial floors."
            />
            <SlabFAQItem 
              question="Do I need reinforcement in my slab?"
              answer="Most slabs benefit from reinforcement. Use wire mesh or rebar for added strength, especially for larger slabs or those subject to heavy loads."
            />
            <SlabFAQItem 
              question="How much extra concrete should I order?"
              answer="Order 5-10% extra concrete to account for waste, spillage, and slight variations in thickness. This calculator helps you get the base amount needed."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center bg-card rounded-2xl shadow-xl p-12">
          <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Calculate Your Slab Concrete Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get accurate concrete calculations for your slab project. Whether it&apos;s a garage floor, basement slab, or building foundation, our calculator provides precise volume, material, and cost estimates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
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