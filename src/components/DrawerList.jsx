import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DrawerList = ({ menu, menu2, toggleDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (path) => {
    navigate(path);
    if (toggleDrawer) toggleDrawer();
  };

  return (
    <div className="h-screen w-64 flex flex-col relative overflow-hidden">
      {/* Enhanced Glassmorphism Background with Gradient Mesh */}
      <div className="absolute inset-0">
        {/* Multi-layer background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/90"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/10 via-transparent to-pink-500/10"></div>
        <div className="absolute inset-0 backdrop-blur-xl"></div>
        
        {/* Floating background elements */}
        <div className="absolute top-20 left-8 w-32 h-32 bg-gradient-to-r from-cyan-400/15 to-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-4 w-24 h-24 bg-gradient-to-r from-pink-400/15 to-rose-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        {/* Glass border */}
        <div className="absolute inset-0 border-r border-white/20 shadow-2xl shadow-black/50"></div>
      </div>
      
      {/* Enhanced Border Animations + Custom Scrollbar Styles */}
      <style jsx>{`
        @keyframes border-dance {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 
              0 0 20px rgba(0, 240, 181, 0.3),
              0 0 40px rgba(0, 240, 181, 0.2),
              inset 0 0 20px rgba(0, 240, 181, 0.1);
          }
          50% {
            box-shadow: 
              0 0 30px rgba(0, 240, 181, 0.5),
              0 0 60px rgba(0, 240, 181, 0.3),
              inset 0 0 30px rgba(0, 240, 181, 0.2);
          }
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        .active-item {
          background: linear-gradient(135deg, 
            rgba(236, 72, 153, 0.3) 0%,
            rgba(251, 113, 133, 0.25) 25%,
            rgba(249, 115, 22, 0.3) 50%,
            rgba(236, 72, 153, 0.25) 75%,
            rgba(249, 115, 22, 0.3) 100%
          );
          background-size: 400% 400%;
          animation: border-dance 3s ease infinite, glow-pulse 2s ease-in-out infinite;
          border: 1px solid rgba(0, 240, 181, 0.4);
          position: relative;
          overflow: visible;
        }

        .active-item::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: linear-gradient(45deg, 
            transparent,
            rgba(0, 240, 181, 0.3),
            transparent,
            rgba(236, 72, 153, 0.3),
            transparent
          );
          background-size: 400% 400%;
          animation: border-dance 2s linear infinite;
          z-index: -1;
          filter: blur(4px);
        }

        .floating-element {
          animation: floating 3s ease-in-out infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .neon-glow {
          filter: drop-shadow(0 0 8px rgba(0, 240, 181, 0.6));
        }

        /* Custom Scrollbar Styles for Entire Container */
        .full-scroll-container {
          scroll-behavior: smooth;
          overflow-y: auto;
          height: 100vh;
        }

        .full-scroll-container::-webkit-scrollbar {
          width: 6px;
        }

        .full-scroll-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          margin: 8px;
        }

        .full-scroll-container::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(0, 240, 181, 0.6), rgba(59, 130, 246, 0.6));
          border-radius: 3px;
          box-shadow: 0 0 10px rgba(0, 240, 181, 0.3);
        }

        .full-scroll-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(0, 240, 181, 0.8), rgba(59, 130, 246, 0.8));
          box-shadow: 0 0 15px rgba(0, 240, 181, 0.5);
        }

        /* Firefox scrollbar */
        .full-scroll-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 240, 181, 0.6) rgba(255, 255, 255, 0.05);
        }

        /* Scroll fade effects for entire container */
        .scroll-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(to bottom, rgba(51, 65, 85, 0.9) 0%, transparent 100%);
          z-index: 30;
          pointer-events: none;
          width: 256px;
        }

        .scroll-container::after {
          content: '';
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(to top, rgba(51, 65, 85, 0.9) 0%, transparent 100%);
          z-index: 30;
          pointer-events: none;
          width: 256px;
        }
      `}</style>
      
      {/* Entire Scrollable Content Container */}
      <div className="relative z-10 full-scroll-container scroll-container pr-2 py-10">
        <div className="min-h-full flex flex-col">
          {/* Enhanced Header Section - NOTE: Logo section has been removed */}
          

          {/* Enhanced Navigation Menu */}
          <div className="px-4 mb-8 py-">
            <nav className="space-y-2">
              {menu.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <div
                    key={index}
                    onClick={() => handleMenuClick(item.path)}
                    className={`
                      group relative flex items-center px-5 py-4 rounded-2xl cursor-pointer transition-all duration-500 ease-out
                      ${isActive 
                        ? 'active-item transform scale-105' 
                        : 'glass-card hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-400/30 hover:scale-102'
                      }
                    `}
                    style={{
                      transitionDelay: `${index * 50}ms`
                    }}
                  >
                    {/* Content */}
                    <div className="relative flex items-center space-x-4 w-full z-10">
                      <div className={`
                        flex items-center justify-center w-7 h-7 transition-all duration-300
                        ${isActive 
                          ? 'text-white scale-125 neon-glow' 
                          : 'text-gray-400 group-hover:text-cyan-300 group-hover:scale-110'
                        }
                      `}>
                        {isActive ? item.activeIcon : item.icon}
                      </div>
                      
                      <span className={`
                        text-sm font-medium transition-all duration-300 flex-1
                        ${isActive 
                          ? 'text-white font-bold' 
                          : 'text-gray-300 group-hover:text-white'
                        }
                      `}>
                        {item.name}
                      </span>
                      
                      {/* Enhanced Chevron */}
                      {(item.path === "/data-sources" || item.name === "Data Sources") && (
                        <div className={`
                          transition-all duration-300 
                          ${isActive 
                            ? 'text-cyan-300 rotate-90' 
                            : 'text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1'
                          }
                        `}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="transition-transform">
                            <path d="M6 12l4-4-4-4v8z"/>
                          </svg>
                        </div>
                      )}

                      {/* Active indicator dot */}
                      {isActive && (
                        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                          <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full neon-glow"></div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Enhanced Bottom Section */}
          <div className="px-4 pb-6 mt-auto">
            {/* Elegant Divider */}
            <div className="relative mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
              <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"></div>
            </div>
            
            {/* Enhanced Notification Bell */}
            
            
            {/* Enhanced Settings Menu */}
            <nav className="space-y-2 mb-6">
              {menu2.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <div
                    key={index}
                    onClick={() => handleMenuClick(item.path)}
                    className={`
                      group relative flex items-center px-5 py-4 rounded-2xl cursor-pointer transition-all duration-500 ease-out
                      ${isActive 
                        ? 'active-item transform scale-105' 
                        : 'glass-card hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-400/30'
                      }
                    `}
                  >
                    <div className="relative flex items-center space-x-4 w-full z-10">
                      <div className={`
                        flex items-center justify-center w-7 h-7 transition-all duration-300
                        ${isActive 
                          ? 'text-white scale-125 neon-glow' 
                          : 'text-gray-400 group-hover:text-cyan-300 group-hover:scale-110'
                        }
                      `}>
                        {isActive ? item.activeIcon : item.icon}
                      </div>
                      
                      <span className={`
                        text-sm font-medium transition-all duration-300 flex-1
                        ${isActive 
                          ? 'text-white font-bold' 
                          : 'text-gray-300 group-hover:text-white'
                        }
                      `}>
                        {item.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </nav>
            
            {/* Enhanced User Profile Section */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerList;