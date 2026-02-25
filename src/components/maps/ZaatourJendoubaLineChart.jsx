import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { 
  CalendarDays, 
  RefreshCw, 
  TrendingUp, 
  Package, 
  Scale, 
  ArrowUpRight,
  Leaf,
  Filter,
  BarChart3,
  CloudRain,
  Thermometer,
  MapPin,
  DollarSign,
  Download,
  Share2,
  Info
} from 'lucide-react';

// Enregistrement des composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ZaatourJendoubaLineChart = () => {
  const [timeRange, setTimeRange] = useState('yearly');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedType, setSelectedType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [exporting, setExporting] = useState(false);

  // Données des années
  const years = ['2022', '2023', '2024', '2025', '2026'];

  // Types de thym
  const zaatourTypes = [
    { id: 'all', name: 'Tous les types', color: '#3B82F6', icon: '🌿' },
    { id: 'wild', name: 'Thym sauvage', color: '#EF4444', icon: '🏞️' },
    { id: 'garden', name: 'Thym de jardin', color: '#10B981', icon: '🏡' },
    { id: 'lemon', name: 'Thym citronné', color: '#F59E0B', icon: '🍋' },
    { id: 'golden', name: 'Thym doré', color: '#8B5CF6', icon: '⭐' }
  ];

  // Simulation de récupération des données
  useEffect(() => {
    fetchChartData();
  }, [timeRange, selectedYear, selectedType]);

  const fetchChartData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let labels = [];
    let datasets = [];
    const selectedColor = zaatourTypes.find(t => t.id === selectedType)?.color || '#3B82F6';

    if (timeRange === 'yearly') {
      labels = years;
      datasets = [{
        label: `Production de thym (${zaatourTypes.find(t => t.id === selectedType)?.name})`,
        data: [150, 180, 220, 280, 320],
        borderColor: selectedColor,
        backgroundColor: `${selectedColor}20`,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: selectedColor,
        pointRadius: 6,
        pointHoverRadius: 10,
        borderWidth: 3,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2
      }];
    } else if (timeRange === 'monthly') {
      labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      const monthlyData = {
        all: [120, 130, 160, 200, 280, 320, 300, 250, 200, 160, 140, 120],
        wild: [100, 110, 140, 180, 240, 280, 260, 210, 160, 120, 100, 90],
        garden: [15, 18, 22, 28, 35, 40, 38, 32, 28, 25, 20, 18],
        lemon: [5, 8, 12, 18, 25, 30, 28, 24, 20, 15, 10, 8],
        golden: [2, 3, 5, 8, 12, 15, 14, 12, 10, 8, 6, 5]
      };
      datasets = [{
        label: `Production ${selectedYear} (tonnes)`,
        data: monthlyData[selectedType],
        borderColor: selectedColor,
        backgroundColor: `${selectedColor}20`,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: selectedColor,
        pointRadius: 5,
        pointHoverRadius: 8,
        borderWidth: 3
      }];
    } else if (timeRange === 'weekly') {
      labels = ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'];
      datasets = [{
        label: 'Production hebdomadaire',
        data: [65, 72, 68, 75],
        borderColor: selectedColor,
        backgroundColor: `${selectedColor}20`,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: selectedColor,
        pointRadius: 4,
        pointHoverRadius: 7,
        borderWidth: 2
      }];
    }

    setChartData({
      labels,
      datasets: datasets.map(dataset => ({
        ...dataset,
        borderDash: timeRange === 'weekly' ? [5, 5] : []
      }))
    });
    setIsLoading(false);
  };

  // Options du graphique
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        rtl: false,
        labels: {
          font: {
            family: 'inherit',
            size: 14
          },
          padding: 20,
          usePointStyle: true,
          color: '#374151'
        }
      },
      tooltip: {
        rtl: false,
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#F3F4F6',
        bodyColor: '#F3F4F6',
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        borderColor: '#4B5563',
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString('fr-FR')} tonnes`;
          }
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(209, 213, 219, 0.3)',
          drawBorder: false
        },
        ticks: {
          font: { size: 12 },
          color: '#6B7280',
          callback: (value) => `${value.toLocaleString('fr-FR')} tonnes`
        },
        title: {
          display: true,
          text: 'Quantité produite (tonnes)',
          font: { size: 14, weight: '600' },
          color: '#374151',
          padding: { top: 10, bottom: 10 }
        }
      },
      x: {
        grid: {
          color: 'rgba(209, 213, 219, 0.2)',
          drawBorder: false
        },
        ticks: {
          font: { size: 12 },
          color: '#6B7280',
          maxRotation: timeRange === 'monthly' ? 45 : 0
        },
        title: {
          display: true,
          text: timeRange === 'yearly' ? 'Année' : timeRange === 'monthly' ? 'Mois' : 'Semaine',
          font: { size: 14, weight: '600' },
          color: '#374151',
          padding: { top: 10, bottom: 10 }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  // Calcul des statistiques
  const calculateStats = () => {
    if (!chartData || chartData.datasets.length === 0) return null;
    const data = chartData.datasets[0].data;
    const total = data.reduce((sum, value) => sum + value, 0);
    const average = total / data.length;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const growth = data.length > 1 ? ((data[data.length - 1] - data[0]) / data[0] * 100).toFixed(1) : 0;
    return { total, average, max, min, growth };
  };

  const stats = calculateStats();

  // Exportation des données
  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      const dataStr = JSON.stringify(chartData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `thym-jendouba-${timeRange}-${selectedYear}.json`;
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      setExporting(false);
    }, 500);
  };

  // Partage du rapport
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Production de thym à Jendouba',
        text: `Rapport de production de thym à Jendouba - Période: ${timeRange} - Année: ${selectedYear}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      {/* En-tête */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Système de suivi de la production de thym à Jendouba
                </h1>
                <p className="text-gray-600 mt-1 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Analyse interactive de la production et distribution dans différentes régions du gouvernorat
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                disabled={exporting}
                className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Download className={`w-4 h-4 ${exporting ? 'animate-spin' : ''}`} />
                {exporting ? 'Exportation...' : 'Exporter'}
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <Share2 className="w-4 h-4" />
                Partager
              </button>
            </div>
          </div>
        </div>

        {/* Panneau de contrôle */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Filtre période */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <CalendarDays className="w-4 h-4" />
                Période
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'yearly', label: 'Annuel', icon: '📅' },
                  { id: 'monthly', label: 'Mensuel', icon: '📊' },
                  { id: 'weekly', label: 'Hebdomadaire', icon: '📈' }
                ].map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setTimeRange(range.id)}
                    className={`flex-1 min-w-[100px] px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                      timeRange === range.id
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{range.icon}</span>
                    <span className="font-medium">{range.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filtre année */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <BarChart3 className="w-4 h-4" />
                Année
              </label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Filtre type */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Filter className="w-4 h-4" />
                Type de thym
              </label>
              <div className="flex flex-wrap gap-2">
                {zaatourTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                      selectedType === type.id
                        ? 'text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{
                      backgroundColor: selectedType === type.id ? type.color : '',
                      boxShadow: selectedType === type.id ? `0 4px 14px ${type.color}40` : ''
                    }}
                  >
                    <span>{type.icon}</span>
                    <span className="text-sm font-medium">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bouton actualiser */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={fetchChartData}
              disabled={isLoading}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Actualisation des données...' : 'Actualiser les données'}
            </button>
          </div>
        </div>

        {/* Zone du graphique */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          {/* Titre */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Analyse de la production de thym
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {timeRange === 'yearly' ? 'Analyse annuelle' : timeRange === 'monthly' ? 'Analyse mensuelle' : 'Analyse hebdomadaire'} • Année {selectedYear}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: zaatourTypes.find(t => t.id === selectedType)?.color }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {zaatourTypes.find(t => t.id === selectedType)?.name}
                </span>
              </div>
            </div>
          </div>

          {/* Graphique */}
          <div className="relative h-[400px]">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-xl">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Chargement des données...</p>
                </div>
              </div>
            ) : chartData ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">Aucune donnée disponible</p>
              </div>
            )}
          </div>

          {/* Statistiques */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <Package className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full">Total</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.total.toLocaleString('fr-FR')} tonnes</div>
                <div className="text-sm text-gray-600 mt-1">Production totale</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-xl border border-emerald-200">
                <div className="flex items-center justify-between mb-3">
                  <Scale className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">Moyenne</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.average.toFixed(1)} tonnes</div>
                <div className="text-sm text-gray-600 mt-1">Production moyenne</div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                  <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded-full">Pic</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.max.toLocaleString('fr-FR')} tonnes</div>
                <div className="text-sm text-gray-600 mt-1">Maximum</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <ArrowUpRight className="w-5 h-5 text-purple-600" />
                  <span className="text-xs font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded-full">Croissance</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  <span className={parseFloat(stats.growth) >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {stats.growth}%
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">Taux de croissance</div>
              </div>
            </div>
          )}
        </div>

        {/* Informations supplémentaires */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Notes et analyses
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-transparent rounded-lg">
                <CloudRain className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Pluviométrie requise</div>
                  <div className="text-sm text-gray-600">400-600 mm annuellement</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-transparent rounded-lg">
                <Thermometer className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-medium text-gray-900">Température optimale</div>
                  <div className="text-sm text-gray-600">15-25°C</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-transparent rounded-lg">
                <CalendarDays className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="font-medium text-gray-900">Période optimale de récolte</div>
                  <div className="text-sm text-gray-600">Avril - Juin</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-transparent rounded-lg">
                <MapPin className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-medium text-gray-900">Zones principales</div>
                  <div className="text-sm text-gray-600">Aïn Draham, Fernana, Jendouba Ville</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-transparent rounded-lg">
                <DollarSign className="w-5 h-5 text-red-600" />
                <div>
                  <div className="font-medium text-gray-900">Prix actuel du marché</div>
                  <div className="text-sm text-gray-600">25-30 dinars le kilo</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tableau des régions */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Production par région</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 rounded-l-lg">Région</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Superficie (hectares)</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Production (tonnes)</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 rounded-r-lg">Pourcentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { region: 'Aïn Draham', area: 150, production: 120, color: 'bg-blue-500' },
                    { region: 'Fernana', area: 120, production: 95, color: 'bg-emerald-500' },
                    { region: 'Jendouba Ville', area: 100, production: 85, color: 'bg-purple-500' },
                    { region: 'Tabarka', area: 80, production: 65, color: 'bg-amber-500' },
                    { region: 'Bou Salem', area: 60, production: 50, color: 'bg-red-500' },
                  ].map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${item.color}`} />
                          <span className="font-medium text-gray-900">{item.region}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{item.area.toLocaleString('fr-FR')}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{item.production.toLocaleString('fr-FR')}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full ${item.color.replace('bg-', 'bg-')}`}
                              style={{ width: `${(item.production / 120) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 min-w-[40px]">
                            {((item.production / 120) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pied de page */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-700 font-medium">© 2026 Ministère de l'Agriculture - Direction de Jendouba</p>
             
            </div>
            <div className="text-center md:text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
                <CalendarDays className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Dernière mise à jour: {new Date().toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZaatourJendoubaLineChart;