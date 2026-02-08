import React, { useState } from 'react';
import { Layers, Mountain, Waves, Share2, Box } from 'lucide-react';

interface LayerToggle {
  id: string;
  label: string;
  active: boolean;
  color: string;
}

export const MapFilterBar: React.FC = () => {
  const [layers, setLayers] = useState<LayerToggle[]>([
    { id: 'satellite', label: 'Satellite', active: false, color: 'text-gray-600' },
    { id: 'terrain', label: 'Terrain', active: false, color: 'text-gray-600' },
    { id: 'flood', label: 'Flood Heatmap', active: true, color: 'text-orange-500' },
    { id: 'mesh', label: 'Mesh Topology', active: true, color: 'text-[#10B981]' },
    { id: 'resources', label: 'Resources', active: true, color: 'text-blue-500' },
  ]);

  const toggleLayer = (id: string) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, active: !layer.active } : layer
    ));
  };

  return (
    <div className="px-8 mt-6 mb-4 h-24 flex items-center">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 mr-4">
           <Layers className="text-gray-400" size={20} />
           <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Map Layers</span>
        </div>
        
        {layers.map((layer) => {
          return (
            <button
              key={layer.id}
              onClick={() => toggleLayer(layer.id)}
              className={`
                relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
                ${layer.active 
                  ? `bg-white shadow-md border-transparent ${layer.color}` 
                  : 'bg-transparent border-gray-200 text-gray-400 hover:border-gray-300'}
              `}
            >
              <div className="flex items-center gap-2">
                {layer.id === 'satellite' && <Box size={14} />}
                {layer.id === 'terrain' && <Mountain size={14} />}
                {layer.id === 'flood' && <Waves size={14} />}
                {layer.id === 'mesh' && <Share2 size={14} />}
                {layer.id === 'resources' && <Box size={14} />}
                {layer.label}
              </div>
              
              {/* Active Dot */}
              {layer.active && (
                <span className={`absolute -top-1 -right-1 flex h-3 w-3`}>
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 bg-current`}></span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};