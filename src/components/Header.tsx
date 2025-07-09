
import React from 'react';
import { Settings, HelpCircle, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="h-16 bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg flex items-center justify-between px-6 text-white">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <Globe className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Resiliência Urbana Inteligente</h1>
          <p className="text-sm text-blue-100">Dashboard de Monitoramento Urbano</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
