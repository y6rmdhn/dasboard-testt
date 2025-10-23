"use client";

import {
  Table,
  Typography,
  Input,
  Button,
  Space,
  Modal,
  Form,
  Popconfirm,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AuthWrapper from "@/components/AuthWrapper";
import useProducts, { Product } from "@/hooks/useProduct";

const { Title } = Typography;
const { Search } = Input;
const { TextArea } = Input;

const Products = () => {
  const {
    logout,
    products,
    loading,
    pagination,
    isModalVisible,
    modalType,
    form,
    handleTableChange,
    handleFormSubmit,
    showCreateModal,
    showEditModal,
    setSearchTerm,
    handleDelete,
    setIsModalVisible,
    isSubmitting,
  } = useProducts();

  const columns = [
    {
      title: "Product Title",
      dataIndex: "product_title",
      key: "product_title",
    },
    {
      title: "Price",
      dataIndex: "product_price",
      key: "product_price",
      render: (price: number) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price),
    },
    {
      title: "Category",
      dataIndex: "product_category",
      key: "product_category",
    },
    {
      title: "Description",
      dataIndex: "product_description",
      key: "product_description",
      render: (text: string) =>
        text && text.length > 50 ? `${text.substring(0, 50)}...` : text,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Hapus produk"
            description="Apakah Anda yakin ingin menghapus produk ini?"
            onConfirm={() => handleDelete(record.product_id)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <AuthWrapper>
      <main className="p-8">
        <div className="flex items-center justify-between mb-6">
          <Title level={2} className="!m-0">
            Product Management
          </Title>
          <Button type="default" onClick={logout}>
            Logout
          </Button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <Search
            placeholder="Cari berdasarkan judul, kategori, deskripsi..."
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
            className="w-[400px]"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showCreateModal}
          >
            Create Product
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={products}
          loading={loading}
          rowKey="product_id"
          pagination={{ ...pagination, showSizeChanger: true }}
          onChange={handleTableChange}
        />

        <Modal
          title={modalType === "edit" ? "Edit Product" : "Create Product"}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="back" onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => form.submit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading" : "Submit"}
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              name="product_title"
              label="Product Title"
              rules={[{ required: true, message: "Product title is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="product_price"
              label="Price"
              rules={[
                { required: true, message: "Price is required" },
                {
                  type: "number",
                  min: 0,
                  message: "Price must be a positive number",
                  transform: (value) => Number(value),
                },
              ]}
            >
              <Input type="number" prefix="$" />
            </Form.Item>
            <Form.Item name="product_category" label="Category">
              <Input />
            </Form.Item>
            <Form.Item name="product_image" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="product_description" label="Description">
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
      </main>
    </AuthWrapper>
  );
};

export default Products;
