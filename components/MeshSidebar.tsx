import React from 'react';
import { MOCK_NODES } from '../constants';
import { ChevronDown, Signal, Battery, Activity, ArrowRightLeft, Clock } from 'lucide-react';

export const MeshSidebar: React.FC = () => {
  return (
    <div className="w-[35%] h-full flex flex-col p-8 border-r border-gray-100 bg-white rounded-bl-[40px] relative z-10">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Active Network Nodes</h2>
        <button className="flex items-center text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full hover:bg-gray-100 transition">
          Sort by: Signal <ChevronDown size={14} className="ml-1" />
        </button>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        {MOCK_NODES.map((node) => (
          <div 
            key={node.id} 
            className={`group relative bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-[0_4px_20px_-10px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-pointer overflow-hidden ${node.status === 'active' ? 'hover:border-[#10B981]/50' : 'hover:border-red-200'}`}
          >
            {/* Active Left Border Strip */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2">
                 {/* Pulsing Dot */}
                 {node.status === 'active' && (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
                    </span>
                 )}
                 {node.status === 'offline' && <span className="h-2.5 w-2.5 rounded-full bg-red-400" />}
                 {node.status === 'warning' && <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />}

                 <h3 className="text-base font-bold text-gray-900 group-hover:text-[#10B981] transition-colors">
                   {node.name}
                 </h3>
              </div>
              
              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1 text-gray-400">
                    <Battery size={14} className={node.battery < 20 ? 'text-red-500' : 'text-[#10B981]'} />
                    <span className={`text-xs font-bold ${node.battery < 20 ? 'text-red-500' : 'text-gray-600'}`}>{node.battery}%</span>
                 </div>
                 <div className="flex items-center gap-1 text-gray-400">
                    <Signal size={14} className="text-[#10B981]" />
                    <span className="text-xs font-bold text-gray-600">{node.signal}/4</span>
                 </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 font-medium mb-4 pl-4">
              {node.location}
            </p>

            <div className="flex items-center gap-2 pl-4">
              <span className="flex items-center text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                <Activity size={10} className="mr-1 text-blue-400" /> Latency: {node.latency}
              </span>
              <span className="flex items-center text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                <ArrowRightLeft size={10} className="mr-1 text-purple-400" /> Hops: {node.hops}
              </span>
              <span className="flex items-center text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 ml-auto">
                <Clock size={10} className="mr-1 text-orange-400" /> {node.uptime}
              </span>
            </div>
          </div>
        ))}
        
        {/* Placeholder for scroll feeling */}
        <div className="h-10"></div>
      </div>
    </div>
  );
};