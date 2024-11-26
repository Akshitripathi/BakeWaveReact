import AppFooter from './admins/Components/AppFooter';
import AppHeader from './admins/Components/AppHeader';
import PageContent from './admins/Components/PageContent';
import SideMenu from './admins/Components/SideMenu';
import './Dashboard.css';


const AdminDashboard = () => {
  // const { logout } = useAuth(); // Access logout from the AuthContext
  console.log("You have reached admin apanel");

  return (
    <div className="App">
      <AppHeader />
     <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
       </div>
       <AppFooter />
      {/* <h1>Hello</h1> */}
    </div>
  );
};



export default AdminDashboard;
