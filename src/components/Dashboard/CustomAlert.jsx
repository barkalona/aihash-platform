import React from 'react';
import { ActivitySquare, AlertTriangle } from 'lucide-react';

const CustomAlert = ({ type = 'info', title, description, className = '' }) => {
  const iconMap = {
    info: <ActivitySquare className="h-5 w-5 text-blue-400" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-400" />
  };

  const baseClasses = "rounded-lg border p-4 mb-4 bg-gray-800/50 border-gray-700";
  
  return (
    <div className={`${baseClasses} ${className}`}>
      <div className="flex items-start gap-4">
        {iconMap[type]}
        <div>
          <h3 className="text-white font-medium mb-1">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Example usage in your MiningCommandCenter component:
const AIOptimizationPanel = () => {
  return (
    <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-white mb-4">AI Optimization Panel</h2>
      
      <CustomAlert
        type="info"
        title="AI Recommendation"
        description="Optimize your mining rig settings to increase efficiency by 15%."
      />
      
      <CustomAlert
        type="warning"
        title="Predictive Maintenance Alert"
        description="Rig 3 is predicted to require maintenance within the next 24 hours."
      />
    </div>
  );
};

export { CustomAlert, AIOptimizationPanel };