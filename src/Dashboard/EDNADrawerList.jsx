import React from "react";
import {
  Dashboard as DashboardIcon,
  Storage as StorageIcon,
  Code as CodeIcon,
  Science as ScienceIcon,
  BarChart as BarChartIcon,
  AccountBox as AccountBoxIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  TravelExplore as TravelExploreIcon,
  Chat as ChatIcon,
  CloudUpload,
} from "@mui/icons-material";
import DrawerList from "../components/DrawerList";

const menu = [
  {
    name: "Overview",
    path: "/",
    icon: <DashboardIcon className="text-gray-400" />,
    activeIcon: <DashboardIcon className="text-white" />,
  },
  {
    name: "Upload File",
    path: "/upload",
    icon: <CloudUpload className="text-gray-400" />,
    activeIcon: <CloudUpload className="text-white" />,
  },
  {
    name: "Abundance",
    path: "/abundance",
    icon: <BarChartIcon className="text-gray-400" />,
    activeIcon: <BarChartIcon className="text-white" />,
  },
  {
    name: "Diversity Analytics",
    path: "/diversity",
    icon: <ScienceIcon className="text-gray-400" />,
    activeIcon: <ScienceIcon className="text-white" />,
  },
  {
    name: "Novel Taxa",
    path: "/novel-taxa",
    icon: <CodeIcon className="text-gray-400" />,
    activeIcon: <CodeIcon className="text-white" />,
  },
  {
    name: "Taxa Explorer",
    path: "/taxa-explorer",
    icon: <TravelExploreIcon className="text-gray-400" />,
    activeIcon: <TravelExploreIcon className="text-white" />,
  },
  {
    name: "Chat Bot",
    path: "/chatbot",
    icon: <ChatIcon className="text-gray-400" />,
    activeIcon: <ChatIcon className="text-white" />,
  },
];

const menu2 = [
  
];

const EDNADrawerList = ({ toggleDrawer }) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default EDNADrawerList;