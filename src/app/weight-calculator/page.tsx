import Link from "next/link";
import { Calculator, Building2, Check, Square, Layers, Ruler, Target, Clock, Weight } from "lucide-react";
import WeightCalculator from "@/components/weight-calculator";
import SlabFAQItem from "@/components/slab-faq-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Weight Calculator - Calculate Weight in Pounds & Kilograms",
  description: "Professional concrete weight calculator to estimate weight in pounds and kilograms. Calculate concrete weight for your project and determine material handling requirements. Free online tool.",
  keywords: "concrete weight calculator, weight of concrete calculator, concrete weight per cubic yard, concrete weight per cubic foot, how much does concrete weigh, concrete density calculator",
  openGraph: {
    title: "Concrete Weight Calculator - Calculate Weight in Pounds & Kilograms",
    description: "Professional concrete weight calculator to estimate weight in pounds and kilograms. Calculate concrete weight for your project and determine material handling requirements. Free online tool.",
    type: "website",
  },
  alternates: {
    canonical: "/weight-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Weight Calculator - Calculate Weight in Pounds & Kilograms",
    description: "Professional concrete weight calculator to estimate weight in pounds and kilograms. Calculate concrete weight for your project and determine material handling requirements. Free online tool.",
  },
};

export default function WeightCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Concrete Weight Calculator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Calculate accurate concrete weight in pounds and kilograms. Determine material weight for transport, structural load, and equipment planning
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Weight className="h-4 w-4 text-primary" />
              <span>Weight in Pounds</span>
            </div>
            <div className="flex items-center space-x-2">
              <Weight className="h-4 w-4 text-primary" />
              <span>Weight in Kilograms</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Load Planning</span>
            </div>
          </div>
        </div>
      </section>

      {/* Weight Calculator Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <WeightCalculator />
        </div>
      </section>

      {/* Why Use Our Weight Calculator Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Why Use Our Weight Calculator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Accurate Weight Estimates</span>
                <span className="text-muted-foreground"> – Calculate precise concrete weight based on standard density</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Transport Planning</span>
                <span className="text-muted-foreground"> – Determine vehicle capacity and number of loads needed</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Structural Load Analysis</span>
                <span className="text-muted-foreground"> – Calculate dead load for structural engineering requirements</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Equipment Sizing</span>
                <span className="text-muted-foreground"> – Determine crane capacity and lifting equipment needs</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Both Units Provided</span>
                <span className="text-muted-foreground"> – Get weight in both pounds (lbs) and kilograms (kg)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Calculate Concrete Weight Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            How to Calculate Concrete Weight
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Follow these simple steps to calculate concrete weight for your project:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">1</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Measure Project Dimensions</span>
                <span className="text-muted-foreground"> – Get length, width, and thickness measurements</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">2</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Calculate Volume</span>
                <span className="text-muted-foreground"> – Determine concrete volume in cubic feet or meters</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">3</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Apply Concrete Density</span>
                <span className="text-muted-foreground"> – Use standard density (133 lbs/ft³ or 2,130 kg/m³)</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">4</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Get Weight Results</span>
                <span className="text-muted-foreground"> – See total weight in both pounds and kilograms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weight References Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Concrete Weight References
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-lg mb-6 mx-auto">
                <Weight className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Per Cubic Yard
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                One cubic yard of standard concrete weighs approximately 3,600-4,000 pounds (1,630-1,815 kg).
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Density:</strong> ~4,000 lbs/yd³
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Weight className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Per Cubic Foot
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                One cubic foot of standard concrete weighs approximately 133-150 pounds (60-68 kg).
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Density:</strong> ~133 lbs/ft³
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-lg mb-6 mx-auto">
                <Weight className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Per Cubic Meter
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                One cubic meter of standard concrete weighs approximately 2,130-2,400 kg (4,695-5,290 lbs).
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Density:</strong> ~2,130 kg/m³
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Weight Calculator Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6 mx-auto">
                <Ruler className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Volume-Based Calculation
              </h3>
              <p className="text-muted-foreground text-center">
                Calculate weight based on accurate volume measurements and standard concrete density.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Dual Unit Display
              </h3>
              <p className="text-muted-foreground text-center">
                Get weight in both imperial (pounds) and metric (kilograms) units simultaneously.
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
                Get immediate weight calculations for transport and structural planning purposes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Weight Calculator FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Weight Calculator FAQ
          </h2>
          <div className="space-y-4">
            <SlabFAQItem
              question="How much does concrete weigh per cubic yard?"
              answer="Standard concrete weighs approximately 3,600-4,000 pounds per cubic yard (1,630-1,815 kg per 0.765 m³). The exact weight varies based on aggregate type, moisture content, and mix design. Our calculator uses 4,000 lbs/yd³ as the standard."
            />
            <SlabFAQItem
              question="How much does a cubic foot of concrete weigh?"
              answer="One cubic foot of standard concrete weighs approximately 133-150 pounds (60-68 kg). Our calculator uses 133 lbs/ft³ as the standard density, which equals 2,130 kg/m³ in metric units."
            />
            <SlabFAQItem
              question="Why do I need to know concrete weight?"
              answer="Concrete weight is critical for: transport vehicle capacity planning, crane and lifting equipment sizing, structural load calculations (dead load), foundation design, and safety considerations during construction. Knowing weight helps ensure proper equipment selection and safe handling."
            />
            <SlabFAQItem
              question="Does concrete weight vary by type?"
              answer="Yes, concrete weight varies: lightweight concrete (90-115 lbs/ft³), standard concrete (133-150 lbs/ft³), and heavyweight concrete (up to 300 lbs/ft³). Our calculator uses standard concrete density. For special concrete types, consult your concrete supplier for exact weights."
            />
            <SlabFAQItem
              question="How do I convert concrete weight from pounds to tons?"
              answer="Divide pounds by 2,000 to get short tons (US), or by 2,240 for long tons (UK). For metric, divide kilograms by 1,000 to get tonnes. For example: 4,000 lbs = 2 short tons, or 2,130 kg = 2.13 tonnes."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center bg-card rounded-2xl shadow-xl p-12">
          <Weight className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Calculate Your Concrete Weight Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get accurate weight calculations in pounds and kilograms for your concrete project. Essential for transport planning, equipment sizing, and structural load analysis. Start calculating now!
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
