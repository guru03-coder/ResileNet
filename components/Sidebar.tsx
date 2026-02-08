import React from 'react';
import { MOCK_INCIDENTS } from '../constants';
import { ChevronDown, Clock, CheckCircle2 } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <div className="w-[35%] h-full flex flex-col p-8 border-r border-gray-100 bg-white rounded-bl-[40px] relative z-10">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Live Incidents</h2>
        <button className="flex items-center text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full hover:bg-gray-100 transition">
          Sort by: Priority <ChevronDown size={14} className="ml-1" />
        </button>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        {MOCK_INCIDENTS.map((incident) => (
          <div 
            key={incident.id} 
            className="group relative bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#10B981]/50 hover:shadow-[0_4px_20px_-10px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#10B981] transition-colors">
                  {incident.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  Monday 12.08, {incident.location}
                </p>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded bg-green-50 text-[#10B981]`}>
                {incident.severity}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <span className="flex items-center text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                <Clock size={12} className="mr-1" /> {incident.timeStart}
              </span>
              <span className="flex items-center text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                <Clock size={12} className="mr-1" /> {incident.timeEnd}
              </span>
              <span className="flex items-center text-xs text-[#10B981] bg-green-50 px-2 py-1 rounded-md ml-auto font-medium">
                <CheckCircle2 size={12} className="mr-1" /> {incident.status}
              </span>
            </div>
            
            {/* Active Border Glow Mock */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#10B981]/10 pointer-events-none" />
          </div>
        ))}
        
        {/* Placeholder for scroll feeling */}
        <div className="h-10"></div>
      </div>
    </div>
  );
};