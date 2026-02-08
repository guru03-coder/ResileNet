import React from 'react';
import { Plus, Minus, Maximize, RefreshCw } from 'lucide-react';

export const TopologyPanel: React.FC = () => {
  return (
    <div className="w-[65%] h-full relative overflow-hidden rounded-br-[40px] bg-[#1E293B]">
      
      {/* Dark Grid Background */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      
      {/* SVG Topology Graph */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
            {/* Gradient for Lines */}
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
            </linearGradient>
        </defs>

        {/* Connections */}
        <g stroke="url(#lineGradient)" strokeWidth="1">
            {/* Gateway 1 Connections */}
            <line x1="200" y1="200" x2="350" y2="100" />
            <line x1="200" y1="200" x2="350" y2="300" />
            <line x1="200" y1="200" x2="100" y2="300" />
            
            {/* Gateway 2 Connections */}
            <line x1="600" y1="400" x2="350" y2="300" />
            <line x1="600" y1="400" x2="700" y2="200" />
            <line x1="600" y1="400" x2="800" y2="500" />
            
            {/* Relay Connections */}
            <line x1="350" y1="100" x2="500" y2="50" />
            <line x1="350" y1="300" x2="500" y2="250" />
        </g>

        {/* Animated Packets */}
        <circle r="2" fill="white">
            <animateMotion dur="2s" repeatCount="indefinite" path="M200,200 L350,100" />
        </circle>
        <circle r="2" fill="white">
            <animateMotion dur="3s" repeatCount="indefinite" begin="0.5s" path="M200,200 L350,300" />
        </circle>
        <circle r="2" fill="white">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M600,400 L350,300" />
        </circle>
        <circle r="2" fill="white">
            <animateMotion dur="4s" repeatCount="indefinite" path="M600,400 L800,500" />
        </circle>

        {/* Nodes */}
        {/* Gateway 1 */}
        <g transform="translate(200, 200)">
            <circle r="30" fill="#10B981" opacity="0.2">
                <animate attributeName="r" values="30;40;30" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle r="12" fill="#10B981" />
            <circle r="4" fill="white" />
        </g>

        {/* Gateway 2 */}
        <g transform="translate(600, 400)">
            <circle r="30" fill="#10B981" opacity="0.2">
                <animate attributeName="r" values="30;40;30" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0;0.2" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle r="12" fill="#10B981" />
            <circle r="4" fill="white" />
        </g>

        {/* Relays & Mobiles (White Dots) */}
        <circle cx="350" cy="100" r="6" fill="white" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        <circle cx="350" cy="300" r="6" fill="white" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        <circle cx="100" cy="300" r="6" fill="white" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        <circle cx="700" cy="200" r="6" fill="white" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        <circle cx="800" cy="500" r="6" fill="white" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        <circle cx="500" cy="50" r="4" fill="#94A3B8" /> {/* Weak Node */}
        <circle cx="500" cy="250" r="4" fill="#94A3B8" />
        
        {/* Offline Node (Red) */}
        <g transform="translate(750, 100)">
            <circle r="8" fill="#EF4444" />
            <text x="0" y="20" fontSize="10" fill="#EF4444" textAnchor="middle">Offline</text>
        </g>

      </svg>

      {/* Floating UI: Mesh Health */}
      <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3 shadow-xl">
         <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#10B981] shadow-[0_0_10px_#10B981]" />
            <div>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Mesh Health</p>
                <p className="text-white font-bold text-sm">Excellent</p>
            </div>
         </div>
      </div>

      {/* Floating UI: Controls */}
      <div className="absolute bottom-10 right-10 flex items-end gap-4">
        
        {/* Auto Heal Button */}
        <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-4 py-3 rounded-xl flex items-center gap-2 transition-all font-semibold text-sm group">
            <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-700" /> Auto-Heal
        </button>

        {/* Zoom Controls */}
        <div className="flex flex-col gap-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl hover:bg-white/20 cursor-pointer transition">
                <Plus size={20} className="text-white" />
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl hover:bg-white/20 cursor-pointer transition">
                <Minus size={20} className="text-white" />
            </div>
        </div>
      </div>

      {/* Floating UI: Legend */}
      <div className="absolute bottom-10 left-10 flex gap-4">
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="text-white/60 text-xs font-medium">Gateway</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white" />
            <span className="text-white/60 text-xs font-medium">Relay</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span className="text-white/60 text-xs font-medium">Offline</span>
         </div>
      </div>

    </div>
  );
};