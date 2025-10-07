import { Metadata } from "next";
import { Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Concrete Calculator - We're here to help with your concrete calculation needs and answer any questions.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about our concrete calculator? Need help with your calculations? We&apos;re here to assist you.
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-8">
            {/* Contact Form */}
            <div className="bg-card rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-card-foreground mb-6">
                Send Us a Message
              </h2>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="calculator-help">Calculator Help</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="feature-request">Feature Request</option>
                    <option value="bug-report">Bug Report</option>
                    <option value="business">Business/Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </button>

                <p className="text-sm text-muted-foreground text-center">
                  We typically respond within 24-48 hours during business days.
                </p>
              </form>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-muted/30 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Other Ways to Connect
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Report a Bug
                </h3>
                <p className="text-muted-foreground text-sm">
                  Found a technical issue? Help us improve by reporting bugs to{" "}
                  <a href="mailto:bugs@concretecalculator.me" className="text-primary hover:underline">
                    bugs@concretecalculator.me
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Feature Suggestions
                </h3>
                <p className="text-muted-foreground text-sm">
                  Have ideas for new features? We&apos;d love to hear them at{" "}
                  <a href="mailto:features@concretecalculator.me" className="text-primary hover:underline">
                    features@concretecalculator.me
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Business Partnerships
                </h3>
                <p className="text-muted-foreground text-sm">
                  Interested in partnering with us? Contact our business team at{" "}
                  <a href="mailto:partnerships@concretecalculator.me" className="text-primary hover:underline">
                    partnerships@concretecalculator.me
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
