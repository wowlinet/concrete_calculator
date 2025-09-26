import { Metadata } from 'next';

// 页面元数据
export const metadata: Metadata = {
  title: "Concrete Volume Calculator - Accurate Construction Material Estimation",
  description: "Professional concrete calculator for accurate volume estimation. Calculate cement, sand, gravel quantities for various construction projects including slabs, foundations, columns, and stairs.",
  keywords: ["concrete volume calculator", "construction calculator", "cement calculator", "building materials estimation", "concrete mix ratio", "construction planning"],
  alternates: {
    canonical: "/calculator",
  },
  openGraph: {
    title: "Concrete Volume Calculator - Professional Construction Tool",
    description: "Calculate concrete volume and material quantities for construction projects with our professional calculator tool.",
    url: "https://concrete-calculator.com/calculator",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}