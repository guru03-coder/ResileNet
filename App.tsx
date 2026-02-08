import React from 'react';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#EFF3F6] p-8 overflow-hidden">
      <Dashboard />
    </div>
  );
};

export default App;