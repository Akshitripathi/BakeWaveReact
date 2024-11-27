import { Layout, Space, Table, Typography, Card } from "antd";
import axios from 'axios'; // Import axios for API calls
import { useEffect, useState } from "react";
import SideMenu from "../../Components/SideMenu"; // Adjust import path if necessary
import "./Orders.css"; // Import custom CSS for styling

const { Sider, Content } = Layout;

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  // Fetch orders from the backend
  useEffect(() => {
    setLoading(true);
    // Make GET request to fetch orders
    axios.get('http://localhost:4000/api/orders', { withCredentials: true })
      .then((res) => {
        const orders = res.data.orders.map(order => ({
          key: order._id, // Use _id as the key
          userId: order.userId,
          items: order.items,
          totalAmount: order.totalAmount,
        }));
        setDataSource(orders); // Assuming 'orders' is returned in the response
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      render: (userId) => <span className="table-text">{userId}</span>,
    },
    {
      title: "Items",
      dataIndex: "items",
      render: (items) => (
        <ul className="items-list">
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong> - {item.quantity} x ₹{item.price}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      render: (value) => <span className="table-text">₹{value}</span>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider width={200} className="SideMenu" style={{ height: "120vh" }}>
        <SideMenu />
      </Sider>

      {/* Main Content */}
      <Layout style={{ padding: "0 24px 24px", flex: 1 }}>
        <Content
          style={{
            padding: 40,
            margin: 0,
            minHeight: "100vh",
            backgroundColor: "#f7f7f7",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Space size={20} direction="vertical" style={{ width: "100%" }}>
            <Typography.Title level={3} className="page-title">
              Orders
            </Typography.Title>
            <Card className="orders-card">
              <Table
                loading={loading}
                columns={columns}
                dataSource={dataSource}
                rowKey="key" // Unique key for rows (using _id as 'key')
                pagination={{
                  pageSize: 5,
                  showSizeChanger: false,
                }}
                className="custom-table"
              />
            </Card>
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Orders;
