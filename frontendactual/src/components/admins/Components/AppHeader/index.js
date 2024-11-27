import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { getComments, getOrders, getAdminDetails } from "../../API";

import { useAuth } from '../../../../context/AuthContext';
function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { logout, user } = useAuth();
  const handleLogout = () => {
    logout(); // Call logout function when the button is clicked
    window.location.href = '/login'; // Redirect to login page after logout
  };
  useEffect(() => {
    

    // Fetch comments and orders
    getComments().then((res) => setComments(res.comments));
    getOrders().then((res) => setOrders(res.products));

    // Fetch admin details
    getAdminDetails()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.error("Failed to fetch admin details:", err));
  }, []);

  return (
    <div className="AppHeader">
      
      <Typography.Title style={{fontFamily:'"Delius", cursive', margin: '2rem'}}>
        {admin ? `${admin.firstName} ${admin.lastName}'s Dashboard` : "Admin Dashboard"}
      </Typography.Title>
      <Space>
        <Badge count={comments.length} dot style={{marginRight: '4rem'}}>
          <MailOutlined
            style={{ fontSize: 24 , marginRight: '4rem'}}
            onClick={() => setCommentsOpen(true)}
          />
        </Badge>
        <Badge count={orders.length} style={{marginRight: '4rem'}}>
          <BellFilled
            style={{ fontSize: 24, marginRight: '4rem' }}
            onClick={() => setNotificationsOpen(true)}
          />
        </Badge>
      </Space>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => <List.Item>{item.body}</List.Item>}
        />
      </Drawer>
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text strong>{item.title}</Typography.Text> has been ordered!
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
}

export default AppHeader;
