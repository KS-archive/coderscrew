import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Topbar from './Topbar/Topbar';

const LoggedWrapper: React.FC = ({ children }) => {
  return (
    <div>
      <Topbar />
      <Sidebar />
      {children}
    </div>
  );
};

export default LoggedWrapper;
