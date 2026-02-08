import React, { useState } from 'react';
import { Home, Flame, Waves, HeartPulse, Wifi, Truck } from 'lucide-react';

interface FilterItem {
  id: string;
  label: string;
  count: number;
  icon: React.ElementType;
}

const FILTERS: FilterItem[] = [
  { id: 'all', label: 'All Sectors', count: 16, icon: Home },
  { id: 'fire', label: 'Fire', count: 4, icon: Flame },
  { id: 'flood', label: 'Flood', count: 11, icon: Waves },
  { id: 'medical', label: 'Medical', count: 87, icon: HeartPulse },
  { id: 'mesh', label: 'Mesh Nodes', count: 45, icon: Wifi },
  { id: 'logistics', label: 'Logistics', count: 14, icon: Truck },
];

export const FilterBar: React.FC = () => {
  const [activeId, setActiveId] = useState('fire');

  return (
    <div className="px-8 mt-6 mb-4">
      <div className="flex items-center gap-2">
        {FILTERS.map((item) => {
          const isActive = activeId === item.id;
          const Icon = item.icon;
          
          return (
            <div 
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className="group flex flex-col items-center justify-center w-28 h-24 cursor-pointer relative"
            >
              <div className={`p-3 rounded-full transition-all duration-300 ${isActive ? 'bg-green-50' : 'bg-transparent group-hover:bg-gray-50'}`}>
                <Icon 
                    size={28} 
                    className={`transition-colors duration-300 stroke-[1.5px] ${isActive ? 'text-[#10B981]' : 'text-gray-400 group-hover:text-gray-600'}`} 
                />
              </div>
              
              <div className="mt-2 flex items-center gap-1">
                <span className={`text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                    {item.label}
                </span>
                <span className="text-xs font-bold text-[#10B981] bg-green-50 px-1.5 py-0.5 rounded-full">
                    {item.count}
                </span>
              </div>
              
              {/* Active Indicator Line */}
              {isActive && (
                <div className="absolute bottom-0 w-12 h-1 bg-[#10B981] rounded-t-full" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};