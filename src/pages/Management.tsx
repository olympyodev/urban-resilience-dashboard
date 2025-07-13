
import React, { useState } from 'react';
import { ArrowLeft, Settings, MapPin, FileText, Clock, Edit3, Plus, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Header from '@/components/Header';

const Management = () => {
  const [activeSection, setActiveSection] = useState('alerts');
  const [thresholds, setThresholds] = useState({
    precipitation: 50,
    soilMoisture: 85
  });

  const monitoredAreas = [
    { id: 1, name: 'Centro Histórico', city: 'Cidade A', status: 'Alerta Ativo', lastUpdate: '2025-01-09 14:30' },
    { id: 2, name: 'Encosta Leste', city: 'Cidade A', status: 'Normal', lastUpdate: '2025-01-09 14:25' },
    { id: 3, name: 'Bairro Jardim', city: 'Cidade B', status: 'Atenção', lastUpdate: '2025-01-09 14:20' },
    { id: 4, name: 'Zona Industrial', city: 'Cidade B', status: 'Normal', lastUpdate: '2025-01-09 14:15' }
  ];

  const alertStats = [
    { month: 'Jan', alerts: 3 },
    { month: 'Fev', alerts: 5 },
    { month: 'Mar', alerts: 2 },
    { month: 'Abr', alerts: 7 },
    { month: 'Mai', alerts: 4 },
    { month: 'Jun', alerts: 8 }
  ];

  const handleThresholdChange = (type: string, value: number) => {
    setThresholds(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alerta Ativo': return 'text-red-600 bg-red-50 border border-red-200';
      case 'Atenção': return 'text-yellow-600 bg-yellow-50 border border-yellow-200';
      case 'Normal': return 'text-green-600 bg-green-50 border border-green-200';
      default: return 'text-gray-600 bg-gray-50 border border-gray-200';
    }
  };

  const menuItems = [
    { id: 'alerts', label: 'Gerenciamento de Alertas', icon: Settings },
    { id: 'areas', label: 'Áreas Monitoradas', icon: MapPin },
    { id: 'reports', label: 'Relatórios', icon: FileText },
    { id: 'history', label: 'Histórico', icon: Clock }
  ];

  const renderAlertsSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Gerenciamento de Limiares de Alerta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="precipitation">Precipitação Acumulada (24h)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="precipitation"
                  type="number"
                  value={thresholds.precipitation}
                  onChange={(e) => handleThresholdChange('precipitation', Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-500">mm</span>
                <Button size="sm" variant="outline">
                  <Edit3 className="h-4 w-4" />
                  Alterar
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="soilMoisture">Umidade do Solo (%)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="soilMoisture"
                  type="number"
                  value={thresholds.soilMoisture}
                  onChange={(e) => handleThresholdChange('soilMoisture', Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-500">%</span>
                <Button size="sm" variant="outline">
                  <Edit3 className="h-4 w-4" />
                  Alterar
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600">
              Os limiares acima são utilizados para acionar alertas automáticos baseados nos dados coletados pelos sensores e modelos de IA.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAreasSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Áreas Monitoradas
          </CardTitle>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Nova Área
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Área</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Atualização</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monitoredAreas.map((area) => (
                <TableRow key={area.id}>
                  <TableCell className="font-medium">{area.name}</TableCell>
                  <TableCell>{area.city}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(area.status)}`}>
                      {area.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{area.lastUpdate}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderReportsSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Relatórios de Eventos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Frequência de Alertas por Mês (Último Semestre)</h3>
            <div className="flex items-end gap-4 h-40 border-b border-l pl-4 pb-4">
              {alertStats.map((stat) => (
                <div key={stat.month} className="flex flex-col items-center gap-2">
                  <div 
                    className="bg-blue-500 w-8 rounded-t"
                    style={{ height: `${(stat.alerts / 8) * 100}px` }}
                  ></div>
                  <span className="text-sm text-gray-600">{stat.month}</span>
                  <span className="text-xs font-medium">{stat.alerts}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Gerar Relatório Completo de Eventos
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Exportar Dados Históricos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderHistorySection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Histórico de Eventos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">Alerta de Inundação - Centro Histórico</h4>
                <span className="text-sm text-gray-500">2025-01-08 15:30</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Precipitação acumulada de 65mm em 6 horas. Umidade do solo atingiu 92%.
              </p>
              <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded">Resolvido</span>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">Alerta de Saturação - Encosta Leste</h4>
                <span className="text-sm text-gray-500">2025-01-07 09:45</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Umidade do solo mantida acima de 88% por mais de 4 horas consecutivas.
              </p>
              <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded">Resolvido</span>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">Monitoramento Preventivo - Bairro Jardim</h4>
                <span className="text-sm text-gray-500">2025-01-06 22:15</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Precipitação moderada detectada. Acionamento preventivo dos protocolos de monitoramento.
              </p>
              <span className="text-xs bg-yellow-50 text-yellow-600 px-2 py-1 rounded">Arquivo</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'alerts': return renderAlertsSection();
      case 'areas': return renderAreasSection();
      case 'reports': return renderReportsSection();
      case 'history': return renderHistorySection();
      default: return renderAlertsSection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Barra de navegação */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Dashboard
          </Link>
          <div className="h-4 w-px bg-gray-300"></div>
          <h1 className="text-xl font-semibold text-gray-900">Configurações e Gerenciamento</h1>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Menu Lateral */}
        <div className="w-64 bg-white border-r">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Management;
