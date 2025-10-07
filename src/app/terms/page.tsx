import { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Concrete Calculator - Read our terms and conditions for using our concrete calculation tools and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <FileText className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Terms of Service
            </h1>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-sm text-muted-foreground">
              <strong>Last Updated:</strong> January 2025
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
              <p>
                Welcome to Concrete Calculator (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website, tools, and services (collectively, the &quot;Service&quot;).
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access or use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
              <p>
                Concrete Calculator provides online tools and calculators for estimating concrete volume, material quantities, and project costs for various construction applications including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Concrete volume calculations for slabs, footings, walls, columns, and other structures</li>
                <li>Material quantity estimations (cement, sand, gravel, water)</li>
                <li>Cost estimation tools</li>
                <li>Construction planning resources and information</li>
              </ul>
              <p className="mt-4">
                Our Service is provided free of charge for general use. We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>

              <h3 className="text-xl font-semibold text-foreground mb-3">3.1 Acceptable Use</h3>
              <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Service in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to any portion of the Service</li>
                <li>Interfere with or disrupt the Service or servers/networks connected to the Service</li>
                <li>Use automated systems (bots, scrapers, etc.) to access the Service without permission</li>
                <li>Transmit any viruses, malware, or other malicious code</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Collect or harvest information about other users without consent</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.2 Professional Consultation Required</h3>
              <p>
                <strong>IMPORTANT:</strong> Our calculators provide estimates only. You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Verifying all calculations and results</li>
                <li>Consulting with qualified professionals (engineers, contractors, architects) before making construction decisions</li>
                <li>Ensuring compliance with local building codes and regulations</li>
                <li>Obtaining necessary permits and approvals</li>
                <li>Using appropriate safety measures in all construction activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Disclaimer of Warranties</h2>
              <p>
                <strong>THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</strong>
              </p>
              <p>
                We specifically disclaim all warranties, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Accuracy:</strong> We do not warrant that calculations, estimates, or information provided are accurate, complete, or reliable</li>
                <li><strong>Availability:</strong> We do not guarantee uninterrupted or error-free operation of the Service</li>
                <li><strong>Fitness for Purpose:</strong> We do not warrant that the Service will meet your specific requirements</li>
                <li><strong>Merchantability:</strong> We make no warranties regarding the merchantability or fitness for a particular purpose</li>
                <li><strong>Non-Infringement:</strong> We do not warrant that use of the Service will not infringe third-party rights</li>
              </ul>
              <p className="mt-4 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 p-4 rounded">
                <strong>WARNING:</strong> Calculations provided by our Service are estimates only. Actual material requirements may vary based on site conditions, material properties, waste factors, and other variables. Always consult with qualified professionals and verify calculations before proceeding with construction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Limitation of Liability</h2>
              <p>
                <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, CONCRETE CALCULATOR SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Loss of profits, revenue, or business opportunities</li>
                <li>Loss of data or information</li>
                <li>Cost of substitute goods or services</li>
                <li>Property damage or personal injury</li>
                <li>Construction defects or failures</li>
                <li>Project delays or cost overruns</li>
                <li>Any other damages arising from use of or inability to use the Service</li>
              </ul>
              <p className="mt-4">
                This limitation applies regardless of the legal theory (contract, tort, negligence, strict liability, or otherwise) and whether or not we have been advised of the possibility of such damages.
              </p>
              <p className="mt-4">
                <strong>In jurisdictions that do not allow the exclusion or limitation of liability for consequential or incidental damages, our liability is limited to the maximum extent permitted by law.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Concrete Calculator, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use or misuse of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Your reliance on calculations or information provided by the Service</li>
                <li>Any construction project or activity based on Service outputs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Intellectual Property Rights</h2>

              <h3 className="text-xl font-semibold text-foreground mb-3">7.1 Our Intellectual Property</h3>
              <p>
                The Service and its original content, features, and functionality are owned by Concrete Calculator and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p>
                You may not copy, modify, distribute, sell, or lease any part of our Service or included software without our express written permission.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">7.2 User Content</h3>
              <p>
                Any data, calculations, or information you enter into the Service remains your property. By using the Service, you grant us a limited license to process this information solely to provide the Service to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Third-Party Links and Services</h2>
              <p>
                Our Service may contain links to third-party websites or services that are not owned or controlled by Concrete Calculator.
              </p>
              <p>
                We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. We do not warrant the offerings of these entities or individuals.
              </p>
              <p className="mt-4">
                You acknowledge and agree that Concrete Calculator shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of any such third-party content, goods, or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. User Accounts and Registration</h2>
              <p>
                Currently, Concrete Calculator does not require user account creation for basic calculator functionality. If we introduce account features in the future:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must provide accurate, current, and complete information</li>
                <li>You are responsible for maintaining account security</li>
                <li>You must notify us immediately of any unauthorized access</li>
                <li>You are responsible for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Privacy and Data Protection</h2>
              <p>
                Your use of the Service is also governed by our Privacy Policy, which describes how we collect, use, and protect your information. By using the Service, you consent to our collection and use of information as described in the Privacy Policy.
              </p>
              <p className="mt-4">
                Please review our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Termination</h2>
              <p>
                We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Breach of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Requests by law enforcement or government agencies</li>
                <li>Discontinuation or material modification of the Service</li>
              </ul>
              <p className="mt-4">
                Upon termination, your right to use the Service will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Geographic Restrictions</h2>
              <p>
                The Service is provided from the United States and is intended for users located in the United States. We make no claims that the Service is accessible, appropriate, or legal for use in other locations.
              </p>
              <p className="mt-4">
                If you access the Service from outside the United States, you do so on your own initiative and are responsible for compliance with local laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Governing Law and Dispute Resolution</h2>

              <h3 className="text-xl font-semibold text-foreground mb-3">13.1 Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United States and the State of [State], without regard to its conflict of law provisions.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">13.2 Dispute Resolution</h3>
              <p>
                Any disputes arising out of or relating to these Terms or the Service shall be resolved through:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Informal Negotiation:</strong> First, contact us to attempt to resolve the dispute informally</li>
                <li><strong>Arbitration:</strong> If informal resolution fails, disputes will be resolved by binding arbitration in accordance with the American Arbitration Association rules</li>
                <li><strong>Class Action Waiver:</strong> You agree to resolve disputes on an individual basis and waive any right to bring or participate in class actions</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">14. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time at our sole discretion. Material changes will be notified by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Posting the updated Terms on this page</li>
                <li>Updating the &quot;Last Updated&quot; date</li>
                <li>Providing notice through the Service or via email (if applicable)</li>
              </ul>
              <p className="mt-4">
                Your continued use of the Service after any changes constitutes acceptance of the new Terms. If you do not agree to the updated Terms, you must stop using the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">15. Severability</h2>
              <p>
                If any provision of these Terms is held to be invalid, illegal, or unenforceable, the validity, legality, and enforceability of the remaining provisions shall not be affected or impaired.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">16. Waiver</h2>
              <p>
                No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term. Our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">17. Entire Agreement</h2>
              <p>
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Concrete Calculator regarding the Service and supersede all prior agreements and understandings, whether written or oral.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">18. Professional Disclaimer</h2>
              <p className="bg-red-50 dark:bg-red-950 border-l-4 border-red-500 p-4 rounded">
                <strong>IMPORTANT PROFESSIONAL DISCLAIMER:</strong> Concrete Calculator is a computational tool only and does not provide professional engineering, architectural, or construction advice. Our Service:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Does NOT replace professional consultation with licensed engineers, architects, or contractors</li>
                <li>Does NOT guarantee structural integrity, safety, or code compliance</li>
                <li>Does NOT account for site-specific conditions, soil analysis, or environmental factors</li>
                <li>Does NOT provide recommendations for specific projects or applications</li>
              </ul>
              <p className="mt-4">
                <strong>You must consult with qualified professionals before making any construction decisions or beginning any construction project.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">19. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-muted/30 p-6 rounded-lg mt-4">
                <ul className="space-y-2">
                  <li><strong>Email:</strong> legal@concretecalculator.me</li>
                  <li><strong>Website:</strong> https://concretecalculator.me/contact</li>
                  <li><strong>Mail:</strong> Concrete Calculator Team, [Address to be provided]</li>
                </ul>
              </div>
            </section>

            <section className="border-t pt-8 mt-8">
              <p className="text-sm text-muted-foreground">
                By using Concrete Calculator, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
