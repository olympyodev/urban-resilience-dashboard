
import React, { useState } from 'react';
import Header from '@/components/Header';
import Map from '@/components/Map';
import SidePanel from '@/components/SidePanel';

const Index = () => {
  const [alertLevel, setAlertLevel] = useState<'normal' | 'attention' | 'alert'>('normal');
  const [activeLayers, setActiveLayers] = useState<string[]>(['inundacao', 'infraestrutura']);

  const handleLayerToggle = (layer: string) => {
    setActiveLayers(prev => 
      prev.includes(layer) 
        ? prev.filter(l => l !== layer)
        : [...prev, layer]
    );
  };

  const handleSimulateAlert = () => {
    if (alertLevel === 'alert') {
      setAlertLevel('normal');
    } else {
      setAlertLevel('alert');
    }
    
    // Automatically reset after 5 seconds
    if (alertLevel !== 'alert') {
      setTimeout(() => setAlertLevel('normal'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        {/* Main Map Area */}
        <div className="flex-1 p-4">
          <div className="h-full min-h-[600px] bg-white rounded-lg shadow-sm border overflow-hidden">
            <Map 
              activeLayers={activeLayers} 
              alertLevel={alertLevel}
            />
          </div>
        </div>

        {/* Side Panel */}
        <SidePanel 
          alertLevel={alertLevel}
          activeLayers={activeLayers}
          onLayerToggle={handleLayerToggle}
          onSimulateAlert={handleSimulateAlert}
        />
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p className="text-sm">
          Plataforma RUI - Resiliência Urbana Inteligente | 
          Monitoramento em tempo real para cidades mais seguras
        </p>
      </footer>
    </div>
  );
};

export default Index;
