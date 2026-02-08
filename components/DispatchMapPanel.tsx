import React from 'react';
import { Plus, Minus, Navigation, Video } from 'lucide-react';

export const DispatchMapPanel: React.FC = () => {
  return (
    <div className="w-[65%] h-full relative overflow-hidden rounded-br-[40px] bg-[#E5E9EC]">
      
      {/* Light Mode Map Background Pattern */}
      <div className="absolute inset-0 opacity-50" 
           style={{ 
             backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>
      
      {/* Map Roads & Routes SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {/* Roads */}
        <path d="M-50 400 Q 300 350 500 600 T 1000 500" fill="none" stroke="white" strokeWidth="25" />
        <path d="M200 -50 Q 250 300 600 400 T 900 900" fill="none" stroke="white" strokeWidth="20" />
        
        {/* Blocked Zone Overlay */}
        <path d="M200 -50 Q 250 150 280 200" fill="none" stroke="#EF4444" strokeWidth="20" strokeOpacity="0.3" />

        {/* Active Route Path (Blue) */}
        <path d="M300 350 L 500 600" fill="none" stroke="#0EA5E9" strokeWidth="4" strokeDasharray="8 4" className="animate-[dash_1s_linear_infinite]">
            <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite" />
        </path>

        <circle cx="500" cy="600" r="15" fill="#EF4444" fillOpacity="0.2">
             <animate attributeName="r" values="15;30;15" dur="2s" repeatCount="indefinite" />
             <animate attributeName="fill-opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="500" cy="600" r="8" fill="#EF4444" stroke="white" strokeWidth="2" />
      </svg>

      {/* Moving Assets */}
      
      {/* Ambulance */}
      <div className="absolute top-[45%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-[5000ms] ease-linear">
         <div className="relative group">
            <div className="w-10 h-10 bg-[#0EA5E9] rounded-full flex items-center justify-center border-4 border-white shadow-xl z-20">
               <Plus className="text-white" size={16} strokeWidth={4} />
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-2 py-1 rounded text-[10px] font-bold shadow-md whitespace-nowrap">
               Amb-04
            </div>
         </div>
      </div>

      {/* Fire Truck */}
      <div className="absolute top-[10%] left-[60%] transform -translate-x-1/2 -translate-y-1/2">
         <div className="relative group cursor-pointer hover:scale-110 transition-transform">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl z-20">
               <div className="w-4 h-4 bg-white mask-flame" style={{ maskImage: 'url(https://esm.sh/lucide-static/icons/flame.svg)', WebkitMaskImage: 'url(https://esm.sh/lucide-static/icons/flame.svg)', maskSize: 'cover', backgroundColor: 'white' }}></div>
            </div>
         </div>
      </div>


      {/* Overlay: Active Missions */}
      <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl px-5 py-3 shadow-lg flex items-center gap-4">
         <div>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Active Missions</p>
            <p className="text-[#0EA5E9] font-black text-2xl leading-none">12</p>
         </div>
         <div className="h-8 w-[1px] bg-gray-200" />
         <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600">A</div>
            <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-white flex items-center justify-center text-xs font-bold text-red-600">F</div>
            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">+2</div>
         </div>
      </div>

      {/* Overlay: Drone Feed PIP */}
      <div className="absolute bottom-6 right-20 w-48 h-32 bg-black rounded-xl overflow-hidden border-2 border-white shadow-2xl group cursor-pointer">
         <div className="absolute inset-0 opacity-60">
             <img src="https://picsum.photos/300/200?grayscale" alt="Drone Feed" className="w-full h-full object-cover" />
         </div>
         <div className="absolute top-2 left-2 flex items-center gap-1.5">
             <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
             <span className="text-white text-[10px] font-bold tracking-widest uppercase text-shadow">Drone-01 Live</span>
         </div>
         <div className="absolute bottom-2 right-2 bg-black/50 p-1 rounded">
             <Video size={12} className="text-white" />
         </div>
         
         {/* Grid Overlay */}
         <div className="absolute inset-0 border border-white/10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <div className="bg-white p-2.5 rounded-xl shadow-lg hover:bg-gray-50 cursor-pointer transition">
            <Plus size={18} className="text-gray-600" />
        </div>
        <div className="bg-white p-2.5 rounded-xl shadow-lg hover:bg-gray-50 cursor-pointer transition">
            <Minus size={18} className="text-gray-600" />
        </div>
      </div>

    </div>
  );
};