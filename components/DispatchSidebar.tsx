import React from 'react';
import { DISPATCH_ASSIGNMENTS } from '../constants';
import { ChevronDown, Clock, MapPin, MoreHorizontal } from 'lucide-react';

export const DispatchSidebar: React.FC = () => {
  return (
    <div className="w-[35%] h-full flex flex-col p-8 border-r border-gray-100 bg-white rounded-bl-[40px] relative z-10">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Pending Assignments</h2>
        <button className="flex items-center text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full hover:bg-gray-100 transition">
          Sort by: Urgency <ChevronDown size={14} className="ml-1" />
        </button>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        {DISPATCH_ASSIGNMENTS.map((task) => (
          <div 
            key={task.id} 
            className="group relative bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 overflow-hidden"
          >
            {/* Color Coded Border Strip */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${task.urgency === 'critical' ? 'bg-red-500' : (task.urgency === 'high' ? 'bg-orange-400' : 'bg-yellow-400')}`} />

            <div className="flex justify-between items-start mb-3 pl-2">
              <div>
                <h3 className="text-base font-bold text-gray-900 leading-tight">
                  {task.title}
                </h3>
                <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 font-medium">
                  <span>{task.subtitle}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full mx-1"></span>
                  <span className="flex items-center"><MapPin size={10} className="mr-0.5" /> {task.distance}</span>
                </div>
              </div>
              <button className="p-1 rounded-full hover:bg-gray-100 text-gray-400">
                <MoreHorizontal size={16} />
              </button>
            </div>

            <div className="flex items-center justify-between pl-2 mt-4">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">ETA Required</span>
                    <span className={`text-xs font-bold flex items-center mt-0.5 ${task.urgency === 'critical' ? 'text-red-500' : 'text-orange-500'}`}>
                        <Clock size={12} className="mr-1" /> {task.eta}
                    </span>
                </div>

                <button className="group/btn relative px-6 py-2 rounded-full border border-[#0EA5E9] text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white transition-all text-xs font-bold tracking-wide uppercase overflow-hidden">
                    <span className="relative z-10">Assign</span>
                </button>
            </div>
          </div>
        ))}
        
        {/* Placeholder for scroll feeling */}
        <div className="h-10"></div>
      </div>
    </div>
  );
};