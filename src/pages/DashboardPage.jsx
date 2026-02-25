import React, { useState, useEffect } from 'react';
import ZaatourJendoubaLineChart from '../components/maps/ZaatourJendoubaLineChart';
import Header from '../components/maps/Header';
import MapComponent from '../components/maps/MapComponent';
import LocationInfo from '../components/maps/LocationInfo';
import PostalCodeSearch from '../components/maps/PostalCodeSearch';
import CropFilters from '../components/maps/CropFilters';
import { agriculturalData } from '../components/data/agriculturalData';


function DashboardPage() {
  const [selectedLocation, setSelectedLocation] = useState(agriculturalData.locations[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(agriculturalData.locations);
  const [activeFilter, setActiveFilter] = useState('all');

  // Appliquer le thème sombre
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Filtrer les localisations
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredLocations(agriculturalData.locations);
    } else {
      const filtered = agriculturalData.locations.filter(location =>
        location.crops.some(crop => crop.type === activeFilter)
      );
      setFilteredLocations(filtered);
      
      // Sélectionner automatiquement la première localisation filtrée
      if (filtered.length > 0 && !filtered.some(loc => loc.id === selectedLocation?.id)) {
        setSelectedLocation(filtered[0]);
      }
    }
  }, [activeFilter]);

  // Fonctions utilitaires
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleLocationSelect = (location) => setSelectedLocation(location);
  const handleFilterChange = (filter) => setActiveFilter(filter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Informations */}
          <div className="lg:col-span-1 space-y-6">
            <PostalCodeSearch onSelectLocation={handleLocationSelect} />
            
            <CropFilters 
              activeFilter={activeFilter} 
              onFilterChange={handleFilterChange} 
            />
            
            <LocationInfo location={selectedLocation} />
            
            {/* Section À propos */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-lg font-semibold mb-3">À propos du projet</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Cette application fait partie du projet "Calendrier Agricole Intelligent" 
                pour soutenir les agriculteurs de la région de Jendouba avec des technologies numériques.
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <strong>Équipe :</strong> Mohamed Aziz Abidi, Mohamed Rayen Abidi
              </div>
            </div>
          </div>
          
          {/* Colonne droite - Carte */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg mb-6">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <span className="mr-2">🗺️</span>
                Carte interactive de la région de Jendouba
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cliquez sur un lieu pour voir les cultures et les détails agricoles
              </p>
              
              <MapComponent 
                locations={filteredLocations}
                selectedLocation={selectedLocation}
                onSelectLocation={handleLocationSelect}
              />
              
              {/* Contrôles de la carte */}
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        alert(`Votre position : ${position.coords.latitude}, ${position.coords.longitude}`);
                      });
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  📍 Me localiser
                </button>
                <button
                  onClick={() => handleLocationSelect(agriculturalData.locations[0])}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  🔄 Réinitialiser
                </button>
                <button
                  onClick={() => {
                    const mapElement = document.querySelector('.leaflet-container');
                    if (mapElement.requestFullscreen) {
                      mapElement.requestFullscreen();
                    }
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  ⛶ Plein écran
                </button>
              </div>
            </div> <div className='App'>
                <ZaatourJendoubaLineChart/>
              </div>
            
            {/* Statistiques */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-lg font-semibold mb-3">Statistiques régionales</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {agriculturalData.locations.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Zones couvertes</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {new Set(agriculturalData.locations.flatMap(l => l.crops.map(c => c.name))).size}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Cultures différentes</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    5
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Types de zones</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    100%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Jendouba couvert</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Sources de données :</h4>
              <ul className="space-y-1 text-gray-300">
                <li>• Ministère de l'Agriculture Tunisien</li>
                <li>• FAO (Nations Unies)</li>
                <li>• OpenStreetMap</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Technologies utilisées :</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Leaflet</span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Tailwind CSS</span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Chart.js</span>
              </div>
            </div>
            <div>
              
         
              <h4 className="font-semibold mb-3">Contact</h4>
              <p className="text-gray-300">
                Projet éducatif - Données de démonstration
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Calendrier Agricole Intelligent - Jendouba</p>
          </div>
        </div>
      </footer>
    </div>
    
  );
}

export default DashboardPage;