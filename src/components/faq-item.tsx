"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-card-foreground">{question}</span>
        <ChevronDown 
          className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}