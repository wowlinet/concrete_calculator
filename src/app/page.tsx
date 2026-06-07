import Link from "next/link";
import { Calculator, Building2, Zap, Check, Car, HomeIcon, Square, Blocks, Layers } from "lucide-react";
import ConcreteCalculator from "@/components/concrete-calculator";
import FAQItem from "@/components/faq-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Concrete Calculator - Calculate Volume, Bags & Cost Online",
  description: "Professional concrete calculator for accurate volume, material quantities and cost estimation. Calculate concrete needs for slabs, driveways, foundations, walls and more. Free online tool.",
  keywords: "concrete calculator, concrete volume calculator, concrete cost calculator, concrete bags calculator, construction calculator, concrete estimation, building materials",
  openGraph: {
    title: "Free Concrete Calculator - Calculate Volume, Bags & Cost Online",
    description: "Professional concrete calculator for accurate volume, material quantities and cost estimation. Calculate concrete needs for slabs, driveways, foundations, walls and more. Free online tool.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Concrete Calculator - Calculate Volume, Bags & Cost Online",
    description: "Professional concrete calculator for accurate volume, material quantities and cost estimation. Calculate concrete needs for slabs, driveways, foundations, walls and more. Free online tool.",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Calculate Concrete for Any Project in Seconds
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Looking for an easy way to figure out how much concrete you need? Our free Concrete Calculator helps you quickly estimate concrete volume, mix proportions, and cost for projects of any size. Whether you’re a contractor, homeowner, or DIY enthusiast, you’ll save time, reduce waste, and get accurate results with just a few clicks.
          </p>
        </div>
      </section>

      {/* Quick Calculator Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <ConcreteCalculator />
        </div>
      </section>

      {/* Why Use Our Concrete Calculator Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Why Use Our Concrete Calculator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Save Time</span>
                <span className="text-muted-foreground"> – No more manual math or complicated formulas</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Accurate Results</span>
                <span className="text-muted-foreground"> – Prevent under-ordering or overspending</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Mix & Material Breakdown</span>
                <span className="text-muted-foreground"> – Get cement, sand, and gravel quantities</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Flexible Units</span>
                <span className="text-muted-foreground"> – Switch easily between metric (m³) and imperial (yd³)</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Cost Estimation</span>
                <span className="text-muted-foreground"> – Plan your budget in advance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            How It Works?
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Using our Concrete Calculator is simple:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">1</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Choose Your Project Type</span>
                <span className="text-muted-foreground"> – Slab, wall, footing, or column</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">2</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Enter Dimensions</span>
                <span className="text-muted-foreground"> – Length, width, and thickness</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">3</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Select Units</span>
                <span className="text-muted-foreground"> – Metric (meters, centimeters) or Imperial (feet, inches)</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">4</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Calculate Volume</span>
                <span className="text-muted-foreground"> – Instantly see required cubic meters/yards of concrete</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">5</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">(Optional) Estimate Cost</span>
                <span className="text-muted-foreground"> – Enter price per cubic yard or per bag</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Key Features of the Calculator
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6 mx-auto">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Concrete Volume Calculator
              </h3>
              <p className="text-muted-foreground text-center">
                Input your project dimensions and instantly find out the total concrete volume required.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Concrete Mix Ratio Calculator
              </h3>
              <p className="text-muted-foreground text-center">
                Get material breakdown based on standard concrete mixes (e.g., 1:2:4 cement:sand:gravel).
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-lg mb-6 mx-auto">
                <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Ready-Mix Cost Estimator
              </h3>
              <p className="text-muted-foreground text-center">
                Estimate the total cost of your project by adding your local price per unit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Use Cases Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Concrete Calculator Popular Use Cases
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-lg mb-4 mx-auto">
                <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2 text-center">
                Driveways
              </h3>
              <p className="text-muted-foreground text-center text-sm">
                Ensure a smooth pour with the right amount of concrete
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mb-4 mx-auto">
                <HomeIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2 text-center">
                Patios
              </h3>
              <p className="text-muted-foreground text-center text-sm">
                Perfect for backyard DIY projects
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-500/10 rounded-lg mb-4 mx-auto">
                <Square className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2 text-center">
                Concrete Slabs
              </h3>
              <p className="text-muted-foreground text-center text-sm">
                For floors, basements, and garages
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-500/10 rounded-lg mb-4 mx-auto">
                <Blocks className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2 text-center">
                Walls
              </h3>
              <p className="text-muted-foreground text-center text-sm">
                Calculate vertical concrete needs
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-lg mb-4 mx-auto">
                <Layers className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2 text-center">
                Foundations
              </h3>
              <p className="text-muted-foreground text-center text-sm">
                Estimate footing and base requirements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="space-y-4">
            <FAQItem
              question="How to calculate how much concrete needed?"
              answer="To calculate how much concrete you need, measure the length, width, and thickness (or depth) of your project area. Multiply these dimensions to get the volume in cubic feet or cubic meters. For example, a 10ft × 10ft × 4in slab needs 33.3 cubic feet (1.23 cubic yards) of concrete. Our calculator does this instantly - just enter your dimensions and select your units. It also converts the volume to the number of concrete bags you'll need (60lb or 80lb bags) and provides material breakdown (cement, sand, gravel). For best results, always add 5-10% extra to account for spillage and uneven ground."
            />
            <FAQItem
              question="How to calculate concrete for a slab?"
              answer="Calculating concrete for a slab is straightforward with our slab calculator. First, measure your slab's length and width in feet (or meters), then determine the thickness - typically 4 inches for patios and walkways, 6 inches for driveways and garage floors. The formula is: Volume = Length × Width × Thickness. For example, a 12ft × 14ft patio with 4-inch thickness needs 168 cubic feet or 6.22 cubic yards of concrete (approximately 47 bags of 80lb concrete mix). Our calculator automatically handles unit conversions and tells you exactly how many cubic yards to order or how many bags to buy. You can also use our dedicated Slab Calculator for more detailed results including reinforcement recommendations and finishing material estimates."
            />
            <FAQItem
              question="How accurate is this concrete calculator?"
              answer="Our calculator uses standard concrete density and mix ratios. It's accurate for most projects, but we recommend consulting your supplier for final quantities."
            />
            <FAQItem
              question="Can I use it for small DIY projects?"
              answer="Yes! It's perfect for garden paths, patios, small driveways, or any personal project."
            />
            <FAQItem
              question="Does it calculate cost as well?"
              answer="Absolutely. Just enter your local cost per cubic yard (or per bag), and the calculator will estimate your total budget."
            />
            <FAQItem
              question="What's the standard concrete mix ratio?"
              answer="The most common ratio is 1:2:4 (cement:sand:gravel). However, ratios may vary depending on strength requirements."
            />
            <FAQItem
              question="Can I switch between metric and imperial units?"
              answer="Yes, our calculator supports both systems so you can choose what works best for you."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto text-center bg-card rounded-2xl shadow-xl p-12">
          <Building2 className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Start Your Calculation Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Stop guessing and start planning with confidence. Our Concrete Calculator is free, fast, and easy to use. Whether it&apos;s a driveway, slab, or foundation, you&apos;ll know exactly how much concrete you need before you begin.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Start Calculating Now
          </Link>
        </div>
      </section>
    </div>
  );
}
