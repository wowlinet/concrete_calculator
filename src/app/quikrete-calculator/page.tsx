import Link from "next/link";
import { Calculator, Building2, Check, Square, Layers, Ruler, Target, Clock, Package } from "lucide-react";
import QuikreteCalculator from "@/components/quikrete-calculator";
import SlabFAQItem from "@/components/slab-faq-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quikrete Concrete Calculator - Calculate Bags & Volume for Quikrete Projects",
  description: "Professional Quikrete concrete calculator to determine bags needed and project volume. Calculate Quikrete requirements for slabs, footings, walls, and more. Free online tool.",
  keywords: "quikrete calculator, quikrete concrete calculator, quikrete bag calculator, how many bags of quikrete, quikrete volume calculator, quikrete estimator, concrete mix calculator",
  openGraph: {
    title: "Quikrete Calculator - Calculate Bags & Volume for Quikrete Projects",
    description: "Professional Quikrete concrete calculator to determine bags needed and project volume. Calculate Quikrete requirements for slabs, footings, walls, and more. Free online tool.",
    type: "website",
  },
  alternates: {
    canonical: "/quikrete-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quikrete Concrete Calculator - Calculate Bags & Volume for Quikrete Projects",
    description: "Professional Quikrete concrete calculator to determine bags needed and project volume. Calculate Quikrete requirements for slabs, footings, walls, and more. Free online tool.",
  },
};

export default function QuikreteCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Quikrete Concrete Calculator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Calculate how many bags of Quikrete concrete you need. Get accurate estimates for 60-lb and 80-lb Quikrete bags for your construction project
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-primary" />
              <span>Quikrete Bags</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calculator className="h-4 w-4 text-primary" />
              <span>Volume Estimation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span>All Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quikrete Calculator Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <QuikreteCalculator />
        </div>
      </section>

      {/* Why Use Our Quikrete Calculator Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Why Use Our Quikrete Calculator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Accurate Bag Counts</span>
                <span className="text-muted-foreground"> – Calculate exact number of Quikrete bags needed for your project</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Multiple Bag Sizes</span>
                <span className="text-muted-foreground"> – See estimates for both 60-lb and 80-lb Quikrete bags</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Volume Calculations</span>
                <span className="text-muted-foreground"> – Get precise volume in cubic yards, meters, and feet</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Cost Estimation</span>
                <span className="text-muted-foreground"> – Calculate total material cost for budgeting</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Easy to Use</span>
                <span className="text-muted-foreground"> – Simple interface designed for DIY and professional users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Calculate Quikrete Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            How to Calculate Quikrete Bags
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Follow these simple steps to calculate Quikrete bags for your project:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">1</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Measure Your Project</span>
                <span className="text-muted-foreground"> – Get length, width, and thickness measurements</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">2</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Calculate Volume</span>
                <span className="text-muted-foreground"> – Use our calculator to determine concrete volume needed</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">3</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Choose Bag Size</span>
                <span className="text-muted-foreground"> – Decide between 60-lb or 80-lb Quikrete bags</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">4</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Get Bag Count</span>
                <span className="text-muted-foreground"> – See exact number of Quikrete bags to purchase</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quikrete Products Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Common Quikrete Products
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-lg mb-6 mx-auto">
                <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Concrete Mix
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                General purpose concrete mix for foundations, slabs, and structural applications. 60-lb and 80-lb bags.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Coverage:</strong> 0.45 ft³ (60-lb) / 0.60 ft³ (80-lb)
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Package className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Fast-Setting Mix
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Sets in 20-40 minutes. Ideal for setting posts, poles, and small repairs. Available in 50-lb bags.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Set time:</strong> 20-40 minutes
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-lg mb-6 mx-auto">
                <Package className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Crack Resistant Mix
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Polymer-modified concrete with enhanced durability and crack resistance. 80-lb bags.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Feature:</strong> Crack resistant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Quikrete Calculator Features
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
                Input measurements in feet, inches, yards, meters, or centimeters for convenience.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Accurate Estimates
              </h3>
              <p className="text-muted-foreground text-center">
                Get precise bag counts based on actual Quikrete product coverage specifications.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-lg mb-6 mx-auto">
                <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Quick Results
              </h3>
              <p className="text-muted-foreground text-center">
                Get instant bag counts and volume calculations to plan your project efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quikrete Calculator FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Quikrete Calculator FAQ
          </h2>
          <div className="space-y-4">
            <SlabFAQItem
              question="How many bags of Quikrete do I need?"
              answer="Use our calculator to determine exact bag count. As a guide: one 80-lb bag covers 0.6 cubic feet, and one 60-lb bag covers 0.45 cubic feet. For 1 cubic yard, you need approximately 45 bags of 80-lb Quikrete or 60 bags of 60-lb Quikrete."
            />
            <SlabFAQItem
              question="What's the difference between 60-lb and 80-lb Quikrete bags?"
              answer="80-lb bags are more economical (more coverage per bag at lower cost per cubic foot) but heavier to carry. 60-lb bags are easier to handle and better for small projects or if you need to carry bags distances. Both produce the same quality concrete."
            />
            <SlabFAQItem
              question="How much area does a bag of Quikrete cover?"
              answer="Coverage depends on thickness. One 80-lb bag covers: 7.2 sq ft at 1 inch thick, 3.6 sq ft at 2 inches thick, or 1.8 sq ft at 4 inches thick. One 60-lb bag covers 75% of these amounts. Use our calculator for exact estimates."
            />
            <SlabFAQItem
              question="Can I use Quikrete for all concrete projects?"
              answer="Quikrete offers different products for different applications. Standard Concrete Mix works for most projects (slabs, footings, walls). Use Fast-Setting for post setting, Crack Resistant for driveways, and specialized mixes for specific needs. Check product specifications."
            />
            <SlabFAQItem
              question="Should I buy extra Quikrete bags?"
              answer="Yes, purchase 5-10% extra bags to account for waste, spillage, and slight variations in measurements. It's better to have extra bags than to run short during your pour. Unopened bags can usually be returned to most retailers."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center bg-card rounded-2xl shadow-xl p-12">
          <Package className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Calculate Your Quikrete Needs Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get accurate Quikrete bag counts and volume calculations for your concrete project. Know exactly how many bags to buy before you head to the store. Start calculating now!
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
