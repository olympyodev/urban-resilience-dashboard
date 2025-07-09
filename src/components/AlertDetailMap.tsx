
import React from 'react';
import { MapPin, Building2, Route, Users } from 'lucide-react';

interface AlertDetailMapProps {
  alertId: string;
}

const AlertDetailMap: React.FC<AlertDetailMapProps> = ({ alertId }) => {
  // Infraestruturas críticas na área do alerta
  const criticalInfrastructure = [
    { id: 1, type: 'hospital', name: 'Hospital Central', x: 45, y: 35, icon: '🏥' },
    { id: 2, type: 'school', name: 'Escola Municipal', x: 65, y: 55, icon: '🏫' },
    { id: 3, type: 'bridge', name: 'Ponte Principal', x: 55, y: 70, icon: '🌉' },
  ];

  // Pontos de evacuação
  const evacuationPoints = [
    { id: 1, name: 'Centro Comunitário', x: 25, y: 25 },
    { id: 2, name: 'Estádio Municipal', x: 75, y: 20 },
  ];

  // Área de alerta (zona crítica)
  const alertZone = {
    x: 40,
    y: 45,
    width: 30,
    height: 25,
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
      {/* Mapa base focado */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-blue-200 to-gray-200">
        
        {/* Rio/curso d'água */}
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M 0 200 Q 150 180 300 200 Q 450 220 600 200"
            stroke="#3b82f6"
            strokeWidth="6"
            fill="none"
            opacity={0.8}
          />
        </svg>

        {/* Zona de alerta crítico */}
        <div
          className="absolute border-4 border-red-500 bg-red-500/30 animate-pulse rounded-lg"
          style={{
            left: `${alertZone.x}%`,
            top: `${alertZone.y}%`,
            width: `${alertZone.width}%`,
            height: `${alertZone.height}%`,
          }}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-red-700 bg-white px-2 py-1 rounded shadow">
            ZONA DE ALERTA
          </div>
        </div>

        {/* Infraestruturas críticas */}
        {criticalInfrastructure.map(item => (
          <div
            key={`infra-${item.id}`}
            className="absolute group"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
          >
            <div className="w-8 h-8 bg-red-600 border-2 border-white rounded-full flex items-center justify-center text-white font-bold shadow-lg cursor-pointer transform hover:scale-110 transition-transform">
              <Building2 className="h-4 w-4" />
            </div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.name}
            </div>
          </div>
        ))}

        {/* Pontos de evacuação */}
        {evacuationPoints.map(point => (
          <div
            key={`evacuation-${point.id}`}
            className="absolute group"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
            }}
          >
            <div className="w-6 h-6 bg-green-600 border-2 border-white rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer transform hover:scale-110 transition-transform">
              <Users className="h-3 w-3" />
            </div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {point.name}
            </div>
          </div>
        ))}

        {/* Rotas de evacuação (simuladas) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Rota 1 - da zona de alerta para ponto de evacuação 1 */}
          <path
            d={`M ${alertZone.x + alertZone.width/2}% ${alertZone.y}% L ${evacuationPoints[0].x}% ${evacuationPoints[0].y}%`}
            stroke="#22c55e"
            strokeWidth="3"
            strokeDasharray="8,4"
            fill="none"
            opacity={0.8}
          />
          {/* Rota 2 - da zona de alerta para ponto de evacuação 2 */}
          <path
            d={`M ${alertZone.x + alertZone.width}% ${alertZone.y + alertZone.height/2}% L ${evacuationPoints[1].x}% ${evacuationPoints[1].y}%`}
            stroke="#22c55e"
            strokeWidth="3"
            strokeDasharray="8,4"
            fill="none"
            opacity={0.8}
          />
        </svg>

        {/* Marcadores de nível d'água */}
        <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
          <div className="font-bold">Nível atual: 2.8m</div>
          <div className="text-xs">↗ Subindo 0.3 m/h</div>
        </div>

        {/* Legenda */}
        <div className="absolute top-4 right-4 bg-white/95 p-3 rounded-lg shadow-lg text-xs space-y-2">
          <div className="font-bold text-gray-800 mb-2">Legenda</div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span>Infraestrutura Crítica</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span>Ponto de Evacuação</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-green-500" style={{ borderTop: '2px dashed #22c55e' }}></div>
            <span>Rota de Fuga</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500/30 border border-red-500"></div>
            <span>Zona de Alerta</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDetailMap;
