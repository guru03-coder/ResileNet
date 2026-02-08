import React from 'react';
import { MetricCardData } from '../types';
import { ArrowUp } from 'lucide-react';

interface FooterTickerProps {
  metrics: MetricCardData[];
}

export const FooterTicker: React.FC<FooterTickerProps> = ({ metrics }) => {
  return (
    <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 flex gap-6 w-full max-w-[90%] justify-center pointer-events-none">
      {metrics.map((metric, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl shadow-lg shadow-gray-200/50 p-4 flex items-center justify-between min-w-[200px] h-20 pointer-events-auto transition-transform hover:-translate-y-1 duration-300"
        >
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{metric.label}</span>
            <span 
                className="text-xl font-bold mt-1"
                style={{ color: metric.color ? metric.color : '#1F2937' }}
            >
                {metric.value}
            </span>
          </div>
          
          <div className="flex items-center justify-center">
            {metric.icon ? metric.icon : (
               <div className="bg-gray-50 p-2 rounded-full text-gray-400">
                   <ArrowUp size={20} className="transform rotate-45" />
               </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};