
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Droplets, Mountain } from 'lucide-react';

interface MapProps {
  activeLayers: string[];
  alertLevel: 'normal' | 'attention' | 'alert';
}

const Map: React.FC<MapProps> = ({ activeLayers, alertLevel }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [simulatedAlert, setSimulatedAlert] = useState(false);
  const navigate = useNavigate();

  // Simulated flood zones
  const floodZones = [
    { id: 1, name: 'Zona Norte', x: 30, y: 40, severity: 'medium' },
    { id: 2, name: 'Centro Histórico', x: 50, y: 60, severity: 'high' },
    { id: 3, name: 'Bairro Sul', x: 70, y: 30, severity: 'low' },
  ];

  // Simulated landslide zones
  const landslideZones = [
    { id: 1, name: 'Encosta Leste', x: 80, y: 20, severity: 'high' },
    { id: 2, name: 'Morro Central', x: 40, y: 80, severity: 'medium' },
  ];

  // Critical infrastructure
  const infrastructure = [
    { id: 1, type: 'hospital', name: 'Hospital Central', x: 45, y: 55 },
    { id: 2, type: 'school', name: 'Escola Municipal', x: 60, y: 40 },
    { id: 3, type: 'bridge', name: 'Ponte Principal', x: 55, y: 70 },
  ];

  const getZoneColor = (severity: string, isAlert: boolean) => {
    if (isAlert) {
      return severity === 'high' ? 'rgba(220, 38, 38, 0.8)' : 'rgba(251, 146, 60, 0.8)';
    }
    switch (severity) {
      case 'high': return 'rgba(220, 38, 38, 0.6)';
      case 'medium': return 'rgba(251, 146, 60, 0.6)';
      case 'low': return 'rgba(250, 204, 21, 0.6)';
      default: return 'rgba(156, 163, 175, 0.4)';
    }
  };

  const handleZoneClick = (zone: any, type: 'flood' | 'landslide') => {
    console.log('Zone clicked:', zone, 'Type:', type, 'Alert Level:', alertLevel, 'Simulated Alert:', simulatedAlert);
    
    // Sempre navegar para detalhes se houver um alerta ativo OU se for uma zona de alto risco
    const shouldNavigate = alertLevel === 'alert' || simulatedAlert || zone.severity === 'high';
    console.log('Should navigate:', shouldNavigate);
    
    if (shouldNavigate) {
      const alertId = type === 'flood' ? `flood-${zone.id}` : `landslide-${zone.id}`;
      console.log('Navigating to:', `/alert/${alertId}`);
      navigate(`/alert/${alertId}`);
    } else {
      console.log('Navigation blocked - conditions not met');
    }
  };

  useEffect(() => {
    console.log('Alert level changed:', alertLevel);
    if (alertLevel === 'alert') {
      setSimulatedAlert(true);
      const timer = setTimeout(() => {
        console.log('Resetting simulated alert');
        setSimulatedAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertLevel]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
      {/* Base map simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-blue-200 to-gray-200">
        {/* River simulation */}
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M 0 300 Q 200 250 400 300 Q 600 350 800 300"
            stroke="#3b82f6"
            strokeWidth="4"
            fill="none"
            opacity={activeLayers.includes('hidrografia') ? 1 : 0}
            className="transition-opacity duration-300"
          />
        </svg>

        {/* Flood zones */}
        {activeLayers.includes('inundacao') && floodZones.map(zone => (
          <div
            key={`flood-${zone.id}`}
            className={`absolute w-20 h-16 rounded-full transition-all duration-300 cursor-pointer hover:opacity-80 hover:scale-105 ${
              (simulatedAlert || alertLevel === 'alert') && zone.severity === 'high' ? 'animate-pulse' : ''
            }`}
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              backgroundColor: getZoneColor(zone.severity, (simulatedAlert || alertLevel === 'alert') && zone.severity === 'high'),
              border: (simulatedAlert || alertLevel === 'alert') && zone.severity === 'high' ? '3px solid #dc2626' : '2px solid rgba(255,255,255,0.3)',
            }}
            onClick={() => handleZoneClick(zone, 'flood')}
            title={`Clique para ver detalhes de ${zone.name} - Severidade: ${zone.severity}`}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
              <Droplets className="h-3 w-3 mx-auto" />
              {zone.name}
            </div>
          </div>
        ))}

        {/* Landslide zones */}
        {activeLayers.includes('deslizamento') && landslideZones.map(zone => (
          <div
            key={`landslide-${zone.id}`}
            className={`absolute w-16 h-20 rounded-lg transition-all duration-300 cursor-pointer hover:opacity-80 hover:scale-105 ${
              (simulatedAlert || alertLevel === 'alert') && zone.severity === 'high' ? 'animate-pulse' : ''
            }`}
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              backgroundColor: getZoneColor(zone.severity, (simulatedAlert || alertLevel === 'alert') && zone.severity === 'high'),
              border: (simulatedAlert || alertLevel === 'alert') && zone.severity === 'high' ? '3px solid #dc2626' : '2px solid rgba(255,255,255,0.3)',
            }}
            onClick={() => handleZoneClick(zone, 'landslide')}
            title={`Clique para ver detalhes de ${zone.name} - Severidade: ${zone.severity}`}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
              <Mountain className="h-3 w-3 mx-auto" />
              {zone.name}
            </div>
          </div>
        ))}

        {/* Infrastructure */}
        {activeLayers.includes('infraestrutura') && infrastructure.map(item => (
          <div
            key={`infra-${item.id}`}
            className="absolute w-4 h-4 bg-gray-800 rounded-full flex items-center justify-center"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap">
              {item.name}
            </div>
          </div>
        ))}

        {/* Topography lines */}
        {activeLayers.includes('topografia') && (
          <svg className="absolute inset-0 w-full h-full opacity-30">
            {[...Array(5)].map((_, i) => (
              <ellipse
                key={i}
                cx="50%"
                cy="50%"
                rx={`${20 + i * 15}%`}
                ry={`${15 + i * 10}%`}
                stroke="#8b5cf6"
                strokeWidth="1"
                fill="none"
              />
            ))}
          </svg>
        )}

        {/* Soil deformation points */}
        {activeLayers.includes('deformacao') && (
          <>
            <div className="absolute w-3 h-3 bg-red-500 rounded-full" style={{ left: '35%', top: '25%' }}>
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-red-600 font-bold">
                -2.3mm
              </div>
            </div>
            <div className="absolute w-3 h-3 bg-yellow-500 rounded-full" style={{ left: '65%', top: '45%' }}>
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-yellow-600 font-bold">
                +1.1mm
              </div>
            </div>
          </>
        )}
      </div>

      {/* Alert overlay */}
      {(simulatedAlert || alertLevel === 'alert') && (
        <div className="absolute inset-0 bg-red-500/20 animate-pulse flex items-center justify-center">
          <div className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-bold">ALERTA ATIVO - Clique nas zonas vermelhas para detalhes</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
