import React from 'react';
import DataVolumeProgress from './DataVolumeProgress';

const RecentActivity = () => {
  const activities = [
    {
      icon: '📊',
      title: 'New data source added',
      time: '2 hours ago',
      type: 'data'
    },
    {
      icon: '🤖',
      title: 'Model trained successfully',
      time: '4 hours ago',
      type: 'model'
    },
    {
      icon: '🔬',
      title: 'Experiment gained started',
      time: '1 day ago',
      type: 'experiment'
    }
  ];

  const progress = 78.2;

  return (
    <div className=" rounded-2xl p-6 h-full">
      {/* Recent Activity Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
        <div className="border border-green">
          <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 border border-white/10 transition-all duration-200 hover:bg-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">{activity.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm leading-tight">{activity.title}</p>
                <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      

      {/* Data Volume Section */}
      <div className='space-y-4'>
        <DataVolumeProgress/>
      </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
