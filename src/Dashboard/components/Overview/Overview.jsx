import React from 'react';
import ModelPerformanceChart from './ModelPerformanceChart';
import DataVolumeChart from './DataVolumeChart';
import ActiveExperiments from './ActiveExperiments';
import RecentActivity from './RecentActivity';
import SystemMetrics from './SystemMetrics';

const Overview = () => {
  return (
    <div className="min-h-screen space-y-8">
      {/* Enhanced Header with Glassmorphism */}
      <div className="bg-white/5  border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-2">
              AI/ML Dashboard Overview
            </h1>
            <p className="text-gray-400 text-base">Real-time monitoring and analytics platform</p>
          </div>
          <div className="flex items-center space-x-6 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 font-medium">System Online</span>
            </div>
            <div className="text-gray-400 text-sm">
              <span className="text-cyan-300">Last updated:</span> Just now
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-4 xl:grid-cols-4 gap-6">
        {/* Left Section - All main components */}
        <div className="xl:col-span-3 space-y-6">
          {/* Model Performance Chart */}
          <div className="w-full">
            <ModelPerformanceChart />
          </div>

          {/* Data Volume Chart */}
          <div className="w-full">
            <DataVolumeChart />
          </div>
        </div>

        {/* Right Sidebar - Recent Activity only */}
        <div className="xl:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* Active Experiments */}
          <div className="w-full">
            <ActiveExperiments />
          </div>

      {/* System Metrics Component */}
      <SystemMetrics />
    </div>
  );
};

export default Overview;
