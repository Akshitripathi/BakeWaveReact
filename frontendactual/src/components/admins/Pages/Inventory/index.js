import { Avatar, Layout, Rate, Space, Table, Typography } from 'antd';
import { useEffect, useState } from "react";
import { getInventory } from "../../API"; // Ensure this path is correct
import SideMenu from "../../Components/SideMenu"; // Updated SideMenu path

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
    <Layout>
      <Sider width={240} className="SideMenu">
        <SideMenu />
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Space size={20} direction="vertical">
            <Typography.Title level={4}>Inventory</Typography.Title>
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
                pageSize: 5,
              }}
            />
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Inventory;
