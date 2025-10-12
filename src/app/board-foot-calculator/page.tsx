import Link from "next/link";
import { Calculator, Building2, Check, Ruler, Target, Clock } from "lucide-react";
import BoardFootCalculator from "@/components/board-foot-calculator";
import SlabFAQItem from "@/components/slab-faq-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board Foot Calculator – Estimate Lumber Volume & Cost for Projects",
  description: "Free board foot calculator to quickly estimate hardwood lumber volume and cost. Calculate board feet for woodworking projects with accurate pricing.",
  keywords: "board foot calculator, lumber calculator, board feet calculator, hardwood calculator, wood volume calculator, lumber cost calculator, woodworking calculator",
  openGraph: {
    title: "Board Foot Calculator – Estimate Lumber Volume & Cost for Projects",
    description: "Free board foot calculator to quickly estimate hardwood lumber volume and cost. Calculate board feet for woodworking projects with accurate pricing.",
    type: "website",
  },
  alternates: {
    canonical: "/board-foot-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Board Foot Calculator – Estimate Lumber Volume & Cost for Projects",
    description: "Free board foot calculator to quickly estimate hardwood lumber volume and cost. Calculate board feet for woodworking projects with accurate pricing.",
  },
};

export default function BoardFootCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Board Foot Calculator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Professional board foot calculator for accurate lumber volume and cost estimation. Calculate board feet for hardwood and dimensional lumber projects
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Ruler className="h-4 w-4 text-primary" />
              <span>Hardwood</span>
            </div>
            <div className="flex items-center space-x-2">
              <Ruler className="h-4 w-4 text-primary" />
              <span>Dimensional Lumber</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Woodworking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Board Foot Calculator Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <BoardFootCalculator />
        </div>
      </section>

      {/* What is a Board Foot Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-foreground mb-6">
            What is a Board Foot?
          </h2>
          <div className="text-lg text-muted-foreground space-y-4">
            <p>
              A <strong>board foot</strong> is a unit of measurement for lumber volume. One board foot is equal to the volume of a board that is <strong>1 foot long × 1 foot wide × 1 inch thick</strong> (12&quot; × 12&quot; × 1&quot; = 144 cubic inches).
            </p>
            <p>
              Board feet are the standard measurement used in the lumber industry, particularly for hardwoods like oak, maple, walnut, and cherry. It allows lumber dealers and woodworkers to accurately price and estimate material quantities regardless of the board&apos;s actual dimensions.
            </p>
            <div className="bg-primary/10 p-6 rounded-lg border border-border mt-6">
              <div className="flex items-start space-x-3">
                <Ruler className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-card-foreground mb-2">Key Points:</div>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>1 board foot = 144 cubic inches</li>
                    <li>1 board foot = 12&quot; × 12&quot; × 1&quot;</li>
                    <li>Standard unit for pricing hardwood lumber</li>
                    <li>Allows consistent pricing across different board sizes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Calculate Board Feet Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-foreground mb-6">
            How to Calculate Board Feet?
          </h2>
          <div className="text-lg text-muted-foreground space-y-4 mb-8">
            <p>
              Calculating board feet is straightforward using the standard formula. You need three measurements: thickness, width, and length of the lumber piece.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg border border-border mb-8">
            <h3 className="text-2xl font-semibold text-card-foreground mb-4">
              Board Foot Formula
            </h3>
            <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
              <div className="text-center mb-4">
                <div className="text-2xl font-mono font-bold text-primary">
                  Board Feet = (Thickness × Width × Length) ÷ 144
                </div>
              </div>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Where:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Thickness</strong> = thickness in inches</li>
                  <li><strong>Width</strong> = width in inches</li>
                  <li><strong>Length</strong> = length in inches</li>
                  <li><strong>144</strong> = conversion constant (12&quot; × 12&quot;)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-card-foreground">Alternative Formula (using feet):</h4>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-lg font-mono text-primary">
                  Board Feet = (Thickness in inches × Width in inches × Length in feet) ÷ 12
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg border border-border">
            <h3 className="text-2xl font-semibold text-card-foreground mb-4">
              Step-by-Step Calculation Process
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">1</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Measure the lumber</div>
                  <div className="text-muted-foreground">Get thickness, width, and length measurements in inches</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">2</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Multiply the dimensions</div>
                  <div className="text-muted-foreground">Thickness × Width × Length (all in inches)</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">3</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Divide by 144</div>
                  <div className="text-muted-foreground">Result = total cubic inches ÷ 144 = board feet</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">4</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Multiply by quantity</div>
                  <div className="text-muted-foreground">Total board feet = board feet per piece × number of pieces</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Using the Lumber Calculator Example Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-foreground mb-6">
            Using the Lumber Calculator: An Example
          </h2>
          <div className="text-lg text-muted-foreground space-y-4 mb-8">
            <p>
              Let&apos;s walk through a practical example of calculating board feet for a woodworking project.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg border border-border">
            <h3 className="text-xl font-semibold text-card-foreground mb-6">
              Example: Oak Boards for a Table Top
            </h3>

            <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-lg mb-6">
              <div className="font-semibold text-card-foreground mb-3">Project Requirements:</div>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Material:</strong> Red Oak hardwood</li>
                <li><strong>Thickness:</strong> 1 inch (4/4 lumber)</li>
                <li><strong>Width:</strong> 6 inches</li>
                <li><strong>Length:</strong> 96 inches (8 feet)</li>
                <li><strong>Quantity:</strong> 10 boards</li>
                <li><strong>Price:</strong> $6.50 per board foot</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-card-foreground mb-3">Step 1: Calculate Board Feet per Piece</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="font-mono text-sm">
                    Board Feet = (Thickness × Width × Length) ÷ 144
                  </div>
                  <div className="font-mono text-sm">
                    Board Feet = (1&quot; × 6&quot; × 96&quot;) ÷ 144
                  </div>
                  <div className="font-mono text-sm">
                    Board Feet = 576 ÷ 144
                  </div>
                  <div className="font-mono text-sm font-bold text-primary">
                    Board Feet = 4 BF per board
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-card-foreground mb-3">Step 2: Calculate Total Board Feet</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="font-mono text-sm">
                    Total Board Feet = Board Feet per piece × Quantity
                  </div>
                  <div className="font-mono text-sm">
                    Total Board Feet = 4 BF × 10 boards
                  </div>
                  <div className="font-mono text-sm font-bold text-primary">
                    Total Board Feet = 40 BF
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-card-foreground mb-3">Step 3: Calculate Total Cost</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="font-mono text-sm">
                    Total Cost = Total Board Feet × Price per BF
                  </div>
                  <div className="font-mono text-sm">
                    Total Cost = 40 BF × $6.50
                  </div>
                  <div className="font-mono text-sm font-bold text-primary">
                    Total Cost = $260.00
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-primary/10 border-l-4 border-primary p-6 rounded-lg">
              <div className="font-semibold text-card-foreground mb-2">Result Summary:</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Board feet per piece: <strong>4 BF</strong></li>
                <li>• Total board feet needed: <strong>40 BF</strong></li>
                <li>• Total project cost: <strong>$260.00</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Board Foot Calculator FAQ
          </h2>
          <div className="space-y-4">
            <SlabFAQItem
              question="What is the difference between board feet and linear feet?"
              answer="Board feet measure volume (thickness × width × length), while linear feet only measure length. A 10-foot long 2×4 is 10 linear feet but contains 6.67 board feet. Board feet account for the lumber's thickness and width, making it a true volume measurement."
            />
            <SlabFAQItem
              question="How many board feet are in a 2×4×8?"
              answer="A 2×4×8 (actual dimensions 1.5&quot; × 3.5&quot; × 96&quot;) contains 5.25 board feet using nominal dimensions (2&quot; × 4&quot; × 96&quot; ÷ 144 = 5.33 BF). However, lumber is typically sold by nominal size, so it would be calculated as (2 × 4 × 8) ÷ 12 = 5.33 board feet."
            />
            <SlabFAQItem
              question="Why do lumber yards use board feet?"
              answer="Board feet provide a standardized way to price lumber regardless of dimensions. A 1×12 and a 2×6 may have different shapes but similar volumes, so board feet pricing ensures fair and consistent pricing across different board sizes."
            />
            <SlabFAQItem
              question="What does 4/4, 5/4, 6/4 lumber mean?"
              answer="These fractions represent rough lumber thickness in quarters of an inch before planing. 4/4 (four-quarter) = 1&quot; rough, 5/4 = 1.25&quot; rough, 6/4 = 1.5&quot; rough. After planing, 4/4 lumber typically finishes at 3/4&quot; thick."
            />
            <SlabFAQItem
              question="Can I use this calculator for softwood dimensional lumber?"
              answer="Yes! While board feet are most commonly used for hardwoods, this calculator works for any lumber type including softwood dimensional lumber (2×4, 2×6, etc.). Just enter the dimensions and quantity to calculate board feet."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center bg-card rounded-2xl shadow-xl p-12">
          <Ruler className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Calculate Board Feet for Your Project
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get accurate board foot calculations and cost estimates for your woodworking or construction project. Save time and money with precise lumber volume measurements.
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
