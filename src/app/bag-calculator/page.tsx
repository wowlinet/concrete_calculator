import Link from "next/link";
import { Calculator, Building2, Check, Square, Layers, Ruler, Target, Clock, Package } from "lucide-react";
import BagCalculator from "@/components/bag-calculator";
import SlabFAQItem from "@/components/slab-faq-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Bag Calculator - Calculate Bags Needed for Your Project",
  description: "Professional concrete bag calculator to determine how many 60-lb or 80-lb bags of concrete you need. Calculate concrete bags for slabs, footings, walls, and more. Free online tool.",
  keywords: "concrete bag calculator, bags of concrete calculator, how many bags of concrete, 60 lb bag calculator, 80 lb bag calculator, concrete bags needed, quikrete bag calculator, sakrete bag calculator",
  openGraph: {
    title: "Concrete Bag Calculator - Calculate Bags Needed for Your Project",
    description: "Professional concrete bag calculator to determine how many 60-lb or 80-lb bags of concrete you need. Calculate concrete bags for slabs, footings, walls, and more. Free online tool.",
    type: "website",
  },
  alternates: {
    canonical: "/bag-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Bag Calculator - Calculate Bags Needed for Your Project",
    description: "Professional concrete bag calculator to determine how many 60-lb or 80-lb bags of concrete you need. Calculate concrete bags for slabs, footings, walls, and more. Free online tool.",
  },
};

export default function BagCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Concrete Bag Calculator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Calculate how many bags of concrete you need for your project. Get accurate estimates for 60-lb and 80-lb bag quantities
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-primary" />
              <span>60-lb Bags</span>
            </div>
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-primary" />
              <span>80-lb Bags</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span>All Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bag Calculator Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <BagCalculator />
        </div>
      </section>

      {/* Why Use Our Bag Calculator Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Why Use Our Bag Calculator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Accurate Bag Counts</span>
                <span className="text-muted-foreground"> – Calculate exact number of 60-lb and 80-lb bags needed</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Cost Savings</span>
                <span className="text-muted-foreground"> – Buy the right amount and avoid waste or shortages</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Multiple Bag Sizes</span>
                <span className="text-muted-foreground"> – See calculations for both 60-lb and 80-lb bag options</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Volume Display</span>
                <span className="text-muted-foreground"> – View total concrete volume in cubic yards and cubic feet</span>
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
          </div>
        </div>
      </section>

      {/* How to Calculate Concrete Bags Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            How to Calculate Concrete Bags
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Follow these simple steps to calculate bags of concrete for your project:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">1</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Measure Your Project</span>
                <span className="text-muted-foreground"> – Enter length, width, and thickness/height dimensions</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">2</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Choose Your Units</span>
                <span className="text-muted-foreground"> – Select feet, inches, yards, or metric measurements</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">3</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Select Concrete Grade</span>
                <span className="text-muted-foreground"> – Choose appropriate strength for your application</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">4</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Get Bag Counts</span>
                <span className="text-muted-foreground"> – See how many 60-lb and 80-lb bags you need</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bag Sizes Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Common Concrete Bag Sizes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-lg mb-6 mx-auto">
                <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                60-lb Bags
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Standard size for small to medium projects. Easier to handle and transport.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Coverage:</strong> ~0.45 cubic feet per bag
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Package className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                80-lb Bags
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Most economical option for larger projects. More concrete per bag.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Coverage:</strong> ~0.60 cubic feet per bag
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-lg mb-6 mx-auto">
                <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Ready-Mix Alternative
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                For projects over 1 cubic yard, ready-mix concrete is more economical.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Threshold:</strong> ~45 bags (80-lb) = 1 yard
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Bag Calculator Features
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
                Input exact dimensions with support for feet, inches, yards, and metric units.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Accurate Bag Counts
              </h3>
              <p className="text-muted-foreground text-center">
                Get precise number of bags needed based on actual concrete density calculations.
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
                Get immediate calculations showing both 60-lb and 80-lb bag requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bag Calculator FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Bag Calculator FAQ
          </h2>
          <div className="space-y-4">
            <SlabFAQItem
              question="How many 80-lb bags of concrete do I need?"
              answer="Use our calculator to determine the exact number. As a general guide: 1 cubic yard requires approximately 45 bags of 80-lb concrete. For smaller projects, measure your area and multiply length × width × thickness to get volume in cubic feet, then divide by 0.6 (coverage per 80-lb bag)."
            />
            <SlabFAQItem
              question="How many 60-lb bags equal an 80-lb bag?"
              answer="One 80-lb bag covers about 0.6 cubic feet, while a 60-lb bag covers about 0.45 cubic feet. Therefore, you need approximately 1.33 bags of 60-lb concrete to equal one 80-lb bag."
            />
            <SlabFAQItem
              question="Which is better: 60-lb or 80-lb bags?"
              answer="80-lb bags are more economical for larger projects and provide more coverage per bag. 60-lb bags are easier to handle and better for small projects or situations where you need to carry bags longer distances. Our calculator shows both options so you can choose."
            />
            <SlabFAQItem
              question="How do I calculate bags needed for a slab?"
              answer="Measure length, width, and thickness of your slab. Enter these dimensions into our calculator, and it will instantly show how many 60-lb and 80-lb bags you need. Always add 5-10% extra for waste."
            />
            <SlabFAQItem
              question="When should I use ready-mix instead of bags?"
              answer="For projects requiring more than 1 cubic yard (about 45 bags of 80-lb concrete), ready-mix is typically more economical and convenient. Ready-mix also ensures better consistency and saves labor time."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center bg-card rounded-2xl shadow-xl p-12">
          <Package className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Calculate Your Concrete Bags Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get accurate bag calculations for your concrete project. Whether you need 60-lb or 80-lb bags, our calculator provides precise quantities to help you buy the right amount and avoid waste.
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
