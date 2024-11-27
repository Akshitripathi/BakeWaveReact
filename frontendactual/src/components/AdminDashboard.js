import React from 'react';
import AppFooter from './admins/Components/AppFooter';
import AppHeader from './admins/Components/AppHeader';
import PageContent from './admins/Components/PageContent';
import SideMenu from './admins/Components/SideMenu';
import './Dashboard.css';

const AdminDashboard = () => {
  // const { logout, user } = useAuth(); // Access logout and user from the AuthContext
  console.log("You have reached the admin panel");

  

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <PageContent />
      </div>
      
      <AppFooter />
    </div>
  );
};

export default AdminDashboard;
