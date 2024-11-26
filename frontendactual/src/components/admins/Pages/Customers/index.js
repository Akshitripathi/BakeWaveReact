import { Avatar, Layout, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../../API"; // Ensure this path is correct
import SideMenu from "../../Components/SideMenu"; // Updated SideMenu path

const { Sider, Content } = Layout;

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers()
      .then((res) => {
        setDataSource(res.users);
      })
      .catch((err) => {
        console.error("Failed to fetch customers:", err);
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
            <Typography.Title level={4}>Customers</Typography.Title>
            <Table
              loading={loading}
              columns={[
                {
                  title: "Photo",
                  dataIndex: "image",
                  render: (link) => <Avatar src={link} />,
                },
                {
                  title: "First Name",
                  dataIndex: "firstName",
                },
                {
                  title: "Last Name",
                  dataIndex: "lastName",
                },
                {
                  title: "Email",
                  dataIndex: "email",
                },
                {
                  title: "Phone",
                  dataIndex: "phone",
                },
                {
                  title: "Address",
                  dataIndex: "address",
                },
              ]}
              dataSource={dataSource}
              rowKey="id"
            />
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Customers;
