import Link from "next/link";
import { Calculator, Building2, Check, Mountain, Ruler, Target, Clock, Boxes } from "lucide-react";
import GravelCalculator from "@/components/gravel-calculator";
import SlabFAQItem from "@/components/slab-faq-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gravel Calculator - Calculate Gravel, Stone & Rock Quantity for Projects",
  description: "Professional gravel calculator for accurate stone, rock and gravel quantity estimation. Calculate volume, weight, and cost for driveways, pathways, landscaping, and drainage. Free online tool.",
  keywords: "gravel calculator, stone calculator, rock calculator, crushed stone calculator, pea gravel calculator, gravel quantity calculator, gravel weight calculator, gravel cost calculator",
  openGraph: {
    title: "Gravel Calculator - Calculate Gravel, Stone & Rock Quantity for Projects",
    description: "Professional gravel calculator for accurate stone, rock and gravel quantity estimation. Calculate volume, weight, and cost for driveways, pathways, landscaping, and drainage. Free online tool.",
    type: "website",
  },
  alternates: {
    canonical: "/gravel-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gravel Calculator - Calculate Gravel, Stone & Rock Quantity for Projects",
    description: "Professional gravel calculator for accurate stone, rock and gravel quantity estimation. Calculate volume, weight, and cost for driveways, pathways, landscaping, and drainage. Free online tool.",
  },
};

export default function GravelCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Gravel Calculator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Professional gravel calculator for accurate stone, rock, and gravel quantity estimation. Calculate volume, weight, and cost for all your landscaping and construction projects
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Mountain className="h-4 w-4 text-primary" />
              <span>Driveways</span>
            </div>
            <div className="flex items-center space-x-2">
              <Boxes className="h-4 w-4 text-primary" />
              <span>Pathways</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Landscaping</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gravel Calculator Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <GravelCalculator />
        </div>
      </section>

      {/* Why Use Our Gravel Calculator Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Why Use Our Gravel Calculator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Multiple Gravel Types</span>
                <span className="text-muted-foreground"> – Pre-configured densities for pea gravel, crushed stone, river rock, and more</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Accurate Weight Calculations</span>
                <span className="text-muted-foreground"> – Calculate exact weight in tons and kilograms based on material density</span>
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

      {/* How to Calculate Gravel Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            How to Calculate Gravel Quantity
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Follow these simple steps to calculate gravel for your project:
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
                <span className="text-lg font-medium text-foreground">Select Gravel Type</span>
                <span className="text-muted-foreground"> – Choose from common types or enter custom density</span>
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

      {/* Gravel Types Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Common Gravel Applications
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-lg mb-6 mx-auto">
                <Mountain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Driveways
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Crushed stone and gravel driveways provide durable, all-weather access. Ideal depth: 4-6 inches.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Best materials:</strong> Crushed stone, crushed granite
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Boxes className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Pathways & Walkways
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Decorative and functional paths for gardens and yards. Typical depth: 2-4 inches.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Best materials:</strong> Pea gravel, river rock
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-lg mb-6 mx-auto">
                <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Drainage & Base
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Foundation drainage, French drains, and construction base layers. Depth: 6-12 inches.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Best materials:</strong> Crushed stone, limestone
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Gravel Calculator Features
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
                Material-Specific
              </h3>
              <p className="text-muted-foreground text-center">
                Pre-configured densities for common gravel types or enter custom density for specialty materials.
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

      {/* Gravel FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Gravel Calculator FAQ
          </h2>
          <div className="space-y-4">
            <SlabFAQItem
              question="How much gravel do I need for my driveway?"
              answer="For a standard driveway, calculate length × width × depth (typically 4-6 inches). For example, a 20ft × 10ft driveway at 4 inches deep requires approximately 2.5 cubic yards (about 3.5 tons) of gravel."
            />
            <SlabFAQItem
              question="What is the best gravel for a driveway?"
              answer="Crushed stone (3/4 inch) is ideal for driveways as it compacts well and provides excellent stability. Crushed granite also works well. Avoid smooth river rock as it doesn't compact properly for vehicle traffic."
            />
            <SlabFAQItem
              question="How deep should gravel be?"
              answer="Depth depends on application: Driveways need 4-6 inches, walkways 2-4 inches, drainage systems 6-12 inches. Always add a waste factor of 5-10% for compaction and uneven surfaces."
            />
            <SlabFAQItem
              question="How do I convert gravel volume to weight?"
              answer="Multiply volume (cubic meters) by material density (kg/m³). For example: 2 m³ of crushed stone (1680 kg/m³) = 3,360 kg or 3.36 tons. Different gravel types have different densities."
            />
            <SlabFAQItem
              question="How much does a yard of gravel weigh?"
              answer="Weight varies by material: Crushed stone weighs about 2,700-3,000 lbs per cubic yard, pea gravel weighs 2,400-2,600 lbs per yard, and river rock weighs 2,600-2,800 lbs per yard."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center bg-card rounded-2xl shadow-xl p-12">
          <Mountain className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Calculate Your Gravel Needs Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get accurate gravel calculations for your driveway, pathway, or landscaping project. Our calculator provides precise volume, weight, and cost estimates for all types of stone and gravel materials.
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
