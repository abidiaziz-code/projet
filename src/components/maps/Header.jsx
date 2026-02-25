import React from 'react';
import { FaSeedling, FaMoon, FaSun } from 'react-icons/fa';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-800 dark:from-gray-800 dark:to-gray-900 text-white p-4 shadow-lg transition-colors duration-300">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaSeedling className="text-3xl" />
            <div>
              <h1 className="text-2xl font-bold">Calendrier Agricole Intelligent - Jendouba</h1>
              <p className="text-sm opacity-90 dark:text-gray-300">
                Outil numérique pour planifier selon la région et la saison
              </p>
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition"
            aria-label="Changer le thème"
          >
            {darkMode ? <FaSun className="text-xl text-yellow-400" /> : <FaMoon className="text-xl text-gray-200" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
