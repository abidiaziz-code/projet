import React, { useState } from 'react';
import { FaLeaf, FaCalendarAlt, FaLightbulb, FaPrint, FaDownload, FaShareAlt, FaChartBar } from 'react-icons/fa';
import CalendarDisplay from './CalendarDisplay';

const LocationInfo = ({ location }) => {
  const [showCropModal, setShowCropModal] = useState(null);

  if (!location) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
        <h3 className="text-xl font-semibold mb-3">Sélectionnez un lieu</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Cliquez sur un lieu de la carte pour afficher les informations agricoles
        </p>
      </div>
    );
  }

  const handleExport = () => {
    const data = {
      location,
      exportedAt: new Date().toISOString(),
      source: "Calendrier Agricole Intelligent Jendouba"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agriculture-${location.name.replace(/\s+/g, '-')}.json`;
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Agriculture: ${location.name}`,
          text: `Informations agricoles pour ${location.name} dans la région de Jendouba`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erreur de partage:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* En-tête */}
      <div className="p-5 border-b dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-2">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {location.name}
              </h3>
              <span className="ml-3 px-3 py-1 text-sm rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
                {location.type}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{location.description}</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              title="Imprimer"
            >
              <FaPrint />
            </button>
            <button
              onClick={handleExport}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              title="Exporter"
            >
              <FaDownload />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              title="Partager"
            >
              <FaShareAlt />
            </button>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5">
        {/* Cultures principales */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <FaLeaf className="text-green-600 dark:text-green-400 mr-2" />
            <h4 className="text-lg font-semibold">Cultures principales</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {location.crops.map((crop, index) => (
              <button
                key={index}
                onClick={() => setShowCropModal(crop)}
                className="px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full hover:bg-green-100 dark:hover:bg-green-800 transition flex items-center"
              >
                <FaLeaf className="mr-2" />
                {crop.name}
                <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 dark:bg-green-800 rounded-full">
                  {crop.type}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Calendrier agricole */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <FaCalendarAlt className="text-green-600 dark:text-green-400 mr-2" />
            <h4 className="text-lg font-semibold">Calendrier agricole</h4>
          </div>
          <CalendarDisplay calendar={location.calendar} />
        </div>

        {/* Conseils agricoles */}
        <div>
          <div className="flex items-center mb-3">
            <FaLightbulb className="text-yellow-600 dark:text-yellow-400 mr-2" />
            <h4 className="text-lg font-semibold">Conseils agricoles</h4>
          </div>
          <ul className="space-y-2">
            {location.tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700 dark:text-gray-300">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal des détails de culture */}
      {showCropModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center">
                <FaLeaf className="mr-2 text-green-600" />
                {showCropModal.name}
              </h3>
              <button
                onClick={() => setShowCropModal(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Type :</span>
                <span>{showCropModal.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Saison :</span>
                <span>{showCropModal.season}</span>
              </div>
              <div className="mt-4 pt-4 border-t dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Informations démonstratives à des fins éducatives
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationInfo;