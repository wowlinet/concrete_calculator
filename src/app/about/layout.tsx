import { Metadata } from 'next';

// 页面元数据
export const metadata: Metadata = {
  title: "About Concrete Calculator - Professional Construction Tool",
  description: "Learn about our professional concrete calculator tool. Based on national building standards, providing accurate concrete volume calculations for construction projects with reliable material quantity estimation.",
  keywords: ["about concrete calculator", "construction tool", "building standards", "concrete calculation", "construction engineering", "material estimation"],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Concrete Calculator - Professional Construction Tool",
    description: "Learn about our professional concrete calculator based on national building standards for accurate construction material estimation.",
    url: "https://concrete-calculator.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}