
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Shield, Activity } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo e Título */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">RUI Platform</h1>
            <p className="text-sm text-gray-500">Resiliência Urbana Inteligente</p>
          </div>
        </div>

        {/* Status e Navegação */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">Sistema Online</span>
          </div>
          
          <Link 
            to="/management" 
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Settings className="h-4 w-4" />
            Gerenciamento
          </Link>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Última atualização: 14:35</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
