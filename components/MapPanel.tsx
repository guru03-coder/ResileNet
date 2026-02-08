import React from 'react';
import { Plus, Minus, Navigation } from 'lucide-react';

export const MapPanel: React.FC = () => {
  return (
    <div className="w-[65%] h-full relative overflow-hidden rounded-br-[40px] bg-[#E5E9EC]">
      
      {/* Mock Map Background Visuals */}
      <div className="absolute inset-0 opacity-40" 
           style={{ 
             backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)', 
             backgroundSize: '30px 30px' 
           }}>
      </div>
      
      {/* Simulated Map Roads/Features (Abstract shapes) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <path d="M-50 400 Q 300 350 500 600 T 1000 500" fill="none" stroke="#94A3B8" strokeWidth="20" />
        <path d="M200 -50 Q 250 300 600 400 T 900 900" fill="none" stroke="#94A3B8" strokeWidth="15" />
        <path d="M600 -50 L 500 900" fill="none" stroke="#FFFFFF" strokeWidth="8" />
        <circle cx="500" cy="600" r="120" fill="#CBD5E1" opacity="0.5" />
      </svg>

      {/* Map Pins (Teardrops) */}
      <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 group">
        <div className="relative">
          <div className="w-12 h-12 bg-[#10B981] rounded-full rounded-br-none transform -rotate-45 shadow-xl flex items-center justify-center border-4 border-white z-20 relative transition-transform group-hover:-translate-y-2">
            <Navigation className="text-white transform rotate-45" size={20} fill="currentColor" />
          </div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/20 blur-sm rounded-full" />
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-bold text-gray-700">Sector 4A - Flood</span>
        </div>
      </div>

      <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 group">
        <div className="relative">
             <div className="w-10 h-10 bg-[#0EA5E9] rounded-full rounded-br-none transform -rotate-45 shadow-xl flex items-center justify-center border-4 border-white z-20 relative transition-transform group-hover:-translate-y-2">
                <div className="w-3 h-3 bg-white rounded-full transform rotate-45" />
             </div>
             <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-black/20 blur-sm rounded-full" />
        </div>
         <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-bold text-gray-700">Relay Node 7</span>
        </div>
      </div>

       <div className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 group">
        <div className="relative">
            <div className="w-10 h-10 bg-red-500 rounded-full rounded-br-none transform -rotate-45 shadow-xl flex items-center justify-center border-4 border-white z-20 relative transition-transform group-hover:-translate-y-2">
                <div className="w-3 h-3 bg-white rounded-full transform rotate-45" />
            </div>
             <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-black/20 blur-sm rounded-full" />
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-bold text-gray-700">Fire Hazard</span>
        </div>
      </div>


      {/* Zoom Controls Overlay */}
      <div className="absolute bottom-10 right-10 flex flex-col gap-2">
        <div className="bg-white p-3 rounded-xl shadow-lg hover:bg-gray-50 cursor-pointer transition">
            <Plus size={20} className="text-gray-600" />
        </div>
        <div className="bg-white p-3 rounded-xl shadow-lg hover:bg-gray-50 cursor-pointer transition">
            <Minus size={20} className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};