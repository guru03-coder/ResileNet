import React, { useState } from 'react';
import { LayoutGrid, Plus, Flame, Ship, Target } from 'lucide-react';

interface FilterItem {
  id: string;
  label: string;
  count: number;
  icon: React.ElementType;
  activeColor?: string;
  alert?: boolean;
}

const FILTERS: FilterItem[] = [
  { id: 'all', label: 'All Units', count: 75, icon: LayoutGrid },
  { id: 'ambulance', label: 'Ambulance', count: 12, icon: Plus, activeColor: '#0EA5E9' }, // Teal
  { id: 'fire', label: 'Fire Engine', count: 4, icon: Flame },
  { id: 'boat', label: 'NDRF Boat', count: 8, icon: Ship },
  { id: 'drones', label: 'Drones', count: 14, icon: Target, alert: true },
];

export const DispatchFilterBar: React.FC = () => {
  const [activeId, setActiveId] = useState('ambulance');

  return (
    <div className="px-8 mt-6 mb-4">
      <div className="flex items-center gap-2">
        {FILTERS.map((item) => {
          const isActive = activeId === item.id;
          const Icon = item.icon;
          const activeColor = item.activeColor || '#10B981'; // Default Green, but Ambulance is Teal
          const activeBg = isActive ? (item.id === 'ambulance' ? 'bg-sky-50' : 'bg-green-50') : 'bg-transparent';
          const activeText = isActive ? (item.id === 'ambulance' ? 'text-[#0EA5E9]' : 'text-[#10B981]') : 'text-gray-400';
          const activeIndicator = isActive ? (item.id === 'ambulance' ? 'bg-[#0EA5E9]' : 'bg-[#10B981]') : '';

          return (
            <div 
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className="group flex flex-col items-center justify-center w-28 h-24 cursor-pointer relative"
            >
              <div className={`p-3 rounded-full transition-all duration-300 ${activeBg} ${!isActive && 'group-hover:bg-gray-50'}`}>
                <Icon 
                    size={26} 
                    className={`transition-colors duration-300 stroke-[1.5px] ${activeText} ${!isActive && (item.alert ? 'text-amber-500' : 'group-hover:text-gray-600')}`} 
                />
              </div>
              
              <div className="mt-2 flex items-center gap-1">
                <span className={`text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                    {item.label}
                </span>
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${item.alert ? 'text-amber-600 bg-amber-50' : (isActive ? (item.id === 'ambulance' ? 'text-[#0EA5E9] bg-sky-50' : 'text-[#10B981] bg-green-50') : 'text-gray-400 bg-gray-100')}`}>
                    {item.count}
                </span>
              </div>
              
              {/* Active Indicator Line */}
              {isActive && (
                <div className={`absolute bottom-0 w-12 h-1 rounded-t-full ${activeIndicator}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};