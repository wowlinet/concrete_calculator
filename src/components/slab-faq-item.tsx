'use client'

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SlabFAQItemProps {
  question: string;
  answer: string;
}

/**
 * 专门针对板块计算的FAQ项目组件
 * 提供展开/收起功能和平滑动画效果
 */
export default function SlabFAQItem({ question, answer }: SlabFAQItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={toggleExpanded}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
      >
        <h3 className="text-lg font-medium text-card-foreground pr-4">
          {question}
        </h3>
        <div className="flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground transition-transform duration-300" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-300" />
          )}
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4">
          <div className="pt-2 border-t border-border">
            <p className="text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}