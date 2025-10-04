import React, { useState } from 'react';

const ActiveExperiments = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const experiments = [
    {
      id: 'A',
      title: 'Experiment A',
      subtitle: 'Genomic Sequencing Analysis',
      progress: 80,
      color: 'from-orange-400 via-amber-500 to-yellow-500',
      bgColor: 'from-orange-500/20 to-amber-500/10',
      shadowColor: 'shadow-orange-500/20',
      status: 'In Progress',
      eta: '2 days',
      icon: '🧬'
    },
    {
      id: 'B',
      title: 'Experiment B',
      subtitle: 'Disease Prediction Analysis',
      progress: 90,
      color: 'from-blue-400 via-indigo-500 to-purple-600',
      bgColor: 'from-blue-500/20 to-purple-500/10',
      shadowColor: 'shadow-blue-500/20',
      status: 'Near Complete',
      eta: '6 hours',
      icon: '🔬'
    },
    {
      id: 'G',
      title: 'Experiment G',
      subtitle: 'Disease Prediction Model',
      progress: 40,
      color: 'from-emerald-400 via-green-500 to-teal-600',
      bgColor: 'from-green-500/20 to-teal-500/10',
      shadowColor: 'shadow-green-500/20',
      status: 'Starting',
      eta: '5 days',
      icon: '🤖'
    },
    {
      id: 'B2',
      title: 'Experiment B',
      subtitle: 'Genomic Sequencing Analysis',
      progress: 96,
      color: 'from-rose-400 via-pink-500 to-red-600',
      bgColor: 'from-rose-500/20 to-red-500/10',
      shadowColor: 'shadow-rose-500/20',
      status: 'Finalizing',
      eta: '1 hour',
      icon: '💉'
    },
    {
      id: 'G2',
      title: 'Experiment G',
      subtitle: 'Drug Demethylation',
      progress: 80,
      color: 'from-cyan-400 via-blue-500 to-indigo-600',
      bgColor: 'from-cyan-500/20 to-blue-500/10',
      shadowColor: 'shadow-cyan-500/20',
      status: 'Processing',
      eta: '1 day',
      icon: '⚗️'
    },
    {
      id: 'C',
      title: 'Experiment C',
      subtitle: 'Drug Discovery Simulation',
      progress: 90,
      color: 'from-violet-400 via-purple-500 to-fuchsia-600',
      bgColor: 'from-purple-500/20 to-fuchsia-500/10',
      shadowColor: 'shadow-purple-500/20',
      status: 'Almost Done',
      eta: '4 hours',
      icon: '💊'
    }
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/20 w-full">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            Active Experiments
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {experiments.filter(exp => exp.progress < 100).length} running experiments
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-300 text-sm font-medium">Live</span>
        </div>
      </div>

      {/* Full Width Experiment Cards Grid - 2 rows x 3 columns */}
      <div className="grid grid-cols-3 auto-rows-fr gap-6 w-full min-h-[400px]">
        {experiments.map((experiment, index) => (
          <div
            key={`${experiment.id}-${index}`}
            className={`
              group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out cursor-pointer w-full h-full
              ${hoveredCard === index ? 'scale-105 z-10' : 'hover:scale-102'}
            `}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              transitionDelay: `${index * 100}ms`
            }}
          >
            {/* Glassmorphism Background */}
            <div className={`
              absolute inset-0 bg-gradient-to-br ${experiment.bgColor} backdrop-blur-xl 
              border border-white/20 rounded-2xl shadow-2xl ${experiment.shadowColor}
              ${hoveredCard === index ? 'border-white/40' : ''}
            `}></div>

            {/* Floating Background Elements */}
            <div className={`
              absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r ${experiment.color} 
              rounded-full opacity-20 blur-3xl transition-all duration-500
              ${hoveredCard === index ? 'scale-150 opacity-30' : ''}
            `}></div>

            {/* Card Content */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`
                  w-14 h-14 rounded-2xl bg-gradient-to-r ${experiment.color} 
                  flex items-center justify-center text-white font-bold text-lg shadow-lg
                  transition-all duration-300 group-hover:scale-110
                `}>
                  <span className="text-2xl">{experiment.icon}</span>
                </div>
                
                <div className="text-right">
                  <div className={`
                    inline-flex px-3 py-1 rounded-full text-xs font-semibold
                    ${experiment.progress > 85 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                      : experiment.progress > 60
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    }
                  `}>
                    {experiment.status}
                  </div>
                </div>
              </div>

              {/* Experiment Info */}
              <div className="mb-6 flex-grow">
                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-cyan-200 transition-colors">
                  {experiment.title}
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  {experiment.subtitle}
                </p>
              </div>

              {/* Progress Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold text-base">Progress</span>
                  <span className="text-cyan-300 font-bold text-lg">{experiment.progress}%</span>
                </div>
                
                {/* Enhanced Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                    <div
                      className={`
                        bg-gradient-to-r ${experiment.color} h-3 rounded-full transition-all duration-1000 ease-out
                        shadow-lg relative overflow-hidden
                      `}
                      style={{ width: `${experiment.progress}%` }}
                    >
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Progress glow effect */}
                  <div 
                    className={`absolute top-0 h-3 bg-gradient-to-r ${experiment.color} rounded-full blur-sm opacity-50 transition-all duration-1000`}
                    style={{ width: `${experiment.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Footer Info */}
              <div className="flex items-center justify-between text-base">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300 font-medium">ETA: {experiment.eta}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 text-sm font-medium">Active</span>
                </div>
              </div>

              {/* Hover Action Button */}
              <div className={`
                absolute bottom-6 right-6 transition-all duration-300
                ${hoveredCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
              `}>
                <button className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Card Border Glow Effect */}
            <div className={`
              absolute inset-0 rounded-2xl transition-all duration-500
              ${hoveredCard === index ? `bg-gradient-to-r ${experiment.color} opacity-10` : 'opacity-0'}
            `}></div>
          </div>
        ))}
      </div>

      {/* Bottom Stats */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {experiments.filter(exp => exp.progress < 100).length}
            </div>
            <div className="text-gray-400 text-sm">Running</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-300 mb-1">
              {experiments.filter(exp => exp.progress > 85).length}
            </div>
            <div className="text-gray-400 text-sm">Near Complete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-300 mb-1">
              {Math.round(experiments.reduce((acc, exp) => acc + exp.progress, 0) / experiments.length)}%
            </div>
            <div className="text-gray-400 text-sm">Avg Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveExperiments;
