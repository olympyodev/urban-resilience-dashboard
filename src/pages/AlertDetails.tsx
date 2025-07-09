
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, AlertTriangle, Users, Building2, Droplets, Gauge, TrendingUp, Satellite, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AlertDetailMap from '@/components/AlertDetailMap';

const AlertDetails = () => {
  const { alertId } = useParams();
  const navigate = useNavigate();

  // Dados simulados do alerta
  const alertData = {
    id: alertId || '001',
    title: 'Alerta de Inundação - Centro Histórico',
    status: 'ALERTA VERMELHO',
    startTime: '03/07/2025 09:00 AM',
    lastUpdate: '03/07/2025 09:15 AM',
    location: 'Rua Principal, Centro Histórico, Cidade Exemplo',
    coordinates: 'Lat: -23.5505, Lon: -46.6333',
    cause: 'Chuva Extrema (45 mm nas últimas 2h, 78 mm nas últimas 24h)',
    riverLevel: '2.8 metros (subindo 0.3 m/h)',
    soilMoisture: '85% de saturação (tendência: aumentando)',
    aiPrediction: '85%',
    affectedPopulation: '~5.000 pessoas',
    criticalInfrastructure: ['Hospital Central', 'Ponte Principal', 'Escola Municipal'],
    affectedAreas: ['Setor Centro-1', 'Setor Centro-2', 'Setor Centro-3'],
    recommendations: [
      'Iniciar evacuação das áreas mais baixas',
      'Acionar equipes de resgate',
      'Bloquear acessos à Rua Principal',
      'Emitir aviso à população via sistemas de alerta'
    ],
    satelliteData: [
      { type: 'Sentinel-1 (Radar)', date: '03/07/2025 08:30 AM', description: 'Nível de água detectado' },
      { type: 'Sentinel-2 (Óptica)', date: '02/07/2025 14:00 PM', description: 'Variação na cobertura vegetal' }
    ]
  };

  const getStatusColor = (status: string) => {
    if (status.includes('VERMELHO')) return 'destructive';
    if (status.includes('AMARELO')) return 'secondary';
    return 'default';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="h-16 bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg flex items-center justify-between px-6 text-white">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Dashboard
          </Button>
          <div>
            <h1 className="text-xl font-bold">Detalhes do Alerta</h1>
            <p className="text-sm text-blue-100">Análise Detalhada de Evento</p>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Mapa Focado */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Mapa da Área de Interesse</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-white rounded-lg border overflow-hidden">
              <AlertDetailMap alertId={alertData.id} />
            </div>
          </CardContent>
        </Card>

        {/* Painel de Detalhes */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{alertData.title}</CardTitle>
              <Badge variant={getStatusColor(alertData.status) as any} className="text-sm">
                {alertData.status}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
              <div className="flex items-center space-x-1">
                <span className="font-medium">ID:</span>
                <span>#{alertData.id}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Início: {alertData.startTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>Atualizado: {alertData.lastUpdate}</span>
              </div>
            </div>
            <div className="flex items-start space-x-1 text-sm text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mt-0.5" />
              <div>
                <div>{alertData.location}</div>
                <div className="text-xs">{alertData.coordinates}</div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Detalhes do Evento */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Detalhes do Evento/Risco</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="font-medium text-red-800 mb-1">Causa Provável</div>
                    <div className="text-sm text-red-700">{alertData.cause}</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-800 mb-1 flex items-center space-x-1">
                      <Droplets className="h-4 w-4" />
                      <span>Nível do Rio</span>
                    </div>
                    <div className="text-sm text-blue-700">{alertData.riverLevel}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <div className="font-medium text-amber-800 mb-1 flex items-center space-x-1">
                      <Gauge className="h-4 w-4" />
                      <span>Umidade do Solo</span>
                    </div>
                    <div className="text-sm text-amber-700">{alertData.soilMoisture}</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-medium text-purple-800 mb-1 flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>Previsão IA</span>
                    </div>
                    <div className="text-sm text-purple-700">
                      Probabilidade de inundação crítica nas próximas 4 horas: <strong>{alertData.aiPrediction}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Impacto Potencial */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Impacto Potencial</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800 mb-2">População Afetada</div>
                  <div className="text-2xl font-bold text-gray-900">{alertData.affectedPopulation}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800 mb-2 flex items-center space-x-1">
                    <Building2 className="h-4 w-4" />
                    <span>Infraestruturas Críticas</span>
                  </div>
                  <div className="space-y-1">
                    {alertData.criticalInfrastructure.map((infra, index) => (
                      <div key={index} className="text-sm text-gray-700">• {infra}</div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800 mb-2">Áreas Atingidas</div>
                  <div className="space-y-1">
                    {alertData.affectedAreas.map((area, index) => (
                      <div key={index} className="text-sm text-gray-700">• {area}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recomendações */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Recomendações/Ações Sugeridas</h3>
              <div className="space-y-2">
                {alertData.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-2 p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div className="text-sm text-orange-800">{rec}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dados de Satélite */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                <Satellite className="h-5 w-5" />
                <span>Registros de Análise (Dados Copernicus)</span>
              </h3>
              <div className="space-y-3">
                {alertData.satelliteData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium text-blue-800">{data.type}</div>
                      <div className="text-sm text-blue-600">{data.date} - {data.description}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Ver Detalhes
                    </Button>
                  </div>
                ))}
                <Button className="w-full mt-3" variant="secondary">
                  <Satellite className="h-4 w-4 mr-2" />
                  Ver Análise Detalhada dos Dados de Satélite
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlertDetails;
