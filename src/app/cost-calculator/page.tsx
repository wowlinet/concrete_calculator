import Link from "next/link";
import { Calculator, Building2, Check, Square, Layers, Ruler, Target, Clock, DollarSign } from "lucide-react";
import SlabFAQItem from "@/components/slab-faq-item";
import { Metadata } from "next";
import CostCalculator from "@/components/cost-calculator";

export const metadata: Metadata = {
  title: "Concrete Cost Calculator - Calculate Price & Budget for Your Project",
  description: "Professional concrete cost calculator to estimate project pricing and budget. Calculate concrete costs per cubic yard, material expenses, and total project budget. Free online tool.",
  keywords: "concrete cost calculator, concrete price calculator, concrete cost estimator, cost of concrete calculator, concrete budget calculator, concrete pricing calculator, how much does concrete cost",
  openGraph: {
    title: "Concrete Cost Calculator - Calculate Price & Budget for Your Project",
    description: "Professional concrete cost calculator to estimate project pricing and budget. Calculate concrete costs per cubic yard, material expenses, and total project budget. Free online tool.",
    type: "website",
  },
  alternates: {
    canonical: "/cost-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete Cost Calculator - Calculate Price & Budget for Your Project",
    description: "Professional concrete cost calculator to estimate project pricing and budget. Calculate concrete costs per cubic yard, material expenses, and total project budget. Free online tool.",
  },
};

export default function CostCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Concrete Cost Calculator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Calculate accurate concrete costs and project budget. Get instant price estimates for materials, labor, and total project expenses
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span>Cost Estimation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calculator className="h-4 w-4 text-primary" />
              <span>Budget Planning</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Project Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Calculator Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <CostCalculator />
        </div>
      </section>

      {/* Why Use Our Cost Calculator Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Why Use Our Cost Calculator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Accurate Cost Estimates</span>
                <span className="text-muted-foreground"> – Calculate precise concrete costs based on current market pricing</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Budget Planning</span>
                <span className="text-muted-foreground"> – Plan your project budget with detailed cost breakdowns</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Material Cost Analysis</span>
                <span className="text-muted-foreground"> – See costs for cement, sand, gravel, and water separately</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Price Per Unit</span>
                <span className="text-muted-foreground"> – Calculate cost per cubic yard or cubic meter</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Compare Options</span>
                <span className="text-muted-foreground"> – Compare costs between ready-mix and bagged concrete</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Calculate Concrete Costs Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            How to Calculate Concrete Costs
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Follow these simple steps to estimate your concrete project costs:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">1</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Measure Project Size</span>
                <span className="text-muted-foreground"> – Enter length, width, and thickness dimensions</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">2</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Calculate Volume</span>
                <span className="text-muted-foreground"> – Get concrete volume in cubic yards or cubic meters</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">3</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Enter Local Pricing</span>
                <span className="text-muted-foreground"> – Input your local concrete price per unit</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">4</span>
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Get Total Cost</span>
                <span className="text-muted-foreground"> – See complete project cost breakdown and budget</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Factors Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Factors Affecting Concrete Costs
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-lg mb-6 mx-auto">
                <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Concrete Strength
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Higher PSI ratings (3000, 4000, 5000+) cost more due to enhanced material composition.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Impact:</strong> 10-30% price variation
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Ruler className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Delivery Distance
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Transportation fees increase with distance from the concrete plant to job site.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Impact:</strong> $50-$200+ per load
              </div>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-lg mb-6 mx-auto">
                <DollarSign className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Minimum Orders
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Suppliers often have minimum order quantities and may charge extra for small loads.
              </p>
              <div className="text-sm text-muted-foreground text-center">
                <strong>Impact:</strong> $150-$300 short load fee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Cost Calculator Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6 mx-auto">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Volume-Based Pricing
              </h3>
              <p className="text-muted-foreground text-center">
                Calculate costs based on accurate volume measurements in your preferred units.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Customizable Pricing
              </h3>
              <p className="text-muted-foreground text-center">
                Enter your local concrete prices for accurate cost estimates specific to your area.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-lg mb-6 mx-auto">
                <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Instant Budget Estimates
              </h3>
              <p className="text-muted-foreground text-center">
                Get immediate total cost calculations to plan your project budget effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Calculator FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Cost Calculator FAQ
          </h2>
          <div className="space-y-4">
            <SlabFAQItem
              question="How much does concrete cost per cubic yard?"
              answer="Concrete typically costs $125-$150 per cubic yard for standard 3000 PSI mix. Higher strength concrete (4000-5000 PSI) ranges from $150-$200 per yard. Prices vary by location, strength requirements, and delivery distance."
            />
            <SlabFAQItem
              question="What's included in concrete cost?"
              answer="Concrete cost typically includes the material itself, mixing at the plant, and basic delivery. Additional costs may include short load fees (for orders under minimum), long distance delivery charges, special additives, and Saturday/holiday delivery premiums."
            />
            <SlabFAQItem
              question="Is bagged concrete or ready-mix cheaper?"
              answer="Ready-mix is more economical for projects over 1 cubic yard (about 45 bags of 80-lb concrete). Bagged concrete costs $4-$6 per bag but requires mixing labor. For large projects, ready-mix saves money and time despite higher per-unit cost for small quantities."
            />
            <SlabFAQItem
              question="How do I get the best concrete price?"
              answer="Get quotes from multiple suppliers, order during weekdays to avoid premium fees, meet minimum order quantities to avoid short load fees, and consider scheduling during off-peak seasons. Ordering higher volumes typically reduces per-yard costs."
            />
            <SlabFAQItem
              question="What affects concrete pricing in my area?"
              answer="Local factors include: proximity to concrete plants (delivery costs), regional material costs, local competition among suppliers, seasonal demand, and specific mix requirements. Contact local suppliers for current pricing in your area."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center bg-card rounded-2xl shadow-xl p-12">
          <DollarSign className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Calculate Your Concrete Costs Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get accurate cost estimates for your concrete project. Plan your budget with precise calculations for volume, materials, and total project expenses. Start calculating now!
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
