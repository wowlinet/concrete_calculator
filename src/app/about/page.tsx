import { Building2, Calculator, Shield, Users, Award, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About Concrete Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional, accurate, and convenient concrete volume calculation tool providing reliable material quantity calculation services for construction projects
            </p>
          </div>

          {/* Product Introduction */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Professional Concrete Calculation Solution
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
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

          {/* Core Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Precise Calculations
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Based on standard mix ratio formulas, providing accurate material quantity calculations
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="bg-green-100 dark:bg-green-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Reliable Standards
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Following national building standards to ensure reliability of calculation results
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                User-Friendly
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Clean and intuitive interface design with simple and convenient operation
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="bg-orange-100 dark:bg-orange-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Professional Quality
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Developed by professional team with continuous optimization and updates
              </p>
            </div>
          </div>

          {/* Supported Concrete Grades */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Supported Concrete Grades
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">C15</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Compressive Strength ≥ 15 MPa
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• General foundation works</li>
                  <li>• Concrete base layers</li>
                  <li>• Non-load bearing structures</li>
                </ul>
              </div>

              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">C20</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Compressive Strength ≥ 20 MPa
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• General structural works</li>
                  <li>• Floor construction</li>
                  <li>• General building foundations</li>
                </ul>
              </div>

              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">C25</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Compressive Strength ≥ 25 MPa
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Residential buildings</li>
                  <li>• General beam and column structures</li>
                  <li>• Slab construction</li>
                </ul>
              </div>

              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">C30</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Compressive Strength ≥ 30 MPa
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Commercial buildings</li>
                  <li>• Important structural works</li>
                  <li>• Precast components</li>
                </ul>
              </div>

              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">C35</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Compressive Strength ≥ 35 MPa
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• High-rise buildings</li>
                  <li>• Bridge construction</li>
                  <li>• Critical load-bearing structures</li>
                </ul>
              </div>

              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">C40</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Compressive Strength ≥ 40 MPa
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Special structural works</li>
                  <li>• High-strength requirements</li>
                  <li>• Specialized buildings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Calculation Process */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Calculation Process
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Calculation Steps
                </h3>
                <ol className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                    <span>Enter the length, width, and height dimensions of the project (unit: meters)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                    <span>Select the appropriate concrete grade (based on project requirements)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                    <span>Click the &quot;Start Calculation&quot; button to get results</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                    <span>View detailed material quantity list</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
                    <span>Optionally export calculation results as text file</span>
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Important Notes
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Calculation results are based on standard mix ratios, please consult professional engineers for actual construction</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>It is recommended to reserve 5-10% material allowance based on calculation results</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Material specifications may vary in different regions, please adjust according to local conditions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Mix ratio parameters need to be adjusted under special engineering conditions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Calculation results are for reference only, final usage is subject to actual construction</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Contact Us
            </h2>
            <p className="text-blue-100 mb-6">
              If you encounter any issues during use or have any suggestions, please feel free to contact us at any time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@concrete-calculator.com"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Send Email
              </a>
              <Link
                href="/calculator"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Try Calculator
              </Link>
              <Link
                href="/"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
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