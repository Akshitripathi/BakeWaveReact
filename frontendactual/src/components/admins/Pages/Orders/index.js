import { Layout, Space, Table, Typography } from "antd";
import axios from 'axios'; // Import axios for API calls
import { useEffect, useState } from "react";
import SideMenu from "../../Components/SideMenu"; // Adjust import path if necessary

const { Sider, Content } = Layout;

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  // Fetch orders from the backend
  useEffect(() => {
    setLoading(true);
    // Make GET request to fetch orders
    axios.get('/api/orders', { withCredentials: true })
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
    },
    {
      title: "Items",
      dataIndex: "items",
      render: (items) => (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong> - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      render: (value) => <span>${value}</span>,
    },
  ];

  return (
    <Layout>
      {/* Sidebar */}
      <Sider width={240} className="SideMenu">
        <SideMenu />
      </Sider>

      {/* Main Content */}
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Space size={20} direction="vertical">
            <Typography.Title level={4}>Orders</Typography.Title>
            <Table
              loading={loading}
              columns={columns}
              dataSource={dataSource}
              rowKey="key" // Unique key for rows (using _id as 'key')
              pagination={{
                pageSize: 5,
              }}
            />
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Orders;
