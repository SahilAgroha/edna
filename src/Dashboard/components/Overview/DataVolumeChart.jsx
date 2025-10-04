import React from 'react';

const DataVolumeChart = () => {
  const generateRandomBars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      height: Math.random() * 80 + 20,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }));
  };

  const bars1 = generateRandomBars(20);
  const bars2 = generateRandomBars(25);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Data Volume</h2>
      <div className="grid grid-cols-2 gap-8">
        {/* Ingest 20 days */}
        <div>
          <h3 className="text-gray-400 text-sm mb-3">Ingest 20 days</h3>
          <div className="flex items-end space-x-1 h-24">
            {bars1.map((bar) => (
              <div
                key={bar.id}
                className="flex-1 rounded-t"
                style={{
                  height: `${bar.height}%`,
                  backgroundColor: bar.color
                }}
              />
            ))}
          </div>
        </div>

        {/* M-SM Records */}
        <div>
          <h3 className="text-gray-400 text-sm mb-3">M-SM Records</h3>
          <div className="flex items-end space-x-1 h-24">
            {bars2.map((bar) => (
              <div
                key={bar.id}
                className="flex-1 rounded-t"
                style={{
                  height: `${bar.height}%`,
                  backgroundColor: bar.color
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVolumeChart;
