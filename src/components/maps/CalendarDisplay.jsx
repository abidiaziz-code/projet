import React from 'react';

const CalendarDisplay = ({ calendar }) => {
  const getActivityLevel = (value) => {
    if (value === 0) return 'text-gray-300';
    if (value <= 20) return 'text-green-300';
    if (value <= 40) return 'text-green-400';
    if (value <= 60) return 'text-green-500';
    if (value <= 80) return 'text-green-600';
    return 'text-green-700';
  };

  return (
    <div className="space-y-3">
      {calendar.map((month, index) => (
        <div key={index} className="flex items-center">
          <div className="w-20 font-medium text-gray-700 dark:text-gray-300">
            {month.month}
          </div>
          
          <div className="flex-1 ml-4">
            {/* Barre de plantation */}
            {month.planting > 0 && (
              <div className="mb-1">
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-blue-600 dark:text-blue-400">Plantation</span>
                  <span className="font-medium">{month.planting}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${month.planting}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {/* Barre de récolte */}
            {month.harvesting > 0 && (
              <div>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-orange-600 dark:text-orange-400">Récolte</span>
                  <span className="font-medium">{month.harvesting}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${month.harvesting}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarDisplay;