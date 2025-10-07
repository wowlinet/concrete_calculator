import { Building2, Calculator, CheckCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Our Concrete Calculator - Professional Construction Tool",
  description: "Learn about our professional concrete calculator tool. Based on industry standards, supporting multiple project types, concrete grades, and accurate material calculations for construction projects.",
  keywords: "concrete calculator about, construction tool, concrete grades, building standards, material calculation, construction planning",
  openGraph: {
    title: "About Our Concrete Calculator - Professional Construction Tool",
    description: "Learn about our professional concrete calculator tool. Based on industry standards, supporting multiple project types, concrete grades, and accurate material calculations for construction projects.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Our Concrete Calculator - Professional Construction Tool",
    description: "Learn about our professional concrete calculator tool. Based on industry standards, supporting multiple project types, concrete grades, and accurate material calculations for construction projects.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Concrete Calculator
            </h1>
            <p className="text-lg text-muted-foreground">
              Professional concrete calculation tool for construction projects
            </p>
          </div>

          {/* Product Introduction */}
          <div className="bg-card rounded-xl shadow-lg p-8 mb-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-card-foreground mb-6">
                  Professional Concrete Calculation Solution
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Our concrete calculator is developed based on national building standards and industry best practices, providing construction engineers, construction workers, and project managers with accurate concrete and related material quantity calculations. Through simple parameter input, you can obtain detailed material lists to help you better control project costs and material procurement.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Based on National Standards</span>
                  </div>
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Precise Calculation Algorithms</span>
                  </div>
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">User-Friendly Interface</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 text-center">
                <Building2 className="h-24 w-24 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Serving Construction Industry
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Providing professional concrete volume calculation services for various construction projects
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-card rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-semibold text-card-foreground">
                Key Features
              </h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Multiple project types: foundations, slabs, walls, columns, and stairs
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Support for both metric and imperial units
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Accurate material quantity calculations (cement, sand, gravel, water)
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Cost estimation with customizable unit prices
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Export results for project documentation
                </span>
              </li>
            </ul>
          </div>

          {/* Supported Concrete Grades */}
          <div className="bg-card rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center">
              Supported Concrete Grades
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">C15</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Compressive Strength ≥ 15 MPa
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• General foundation works</li>
                  <li>• Concrete base layers</li>
                  <li>• Non-load bearing structures</li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">C20</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Compressive Strength ≥ 20 MPa
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• General structural works</li>
                  <li>• Floor construction</li>
                  <li>• General building foundations</li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">C25</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Compressive Strength ≥ 25 MPa
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Residential buildings</li>
                  <li>• General beam and column structures</li>
                  <li>• Slab construction</li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">C30</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Compressive Strength ≥ 30 MPa
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Commercial buildings</li>
                  <li>• Important structural works</li>
                  <li>• Precast components</li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">C35</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Compressive Strength ≥ 35 MPa
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• High-rise buildings</li>
                  <li>• Bridge construction</li>
                  <li>• Critical load-bearing structures</li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">C40</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Compressive Strength ≥ 40 MPa
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Special structural works</li>
                  <li>• High-strength requirements</li>
                  <li>• Specialized buildings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How to Use */}
          <div className="bg-card rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-card-foreground mb-6 flex items-center">
              <BookOpen className="mr-3 h-6 w-6 text-primary" />
              How to Use
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Step-by-Step Guide
                </h3>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">1</span>
                    Select your project type (foundation, slab, wall, column, or stairs)
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">2</span>
                    Choose your preferred units (metric or imperial)
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">3</span>
                    Enter the dimensions for your project
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">4</span>
                    Select concrete grade and enter unit price
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">5</span>
                    Click Calculate to get your results
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Tips for Best Results
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    Double-check all measurements before calculating
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    Add 5-10% extra material for waste and spillage
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    Consider local material prices for accurate cost estimates
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    Export results for easy sharing with suppliers
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Calculation Process */}
          <div className="bg-card rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-card-foreground mb-6 flex items-center">
              <Building2 className="mr-3 h-6 w-6 text-primary" />
              Calculation Process
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Volume Calculation</h3>
                <p className="text-muted-foreground text-sm">
                  Calculate concrete volume based on project dimensions and type
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Material Ratios</h3>
                <p className="text-muted-foreground text-sm">
                  Apply standard mix ratios based on concrete grade selection
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Final Results</h3>
                <p className="text-muted-foreground text-sm">
                  Generate detailed material list and cost estimation
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl shadow-lg p-8 text-primary-foreground text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Calculate Your Concrete Needs?
            </h2>
            <p className="text-primary-foreground/80 mb-6 text-lg">
              Start using our professional concrete calculator now and get accurate material estimates for your construction project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculator"
                className="bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center justify-center"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Start Calculating
              </Link>
              <Link
                href="/"
                className="border-2 border-primary-foreground text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-colors inline-flex items-center justify-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}