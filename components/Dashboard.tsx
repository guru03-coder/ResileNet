import React, { useState } from 'react';
import { Header } from './Header';
import { FilterBar } from './FilterBar';
import { MeshFilterBar } from './MeshFilterBar';
import { DispatchFilterBar } from './DispatchFilterBar';
import { MapFilterBar } from './MapFilterBar';
import { Sidebar } from './Sidebar';
import { MeshSidebar } from './MeshSidebar';
import { DispatchSidebar } from './DispatchSidebar';
import { MapSidebar } from './MapSidebar';
import { MapPanel } from './MapPanel';
import { TopologyPanel } from './TopologyPanel';
import { DispatchMapPanel } from './DispatchMapPanel';
import { MapGodViewPanel } from './MapGodViewPanel';
import { FooterTicker } from './FooterTicker';
import { MESH_METRICS, DISPATCH_METRICS, MAP_METRICS } from '../constants';

export const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'mesh' | 'dispatch' | 'map'>('map');

  // Helper to render the correct filter bar
  const renderFilterBar = () => {
    switch(currentView) {
      case 'dashboard': return <FilterBar />;
      case 'mesh': return <MeshFilterBar />;
      case 'dispatch': return <DispatchFilterBar />;
      case 'map': return <MapFilterBar />;
    }
  };

  // Helper to render the correct sidebar
  const renderSidebar = () => {
    switch(currentView) {
      case 'dashboard': return <Sidebar />;
      case 'mesh': return <MeshSidebar />;
      case 'dispatch': return <DispatchSidebar />;
      case 'map': return <MapSidebar />;
    }
  };

  // Helper to render the correct main panel
  const renderMainPanel = () => {
    switch(currentView) {
      case 'dashboard': return <MapPanel />;
      case 'mesh': return <TopologyPanel />;
      case 'dispatch': return <DispatchMapPanel />;
      case 'map': return <MapGodViewPanel />;
    }
  };

  return (
    <div className="relative w-full max-w-[1440px] h-[85vh] bg-white rounded-[40px] shadow-[0px_40px_100px_-20px_rgba(0,0,0,0.1)] flex flex-col overflow-visible">
      
      {/* Top Section */}
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      {/* Dynamic Filter Bar */}
      {renderFilterBar()}
      
      {/* Main Content Split */}
      <div className="flex flex-1 w-full overflow-hidden rounded-b-[40px]">
        {renderSidebar()}
        {renderMainPanel()}
      </div>

      {/* Floating Footer - Show in Mesh, Dispatch and Map views based on requests */}
      {currentView === 'mesh' && <FooterTicker metrics={MESH_METRICS} />}
      {currentView === 'dispatch' && <FooterTicker metrics={DISPATCH_METRICS} />}
      {currentView === 'map' && <FooterTicker metrics={MAP_METRICS} />}

    </div>
  );
};