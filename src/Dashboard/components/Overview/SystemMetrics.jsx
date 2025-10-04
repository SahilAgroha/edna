import React from 'react';

const SystemMetrics = () => {
  const metrics = [
    { 
      label: "Active Models", 
      value: "24", 
      color: "text-white", 
      icon: "🤖",
      trend: "+2",
      trendColor: "text-green-300"
    },
    { 
      label: "Data Processed", 
      value: "1.2TB", 
      color: "text-cyan-300", 
      icon: "📊",
      trend: "+15%",
      trendColor: "text-green-300"
    },
    { 
      label: "System Uptime", 
      value: "98.7%", 
      color: "text-green-300", 
      icon: "⚡",
      trend: "99.9%",
      trendColor: "text-green-300"
    },
    { 
      label: "Predictions/min", 
      value: "156", 
      color: "text-purple-300", 
      icon: "🔮",
      trend: "+8",
      trendColor: "text-green-300"
    }
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            System Metrics
          </h3>
          <p className="text-gray-400 text-sm mt-1">Real-time system performance indicators</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-300 text-xs font-medium">Live</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((stat, index) => (
          <div 
            key={index}
            className={`
              bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center 
              hover:scale-105 hover:border-white/20 transition-all duration-300 group cursor-pointer
              hover:shadow-lg hover:shadow-cyan-500/10
            `}
            style={{
              transitionDelay: `${index * 100}ms`
            }}
          >
            {/* Icon */}
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>

            {/* Main Value */}
            <div className={`text-2xl font-bold ${stat.color} mb-1 group-hover:text-cyan-200 transition-colors`}>
              {stat.value}
            </div>

            {/* Label */}
            <div className="text-gray-400 text-sm mb-2 group-hover:text-gray-300 transition-colors">
              {stat.label}
            </div>

            {/* Trend Indicator */}
            <div className="flex items-center justify-center space-x-1">
              <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className={`text-xs font-semibold ${stat.trendColor}`}>
                {stat.trend}
              </span>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {/* Bottom Summary */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400">System Status:</span>
            <span className="text-blue-300 font-medium">All systems operational</span>
          </div>
          <div className="text-gray-400">
            Last updated: <span className="text-cyan-300">Just now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMetrics;
