import React from 'react';
import { ArrowLeft, Search, Bell } from 'lucide-react';

interface HeaderProps {
  currentView: 'dashboard' | 'mesh' | 'dispatch' | 'map';
  onViewChange: (view: 'dashboard' | 'mesh' | 'dispatch' | 'map') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  
  const getPlaceholder = () => {
      switch(currentView) {
          case 'mesh': return "Search Node ID...";
          case 'dispatch': return "Search Unit ID...";
          case 'map': return "Search Taluk, Village, or PIN Code...";
          default: return "Search Sector 4...";
      }
  }

  return (
    <div className="relative w-full h-24 flex z-20">
      
      {/* Top Left: Logo & Search */}
      <div className="w-[50%] h-full flex items-center px-8 gap-8">
        
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
             <ArrowLeft size={20} className="text-gray-600" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-[#10B981]">
            Resile<span className="text-gray-800">Net</span>
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
           <input 
             type="text" 
             placeholder={getPlaceholder()}
             className="w-full h-12 pl-12 pr-4 rounded-full bg-gray-50 border-none focus:ring-2 focus:ring-[#10B981]/20 focus:bg-white transition-all text-sm font-medium text-gray-700 placeholder-gray-400 outline-none"
           />
        </div>

      </div>

      {/* Top Right: Green Header Block */}
      <div className="absolute top-0 right-0 h-24 bg-[#10B981] w-[50%] rounded-tr-[40px] rounded-bl-[40px] flex items-center justify-between px-10 shadow-lg z-20">
          
          <nav className="flex gap-8 text-white/90 text-sm font-medium">
             <button 
                onClick={() => onViewChange('dashboard')}
                className={`transition-all hover:scale-105 ${currentView === 'dashboard' ? 'text-white font-bold border-b-2 border-white pb-1' : 'hover:text-white'}`}
             >
                Dashboard
             </button>
             <button 
                onClick={() => onViewChange('mesh')}
                className={`transition-all hover:scale-105 ${currentView === 'mesh' ? 'text-white font-bold border-b-2 border-white pb-1' : 'hover:text-white'}`}
             >
                Mesh Grid
             </button>
             <button 
                onClick={() => onViewChange('dispatch')}
                className={`transition-all hover:scale-105 ${currentView === 'dispatch' ? 'text-white font-bold border-b-2 border-white pb-1' : 'hover:text-white'}`}
             >
                Dispatch
             </button>
             <button 
                onClick={() => onViewChange('map')}
                className={`transition-all hover:scale-105 ${currentView === 'map' ? 'text-white font-bold border-b-2 border-white pb-1' : 'hover:text-white'}`}
             >
                Map
             </button>
          </nav>
          
          <div className="flex items-center gap-6">
             <div className="relative cursor-pointer">
                <Bell className="text-white w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full border border-[#10B981]"></div>
             </div>
             
             <div className="flex items-center gap-3 pl-6 border-l border-white/20">
                <div className="text-right hidden xl:block">
                    <p className="text-white text-xs font-bold">Ops Commander</p>
                    <p className="text-white/70 text-[10px]">Sector 4 HQ</p>
                </div>
                <img 
                  src="https://picsum.photos/200" 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full border-2 border-white/30 object-cover cursor-pointer hover:border-white transition" 
                />
             </div>
          </div>
      
      </div>

    </div>
  );
};