import React from 'react';
import { FaLeaf, FaAppleAlt, FaCarrot, FaFilter } from 'react-icons/fa';

const CropFilters = ({ activeFilter, onFilterChange }) => {
  
    const filters = [
  { id: 'all', label: 'Tout', icon: <FaFilter />, color: 'gray' },
  { id: 'cereales', label: 'Céréales', icon: <FaLeaf />, color: 'blue' },
  { id: 'fruits', label: 'Fruits', icon: <FaAppleAlt />, color: 'red' },
  { id: 'legumes', label: 'Légumes', icon: <FaCarrot />, color: 'green' }
];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <FaFilter className="mr-2" />
        Filtres par type de culture
      </h3>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-4 py-2 rounded-full flex items-center transition ${
              activeFilter === filter.id
                ? `bg-${filter.color}-600 text-white`
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span className="mr-2">{filter.icon}</span>
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CropFilters;