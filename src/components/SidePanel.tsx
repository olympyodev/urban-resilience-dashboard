
import React from 'react';
import { AlertTriangle, Droplets, Thermometer, Calendar, Activity, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface SidePanelProps {
  alertLevel: 'normal' | 'attention' | 'alert';
  activeLayers: string[];
  onLayerToggle: (layer: string) => void;
  onSimulateAlert: () => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ 
  alertLevel, 
  activeLayers, 
  onLayerToggle,
  onSimulateAlert 
}) => {
  const getAlertStatus = () => {
    switch (alertLevel) {
      case 'alert':
        return { text: 'ALERTA', color: 'destructive', cause: 'Chuvas Intensas' };
      case 'attention':
        return { text: 'ATENÇÃO', color: 'secondary', cause: 'Saturação do Solo' };
      default:
        return { text: 'NORMAL', color: 'default', cause: 'Monitoramento Ativo' };
    }
  };

  const status = getAlertStatus();

  const layers = [
    { id: 'inundacao', name: 'Áreas de Inundação', icon: Droplets },
    { id: 'deslizamento', name: 'Áreas de Deslizamento', icon: AlertTriangle },
    { id: 'topografia', name: 'Topografia', icon: Activity },
    { id: 'hidrografia', name: 'Hidrografia', icon: Droplets },
    { id: 'infraestrutura', name: 'Infraestruturas', icon: Calendar },
    { id: 'deformacao', name: 'Deformação Solo', icon: Thermometer },
  ];

  return (
    <div className="w-80 bg-white shadow-lg p-4 space-y-4 overflow-y-auto">
      {/* Alert Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Resumo de Alerta</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status:</span>
            <Badge variant={status.color as any}>{status.text}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Causa:</span>
            <span className="text-sm text-gray-600">{status.cause}</span>
          </div>
          <div>
            <span className="text-sm font-medium">Áreas Afetadas:</span>
            <div className="text-sm text-gray-600 mt-1">
              {alertLevel === 'alert' ? 'Centro Histórico, Zona Norte' : 'Nenhuma área em risco imediato'}
            </div>
          </div>
          
          {/* Simulate Alert Button */}
          <button
            onClick={onSimulateAlert}
            className="w-full mt-3 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Simular Alerta
          </button>
        </CardContent>
      </Card>

      {/* Recent Data */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Dados Recentes</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Droplets className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-blue-600">45mm</div>
              <div className="text-xs text-gray-600">Precipitação (24h)</div>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <Thermometer className="h-6 w-6 text-amber-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-amber-600">78%</div>
              <div className="text-xs text-gray-600">Umidade Solo</div>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <div className="text-sm font-medium mb-1">Última Detecção Deformação:</div>
            <div className="text-sm text-gray-600">Hoje às 14:30 - Magnitude: 2.3mm</div>
          </div>
          
          <div className="pt-2 border-t">
            <div className="text-sm font-medium mb-1">Previsão IA:</div>
            <div className="text-sm text-gray-600">
              Probabilidade de inundação nas próximas 6h: {alertLevel === 'alert' ? '85%' : '15%'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layer Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Controles de Camadas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {layers.map((layer) => {
              const Icon = layer.icon;
              const isActive = activeLayers.includes(layer.id);
              
              return (
                <div key={layer.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className={`text-sm ${isActive ? 'font-medium' : 'text-gray-600'}`}>
                      {layer.name}
                    </span>
                  </div>
                  <Switch
                    checked={isActive}
                    onCheckedChange={() => onLayerToggle(layer.id)}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SidePanel;
