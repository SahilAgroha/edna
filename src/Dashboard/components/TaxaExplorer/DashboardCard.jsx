import React from 'react';

const DashboardCard = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/20
        transition-all duration-300 group
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default DashboardCard;