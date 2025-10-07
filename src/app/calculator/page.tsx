import { Metadata } from 'next';
import CalculatorClient from '@/components/calculator-client';

export const metadata: Metadata = {
  title: 'Concrete Calculator Tool - Calculate Volume & Materials',
  description: 'Use our advanced concrete calculator to determine exact volume, material quantities and costs for your construction project. Supports multiple project types and units.',
  keywords: 'concrete calculator tool, volume calculator, material calculator, construction calculator, concrete estimation tool, building calculator',
  openGraph: {
    title: 'Concrete Calculator Tool - Calculate Volume & Materials',
    description: 'Use our advanced concrete calculator to determine exact volume, material quantities and costs for your construction project. Supports multiple project types and units.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concrete Calculator Tool - Calculate Volume & Materials',
    description: 'Use our advanced concrete calculator to determine exact volume, material quantities and costs for your construction project. Supports multiple project types and units.',
  },
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}