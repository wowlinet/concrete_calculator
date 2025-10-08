import Link from "next/link";
import { Calculator, Building2, Check, Square, Layers, Ruler, Target, Clock, Box } from "lucide-react";
import VolumeCalculator from "@/components/volume-calculator";
import SlabFAQItem from "@/components/slab-faq-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Volume Calculator - Calculate Cubic Yards & Cubic Meters",
  description: "Professional concrete volume calculator to estimate cubic yards and cubic meters needed. Calculate concrete volume for slabs, footings, walls, and more. Free online tool.",
  keywords: "concrete volume calculator, cubic yard calculator, cubic meter calculator, concrete volume estimator, volume of concrete calculator, calculate concrete volume, concrete yardage calculator",
  openGraph: {
    title: "Concrete Volume Calculator - Calculate Cubic Yards & Cubic Meters",
    description: "Professional concrete volume calculator to estimate cubic yards and cubic meters needed. Calculate concrete volume for slabs, footings, walls, and more. Free online tool.",
    type: "website",
  },
  alternates: {
    canonical: "/volume-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Volume Calculator - Calculate Cubic Yards & Cubic Meters",
    description: "Professional concrete volume calculator to estimate cubic yards and cubic meters needed. Calculate concrete volume for slabs, footings, walls, and more. Free online tool.",
  },
};

export default function VolumeCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Concrete Volume Calculator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Calculate accurate concrete volume in cubic yards, cubic meters, and cubic feet. Get instant volume estimates for your construction project
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Box className="h-4 w-4 text-primary" />
              <span>Cubic Yards</span>
            </div>
            <div className="flex items-center space-x-2">
              <Box className="h-4 w-4 text-primary" />
              <span>Cubic Meters</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span>All Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* Volume Calculator Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <VolumeCalculator />
        </div>
      </section>

      {/* Why Use Our Volume Calculator Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Why Use Our Volume Calculator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Accurate Volume Calculations</span>
                <span className="text-muted-foreground"> – Get precise volume estimates in cubic yards, meters, and feet</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Multiple Unit Support</span>
                <span className="text-muted-foreground"> – Calculate in feet, inches, yards, meters, or centimeters</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Instant Conversions</span>
                <span className="text-muted-foreground"> – See volume in all units simultaneously for easy comparison</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Material Quantities</span>
                <span className="text-muted-foreground"> – Calculate cement, sand, gravel, and water amounts based on volume</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">All Project Types</span>
                <span className="text-muted-foreground"> – Works for slabs, footings, walls, driveways, and more</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Calculate Concrete Volume Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            How to Calculate Concrete Volume
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Follow these simple steps to calculate concrete volume for your project:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">1</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Measure Your Project</span>
                <span className="text-muted-foreground"> – Get length, width, and thickness/depth measurements</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">2</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Select Your Units</span>
                <span className="text-muted-foreground"> – Choose feet, inches, yards, meters, or centimeters</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">3</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Enter Dimensions</span>
                <span className="text-muted-foreground"> – Input your measurements into the calculator</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">4</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Get Volume Results</span>
                <span className="text-muted-foreground"> – See volume in cubic yards, cubic meters, and cubic feet</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volume Units Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Understanding Volume Units
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-lg mb-6 mx-auto">
                <Box className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Cubic Yards (yd³)
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Standard unit for ordering ready-mix concrete in the US. 1 cubic yard = 27 cubic feet.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Usage:</strong> Most common for concrete orders
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Box className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Cubic Meters (m³)
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Metric standard used internationally. 1 cubic meter = 35.31 cubic feet or 1.31 cubic yards.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Usage:</strong> International standard unit
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-lg mb-6 mx-auto">
                <Box className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Cubic Feet (ft³)
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Smaller unit often used for precise calculations. 27 cubic feet = 1 cubic yard.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Usage:</strong> Detailed measurements
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Volume Calculator Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6 mx-auto">
                <Ruler className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Flexible Measurements
              </h3>
              <p className="text-muted-foreground text-center">
                Input dimensions in any unit - feet, inches, yards, meters, or centimeters.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Precise Calculations
              </h3>
              <p className="text-muted-foreground text-center">
                Get accurate volume calculations with automatic unit conversions.
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
                Get immediate volume calculations in multiple units for easy reference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volume Calculator FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Volume Calculator FAQ
          </h2>
          <div className="space-y-4">
            <SlabFAQItem
              question="How do I calculate cubic yards of concrete?"
              answer="To calculate cubic yards, multiply length × width × depth (all in feet), then divide by 27. For example: 10ft × 10ft × 0.5ft = 50 cubic feet ÷ 27 = 1.85 cubic yards. Our calculator handles the conversion automatically."
            />
            <SlabFAQItem
              question="What's the difference between cubic yards and cubic meters?"
              answer="Cubic yards (yd³) is used in the US, while cubic meters (m³) is the metric standard. 1 cubic yard = 0.765 cubic meters, or 1 cubic meter = 1.308 cubic yards. Our calculator shows both units for convenience."
            />
            <SlabFAQItem
              question="How do I convert cubic feet to cubic yards?"
              answer="Divide cubic feet by 27 to get cubic yards. For example: 54 cubic feet ÷ 27 = 2 cubic yards. This is because 1 yard = 3 feet, and 3 × 3 × 3 = 27 cubic feet per cubic yard."
            />
            <SlabFAQItem
              question="Should I add extra volume to my calculation?"
              answer="Yes, order 5-10% extra concrete to account for waste, spillage, and slight variations. Use the Reserve Volume field in our calculator to automatically add this buffer to your volume estimate."
            />
            <SlabFAQItem
              question="How accurate is the volume calculator?"
              answer="Our calculator provides precise mathematical calculations based on your input dimensions. However, actual concrete needs may vary slightly due to ground conditions, forms, and other factors. Always verify measurements and consult professionals for critical projects."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center bg-card rounded-2xl shadow-xl p-12">
          <Box className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Calculate Your Concrete Volume Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get accurate volume calculations in cubic yards, cubic meters, and cubic feet. Perfect for ordering concrete and planning your construction project. Start calculating now!
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
