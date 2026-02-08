import React, { useState } from 'react';
import { ChevronDown, MapPin, CloudRain, ShieldAlert, Plus, Wind } from 'lucide-react';

export const MapSidebar: React.FC = () => {
  const [weatherActive, setWeatherActive] = useState(false);

  const toggleWeather = () => {
    const newState = !weatherActive;
    setWeatherActive(newState);
    // Dispatch custom event to MapGodViewPanel
    const event = new CustomEvent('map-layer-toggle', { 
        detail: { layer: 'weather', active: newState } 
    });
    window.dispatchEvent(event);
  };

  const flyToLocation = (coords: [number, number], zoom: number) => {
    const event = new CustomEvent('map-fly-to', {
        detail: { coords, zoom }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="w-[30%] h-full flex flex-col p-8 border-r border-gray-100 bg-white rounded-bl-[40px] relative z-10">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-gray-800">Geospatial Layers</h2>
        <button className="text-gray-400 hover:text-gray-600 transition">
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Control Cards Stack */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        
        {/* Card 1: Region Info */}
        <div 
          onClick={() => flyToLocation([12.8406, 80.1534], 16)} // Reset to VIT Chennai Center
          className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-blue-100 hover:shadow-md transition-all cursor-pointer group"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-500 group-hover:bg-blue-100 transition">
                    <MapPin size={20} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-900">Campus: VIT Chennai</h3>
                    <p className="text-xs text-gray-500">Mambakkam, Tamil Nadu</p>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Risk Level</p>
                    <p className="text-red-500 font-bold text-sm">High</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Population</p>
                    <p className="text-gray-800 font-bold text-sm">12K+</p>
                </div>
            </div>
        </div>

        {/* Card 2: Weather Overlay */}
        <div 
            onClick={toggleWeather}
            className={`bg-white border rounded-2xl p-5 shadow-sm transition-all cursor-pointer ${weatherActive ? 'border-blue-200 ring-1 ring-blue-100' : 'border-gray-100'}`}
        >
             <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <CloudRain size={16} className={weatherActive ? 'text-blue-500' : 'text-gray-500'} />
                    <h3 className="text-sm font-bold text-gray-800">Weather Overlay</h3>
                </div>
                <div className={`w-8 h-4 rounded-full relative transition-colors ${weatherActive ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${weatherActive ? 'right-0.5' : 'left-0.5'}`} />
                </div>
             </div>
             
             {weatherActive && (
                 <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="h-24 w-full bg-blue-50 rounded-xl mt-3 relative overflow-hidden flex items-end justify-between px-2 pb-2">
                        {/* Mini Chart Bars */}
                        <div className="w-2 h-4 bg-blue-300 rounded-sm" />
                        <div className="w-2 h-8 bg-blue-400 rounded-sm" />
                        <div className="w-2 h-12 bg-blue-500 rounded-sm" />
                        <div className="w-2 h-16 bg-blue-600 rounded-sm" />
                        <div className="w-2 h-10 bg-blue-500 rounded-sm" />
                        <div className="w-2 h-6 bg-blue-400 rounded-sm" />
                        <div className="w-2 h-3 bg-blue-300 rounded-sm" />

                        <div className="absolute top-2 left-3 flex items-center gap-1">
                            <Wind size={12} className="text-blue-600" />
                            <span className="text-xs font-bold text-blue-800">24mm/hr</span>
                        </div>
                        <div className="absolute top-2 right-2">
                            <span className="flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        </div>
                    </div>
                    <p className="text-xs text-red-500 font-medium mt-2 flex items-center gap-1">
                        <span className="animate-pulse">●</span> Live Radar Active
                    </p>
                 </div>
             )}
             {!weatherActive && <p className="text-xs text-gray-400 mt-2">Tap to toggle precipitation radar.</p>}
        </div>

        {/* Card 3: Geofences */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <ShieldAlert size={16} className="text-gray-500" />
                    <h3 className="text-sm font-bold text-gray-800">Geofences</h3>
                </div>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">2 Active</span>
            </div>
            
            <ul className="space-y-2 mb-4">
                <li 
                    onClick={(e) => { e.stopPropagation(); flyToLocation([12.8420, 80.1520], 17); }}
                    className="flex items-center justify-between text-xs font-medium text-gray-600 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"/> Assembly Point (Sports)</span>
                    <span className="text-gray-400">1.2km²</span>
                </li>
                <li 
                    onClick={(e) => { e.stopPropagation(); flyToLocation([12.8450, 80.1520], 17); }}
                    className="flex items-center justify-between text-xs font-medium text-gray-600 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/> Flooded Zone (North)</span>
                    <span className="text-gray-400">0.5km²</span>
                </li>
            </ul>

            <button className="w-full py-2 border border-dashed border-gray-300 rounded-xl text-gray-500 text-xs font-bold hover:bg-gray-50 hover:border-gray-400 transition flex items-center justify-center gap-2">
                <Plus size={14} /> Draw New Fence
            </button>
        </div>

      </div>
    </div>
  );
};