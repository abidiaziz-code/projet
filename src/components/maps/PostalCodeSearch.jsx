import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaExclamationCircle } from 'react-icons/fa';
import { agriculturalData } from '../data/agriculturalData';

const PostalCodeSearch = ({ onSelectLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (code) => {
    const codeToSearch = code || searchTerm;
    if (codeToSearch.length < 4) return;

    setIsSearching(true);
    
    // Simulation de recherche asynchrone
    setTimeout(() => {
      const location = agriculturalData.locations.find(
        loc => loc.postalCode === codeToSearch
      );
      
      if (location) {
        setSearchResults({ found: true, location });
        onSelectLocation(location);
      } else {
        setSearchResults({ found: false });
      }
      setIsSearching(false);
    }, 500);
  };

  const quickCodes = [
    { code: "8100", name: "Jendouba" },
    { code: "8110", name: "Aïn Draham" },
    { code: "8120", name: "Tabarka" },
    { code: "8130", name: "Fernana" },
    { code: "8140", name: "Bousalem" }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex items-center mb-4">
        <FaMapMarkerAlt className="text-green-600 dark:text-green-400 mr-2" />
        <h3 className="text-lg font-semibold">Recherche par Code Postal</h3>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            setSearchTerm(value);
            if (value.length === 4) {
              handleSearch(value);
            }
          }}
          placeholder="Entrez votre code postal (ex: 8100)"
          maxLength="4"
          className="w-full p-3 pl-10 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Codes rapides :</p>
        <div className="flex flex-wrap gap-2">
          {quickCodes.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                setSearchTerm(item.code);
                handleSearch(item.code);
              }}
              className="px-3 py-1.5 text-sm bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full hover:bg-green-100 dark:hover:bg-green-800 transition"
            >
              {item.code}
            </button>
          ))}
        </div>
      </div>

      {/* Résultats de recherche */}
      <div className="min-h-[100px]">
        {isSearching ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
            <span className="ml-3">Recherche en cours...</span>
          </div>
        ) : searchResults ? (
          searchResults.found ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 animate-fadeIn">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-green-800 dark:text-green-300">
                    {searchResults.location.name}
                  </h4>
                  <span className="inline-block px-2 py-1 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full mt-1">
                    Code: {searchResults.location.postalCode}
                  </span>
                </div>
                <button
                  onClick={() => onSelectLocation(searchResults.location)}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Voir
                </button>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {searchResults.location.description.substring(0, 100)}...
              </p>
            </div>
          ) : (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-start">
                <FaExclamationCircle className="text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-1">
                    Code postal {searchTerm} non trouvé
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Essayez l'un des codes rapides ci-dessus.
                  </p>
                </div>
              </div>
            </div>
          )
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 italic p-4">
            Commencez à taper un code postal
          </p>
        )}
      </div>
    </div>
  );
};

export default PostalCodeSearch;