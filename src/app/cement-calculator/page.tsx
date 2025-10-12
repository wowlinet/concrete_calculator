import Link from "next/link";
import { Calculator, Building2, Check, Ruler, Target, Clock, Layers } from "lucide-react";
import CementCalculator from "@/components/cement-calculator";
import SlabFAQItem from "@/components/slab-faq-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cement Calculator – Calculate Cement, Sand & Aggregate for Concrete",
  description: "Free cement calculator to estimate cement quantity needed for concrete and mortar. Calculate cement bags, sand, and aggregate with accurate mix ratios.",
  keywords: "cement calculator, concrete cement calculator, mortar calculator, cement quantity calculator, cement bag calculator, sand cement calculator, concrete mix calculator",
  openGraph: {
    title: "Cement Calculator – Calculate Cement, Sand & Aggregate for Concrete",
    description: "Free cement calculator to estimate cement quantity needed for concrete and mortar. Calculate cement bags, sand, and aggregate with accurate mix ratios.",
    type: "website",
  },
  alternates: {
    canonical: "/cement-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cement Calculator – Calculate Cement, Sand & Aggregate for Concrete",
    description: "Free cement calculator to estimate cement quantity needed for concrete and mortar. Calculate cement bags, sand, and aggregate with accurate mix ratios.",
  },
};

export default function CementCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Cement Calculator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Professional cement calculator for accurate estimation of cement, sand, and aggregate quantities for concrete and mortar projects
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4 text-primary" />
              <span>Concrete</span>
            </div>
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4 text-primary" />
              <span>Mortar</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Construction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cement Calculator Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <CementCalculator />
        </div>
      </section>

      {/* What is Cement Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-foreground mb-6">
            Understanding Cement Calculations
          </h2>
          <div className="text-lg text-muted-foreground space-y-4">
            <p>
              Cement is the binding material in concrete and mortar. Accurate cement calculation ensures structural integrity, prevents material waste, and optimizes project costs. This calculator helps you determine the exact amount of cement needed based on your project requirements.
            </p>
            <p>
              The calculation accounts for the <strong>dry-to-wet volume ratio</strong>, which represents how dry materials expand when mixed with water. Different mixtures have different ratios:
            </p>
            <div className="bg-primary/10 p-6 rounded-lg border border-border mt-6">
              <div className="font-semibold text-card-foreground mb-3">Standard Dry-to-Wet Ratios:</div>
              <ul className="space-y-2">
                <li>• <strong>Concrete:</strong> 1.54:1 (dry materials increase by 54% when wet)</li>
                <li>• <strong>Mortar:</strong> 1.22:1 (dry materials increase by 22% when wet)</li>
                <li>• <strong>Cement & Water:</strong> 1:1 (no volume change)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Calculate Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-foreground mb-6">
            How to Calculate Cement Quantity?
          </h2>
          <div className="text-lg text-muted-foreground space-y-4 mb-8">
            <p>
              Calculating cement quantity involves several steps to ensure accuracy and account for material properties.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg border border-border mb-8">
            <h3 className="text-2xl font-semibold text-card-foreground mb-6">
              Calculation Steps
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">1</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-2">Calculate Dry Volume</div>
                  <div className="bg-muted/50 p-3 rounded-lg font-mono text-sm">
                    Dry Volume = Wet Volume × Dry-to-Wet Ratio
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Example: 1 m³ wet volume × 1.54 = 1.54 m³ dry volume
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">2</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-2">Add Waste Factor</div>
                  <div className="bg-muted/50 p-3 rounded-lg font-mono text-sm">
                    Total Volume(Dry) = Dry Volume × (1 + Waste%/100)
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Example: 1.54 m³ dry volume × (1 + 10/100) = 1.694 m³
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">3</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-2">Apply Mix Ratio</div>
                  <div className="bg-muted/50 p-3 rounded-lg font-mono text-sm">
                    Cement Volume = Total Dry Volume × (Cement Parts / Total Parts)
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Example: For 1:1.5:3 mix, Cement = 1.694 × (1/5.5) = 0.308 m³
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">4</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-2">Calculate Weight and Bags</div>
                  <div className="bg-muted/50 p-3 rounded-lg space-y-1 text-sm">
                    <div className="font-mono">Weight = Volume × Density</div>
                    <div className="font-mono">Bags = Weight / Bag Size</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Example: 0.308 m³ × 1440 kg/m³ = 443.5 kg ≈ 9 bags (50kg each)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mix Ratios */}
          <div className="bg-card p-8 rounded-xl shadow-lg border border-border">
            <h3 className="text-2xl font-semibold text-card-foreground mb-6">
              Common Mix Ratios
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Concrete Mix Ratios</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span className="font-mono">1:5:10</span>
                    <span className="text-muted-foreground">5.0 MPa (725 psi) - Low strength</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span className="font-mono">1:3:6</span>
                    <span className="text-muted-foreground">10.0 MPa (1450 psi) - General use</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span className="font-mono">1:1.5:3</span>
                    <span className="text-muted-foreground">20.0 MPa (2900 psi) - Standard strength</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span className="font-mono">1:1:2</span>
                    <span className="text-muted-foreground">25.0 MPa (3625 psi) - High strength</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Mortar Mix Ratios</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span className="font-mono">1:6</span>
                    <span className="text-muted-foreground">Interior plaster</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span className="font-mono">1:5</span>
                    <span className="text-muted-foreground">Brickwork mortar</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span className="font-mono">1:4</span>
                    <span className="text-muted-foreground">Exterior plaster</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span className="font-mono">1:3</span>
                    <span className="text-muted-foreground">Rich mortar mix</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculation Example */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-foreground mb-6">
            Practical Calculation Example
          </h2>
          <div className="text-lg text-muted-foreground space-y-4 mb-8">
            <p>
              Let&apos;s calculate cement requirements for a concrete slab project.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg border border-border">
            <h3 className="text-xl font-semibold text-card-foreground mb-6">
              Example: Concrete Slab Foundation
            </h3>

            <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-lg mb-6">
              <div className="font-semibold text-card-foreground mb-3">Project Specifications:</div>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Mix Type:</strong> Concrete</li>
                <li><strong>Wet Volume:</strong> 10 cubic meters (m³)</li>
                <li><strong>Dry-to-Wet Ratio:</strong> 1.54:1</li>
                <li><strong>Waste Factor:</strong> 10%</li>
                <li><strong>Mix Ratio:</strong> 1:1.5:3 (20.0 MPa)</li>
                <li><strong>Cement Density:</strong> 1440 kg/m³</li>
                <li><strong>Bag Size:</strong> 50 kg</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-card-foreground mb-3">Step-by-Step Calculation</h4>

                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="font-medium mb-2">1. Calculate Total Dry Volume</div>
                    <div className="font-mono text-sm space-y-1">
                      <div>Total Dry Volume = 10 m³ × 1.54</div>
                      <div className="text-primary font-bold">Total Dry Volume = 15.4 m³</div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="font-medium mb-2">2. Calculate Total Volume(Dry) with Waste</div>
                    <div className="font-mono text-sm space-y-1">
                      <div>Total Volume(Dry) = 15.4 m³ × (1 + 10/100)</div>
                      <div className="text-primary font-bold">Total Volume(Dry) = 16.94 m³</div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="font-medium mb-2">3. Calculate Cement Volume (1:1.5:3 ratio)</div>
                    <div className="font-mono text-sm space-y-1">
                      <div>Total Parts = 1 + 1.5 + 3 = 5.5</div>
                      <div>Cement Volume = 16.94 m³ × (1/5.5)</div>
                      <div className="text-primary font-bold">Cement Volume = 3.08 m³</div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="font-medium mb-2">4. Calculate Cement Weight</div>
                    <div className="font-mono text-sm space-y-1">
                      <div>Cement Weight = 3.08 m³ × 1440 kg/m³</div>
                      <div className="text-primary font-bold">Cement Weight = 4435.2 kg</div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="font-medium mb-2">5. Calculate Bags Needed</div>
                    <div className="font-mono text-sm space-y-1">
                      <div>Bags = 4435.2 kg ÷ 50 kg/bag</div>
                      <div className="text-primary font-bold">Bags = 89 bags (rounded up)</div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="font-medium mb-2">6. Other Materials</div>
                    <div className="font-mono text-sm space-y-1">
                      <div>Sand Volume = 16.94 m³ × (1.5/5.5) = 4.62 m³</div>
                      <div>Gravel Volume = 16.94 m³ × (3/5.5) = 9.24 m³</div>
                      <div>Water Weight = 4335.2 kg × 0.4 (default Water–Cement ratio) = 1784.08 kg</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-primary/10 border-l-4 border-primary p-6 rounded-lg">
              <div className="font-semibold text-card-foreground mb-2">Final Requirements:</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Cement: <strong>3.08 m³ (4435 kg, 89 bags)</strong></li>
                <li>• Sand: <strong>4.62 m³</strong></li>
                <li>• Gravel: <strong>9.24 m³</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Calculator */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Why Use Our Cement Calculator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Accurate Calculations</span>
                <span className="text-muted-foreground"> – Industry-standard formulas with dry-to-wet ratios</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Multiple Mix Types</span>
                <span className="text-muted-foreground"> – Support for concrete, mortar, and cement-water mixes</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Complete Material Breakdown</span>
                <span className="text-muted-foreground"> – Calculate cement, sand, gravel, and water quantities</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Flexible Units</span>
                <span className="text-muted-foreground"> – Support for metric and imperial volume units</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-foreground">Waste Accounting</span>
                <span className="text-muted-foreground"> – Include waste factors for realistic estimates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Calculator Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6 mx-auto">
                <Ruler className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Multiple Units
              </h3>
              <p className="text-muted-foreground text-center">
                Calculate with cubic meters, feet, yards, liters, gallons, and more volume units.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-lg mb-6 mx-auto">
                <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 text-center">
                Standard Mix Ratios
              </h3>
              <p className="text-muted-foreground text-center">
                Pre-configured ratios for various strength grades and applications.
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
                Real-time calculations with automatic updates as you adjust parameters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Cement Calculator FAQ
          </h2>
          <div className="space-y-4">
            <SlabFAQItem
              question="How many bags of cement do I need for 1 cubic meter of concrete?"
              answer="For standard 1:1.5:3 concrete mix (20 MPa), you need approximately 6.3 bags of 50kg cement per cubic meter. The exact number depends on the mix ratio and waste factor. Higher strength mixes require more cement."
            />
            <SlabFAQItem
              question="What is the difference between dry volume and wet volume?"
              answer="Wet volume is the final volume after mixing all materials with water. Dry volume is larger because dry materials have air gaps between particles that get filled when water is added. For concrete, dry volume is typically 1.54 times the wet volume."
            />
            <SlabFAQItem
              question="Why do I need to add a waste factor?"
              answer="Waste factor accounts for material spillage, uneven surfaces, over-excavation, and mixing losses. A 10% waste factor is standard for most projects. This ensures you have enough materials to complete the project without shortages."
            />
            <SlabFAQItem
              question="What mix ratio should I use for my project?"
              answer="Mix ratios depend on strength requirements: 1:5:10 for low-strength (5 MPa), 1:1.5:3 for standard strength (20 MPa), and 1:1:2 for high-strength (25 MPa). Consult structural plans or engineers for specific requirements."
            />
            <SlabFAQItem
              question="Can I use this calculator for mortar?"
              answer="Yes! Select 'Mortar' as the mix type and choose appropriate ratios: 1:6 for interior plaster, 1:5 for brickwork, 1:4 for exterior plaster, or 1:3 for rich mortar mix. The calculator automatically adjusts for mortar's different dry-to-wet ratio (1.22:1)."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center bg-card rounded-2xl shadow-xl p-12">
          <Layers className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Calculate Cement for Your Project
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get accurate cement, sand, and aggregate calculations for your concrete or mortar project. Ensure proper mix ratios and avoid material shortages or excess.
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
