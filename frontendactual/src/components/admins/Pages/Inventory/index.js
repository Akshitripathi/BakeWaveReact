import { Avatar, Layout, Rate, Space, Table, Typography, Card } from 'antd';
import { useEffect, useState } from "react";
import { getInventory } from "../../API"; // Ensure this path is correct
import SideMenu from "../../Components/SideMenu"; // Updated SideMenu path
import "./Inventory.css"; // Import custom CSS for styling

const { Sider, Content } = Layout;

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory()
      .then((res) => {
        setDataSource(res.products);
      })
      .catch((err) => {
        console.error("Failed to fetch inventory:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider width={200} className="SideMenu" style={{ height: "120vh", padding: "20px" }}>
        <SideMenu />
      </Sider>

      {/* Main Content */}
      <Layout style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Content
          style={{
            padding: 40,
            margin: 0,
            minHeight: "80%", // Make content take remaining space
            backgroundColor: "#f7f7f7",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column", // Ensures vertical alignment
          }}
        >
          <Space size={20} direction="vertical" style={{ width: "100%" }}>
            <Typography.Title level={3} className="page-title">
              Inventory
            </Typography.Title>
            <Card className="inventory-card">
              <Table
                loading={loading}
                columns={[
                  {
                    title: "Thumbnail",
                    dataIndex: "thumbnail",
                    render: (link) => <Avatar src={link} />,
                  },
                  {
                    title: "Title",
                    dataIndex: "title",
                  },
                  {
                    title: "Price",
                    dataIndex: "price",
                    render: (value) => <span>${value}</span>,
                  },
                  {
                    title: "Rating",
                    dataIndex: "rating",
                    render: (rating) => (
                      <Rate value={rating} allowHalf disabled />
                    ),
                  },
                  {
                    title: "Stock",
                    dataIndex: "stock",
                  },
                  {
                    title: "Brand",
                    dataIndex: "brand",
                  },
                  {
                    title: "Category",
                    dataIndex: "category",
                  },
                ]}
                dataSource={dataSource}
                rowKey="id"
                pagination={{
                  pageSize: 2,
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

export default Inventory;
