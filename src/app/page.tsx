import Link from "next/link";
import { Calculator, Building2, Zap, Shield } from "lucide-react";
import ConcreteCalculator from "@/components/concrete-calculator";
import { Metadata } from "next";

// 页面元数据
export const metadata: Metadata = {
  title: "Concrete Calculator - Professional Volume Calculation Tool",
  description: "Free online concrete calculator for accurate volume estimation. Calculate concrete, cement, sand, and gravel quantities for construction projects. Professional tool for builders and engineers.",
  keywords: ["concrete calculator", "concrete volume calculator", "construction calculator", "cement calculator", "building materials", "construction tools", "concrete estimation"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Concrete Calculator - Professional Volume Calculation Tool",
    description: "Free online concrete calculator for accurate volume estimation and material quantity calculation for construction projects.",
    url: "https://concrete-calculator.com",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Concrete Calculator
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Professional concrete volume calculation tool for accurate material estimation in various construction projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Start Calculating
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-300 dark:border-gray-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Calculator Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ConcreteCalculator />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg mb-6 mx-auto">
                <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Precise Calculations
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Based on standard mix ratio formulas, providing accurate concrete volume calculations to ensure project quality and cost control
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg mb-6 mx-auto">
                <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Fast & Convenient
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Clean and intuitive interface design, simply input basic parameters to quickly get calculation results and improve work efficiency
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-lg mb-6 mx-auto">
                <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Multiple Grades
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Supports concrete calculations for different strength grades to meet specific requirements of various construction projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12">
          <Shield className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Professional & Reliable Calculation Tool
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Based on industry standards and engineering practices, providing accurate concrete volume calculations for your construction projects
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Start Calculating Now
          </Link>
        </div>
      </section>
    </div>
  );
}
