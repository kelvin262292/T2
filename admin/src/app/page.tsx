'use client';

import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Card,
  Statistic,
  Table,
  Button,
  Space,
  Tag,
  Row,
  Col,
  Typography,
  Avatar,
  Progress,
  List,
  Badge
} from 'antd';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

// Mock data
const mockProducts = [
  {
    id: 1,
    name: 'Premium 3D Chair',
    category: 'Furniture',
    price: 299.99,
    stock: 45,
    status: 'active',
    sales: 128
  },
  {
    id: 2,
    name: '3D Gaming Headset',
    category: 'Electronics',
    price: 199.99,
    stock: 23,
    status: 'active',
    sales: 89
  },
  {
    id: 3,
    name: 'Designer Lamp',
    category: 'Home Decor',
    price: 149.99,
    stock: 0,
    status: 'out_of_stock',
    sales: 67
  },
  {
    id: 4,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 399.99,
    stock: 12,
    status: 'low_stock',
    sales: 156
  }
];

const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    total: 599.98,
    status: 'completed',
    date: '2024-01-15',
    items: 2
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    total: 299.99,
    status: 'processing',
    date: '2024-01-14',
    items: 1
  },
  {
    id: 'ORD-003',
    customer: 'Bob Johnson',
    total: 149.99,
    status: 'shipped',
    date: '2024-01-13',
    items: 1
  },
  {
    id: 'ORD-004',
    customer: 'Alice Brown',
    total: 799.97,
    status: 'pending',
    date: '2024-01-12',
    items: 3
  }
];

const mockRecentActivities = [
  {
    id: 1,
    action: 'New order received',
    details: 'Order #ORD-005 from Mike Wilson',
    time: '2 minutes ago',
    type: 'order'
  },
  {
    id: 2,
    action: 'Product updated',
    details: 'Premium 3D Chair - Stock updated',
    time: '15 minutes ago',
    type: 'product'
  },
  {
    id: 3,
    action: 'Customer registered',
    details: 'New customer: Sarah Davis',
    time: '1 hour ago',
    type: 'customer'
  },
  {
    id: 4,
    action: 'Payment received',
    details: 'Payment for Order #ORD-003',
    time: '2 hours ago',
    type: 'payment'
  }
];

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard'
    },
    {
      key: 'products',
      icon: <ShoppingCartOutlined />,
      label: 'Products'
    },
    {
      key: 'orders',
      icon: <ShoppingCartOutlined />,
      label: 'Orders'
    },
    {
      key: 'customers',
      icon: <UserOutlined />,
      label: 'Customers'
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings'
    }
  ];

  const productColumns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number, _record: unknown) => (
        <Text type={stock === 0 ? 'danger' : stock < 20 ? 'warning' : 'success'}>
          {stock}
        </Text>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          active: 'green',
          out_of_stock: 'red',
          low_stock: 'orange'
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status.replace('_', ' ').toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Sales',
      dataIndex: 'sales',
      key: 'sales'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} size="small" />
          <Button type="text" icon={<EditOutlined />} size="small" />
          <Button type="text" icon={<DeleteOutlined />} size="small" danger />
        </Space>
      )
    }
  ];

  const orderColumns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <Text code>{text}</Text>
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer'
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => `$${total.toFixed(2)}`
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          completed: 'green',
          processing: 'blue',
          shipped: 'purple',
          pending: 'orange',
          cancelled: 'red'
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} size="small" />
          <Button type="text" icon={<EditOutlined />} size="small" />
        </Space>
      )
    }
  ];

  const renderDashboard = () => (
    <div>
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={45231.89}
              precision={2}
              prefix="$"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={1234}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Products"
              value={89}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Customers"
              value={567}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Recent Orders */}
        <Col xs={24} lg={16}>
          <Card title="Recent Orders" extra={<Button type="link">View All</Button>}>
            <Table
              dataSource={mockOrders.slice(0, 5)}
              columns={orderColumns}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col xs={24} lg={8}>
          <Card title="Recent Activities">
            <List
              dataSource={mockRecentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor:
                            item.type === 'order'
                              ? '#1890ff'
                              : item.type === 'product'
                              ? '#52c41a'
                              : item.type === 'customer'
                              ? '#722ed1'
                              : '#fa8c16'
                        }}
                      >
                        {item.type === 'order'
                          ? 'O'
                          : item.type === 'product'
                          ? 'P'
                          : item.type === 'customer'
                          ? 'C'
                          : '$'}
                      </Avatar>
                    }
                    title={<Text strong>{item.action}</Text>}
                    description={
                      <div>
                        <div>{item.details}</div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {item.time}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Performance Overview */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Sales Performance">
            <div style={{ padding: '20px 0' }}>
              <div style={{ marginBottom: 16 }}>
                <Text>This Month</Text>
                <Progress percent={75} status="active" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <Text>Last Month</Text>
                <Progress percent={60} />
              </div>
              <div>
                <Text>Target Achievement</Text>
                <Progress percent={85} strokeColor="#52c41a" />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Top Selling Products">
            <List
              dataSource={mockProducts.sort((a, b) => b.sales - a.sales).slice(0, 4)}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Badge count={index + 1} style={{ backgroundColor: '#1890ff' }} />}
                    title={item.name}
                    description={`${item.sales} sales - $${item.price}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderProducts = () => (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3}>Products Management</Title>
        <Space>
          <Button icon={<SearchOutlined />}>Search</Button>
          <Button type="primary" icon={<PlusOutlined />}>Add Product</Button>
        </Space>
      </div>
      <Card>
        <Table
          dataSource={mockProducts}
          columns={productColumns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
        />
      </Card>
    </div>
  );

  const renderOrders = () => (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3}>Orders Management</Title>
        <Space>
          <Button icon={<SearchOutlined />}>Search</Button>
          <Button type="primary">Export</Button>
        </Space>
      </div>
      <Card>
        <Table
          dataSource={mockOrders}
          columns={orderColumns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
        />
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return renderDashboard();
      case 'products':
        return renderProducts();
      case 'orders':
        return renderOrders();
      case 'customers':
        return <div><Title level={3}>Customers Management</Title><Text>Customer management features coming soon...</Text></div>;
      case 'analytics':
        return <div><Title level={3}>Analytics</Title><Text>Analytics dashboard coming soon...</Text></div>;
      case 'settings':
        return <div><Title level={3}>Settings</Title><Text>Settings panel coming soon...</Text></div>;
      default:
        return renderDashboard();
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Title level={4} style={{ color: 'white', margin: 0 }}>
            {collapsed ? '3D' : '3D Admin'}
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={menuItems}
          onClick={({ key }) => setSelectedMenu(key)}
        />
      </Sider>
      
      <Layout>
        <Header style={{ padding: '0 16px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          
          <Space>
            <Badge count={5}>
              <Button type="text" icon={<BellOutlined />} size="large" />
            </Badge>
            <Avatar icon={<UserOutlined />} />
            <Text strong>Admin User</Text>
          </Space>
        </Header>
        
        <Content style={{ margin: '24px 16px', padding: 24, background: '#f0f2f5', minHeight: 280 }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}

// Missing icons import - temporarily commented out
// import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
