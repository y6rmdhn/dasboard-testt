import { useAuth } from "@/context/AuthContext";
import { Form, message, TablePaginationConfig } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export interface Product {
  product_id: string;
  product_title: string;
  product_price: number;
  product_description?: string;
  product_category?: string;
  product_image?: string;
}

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  const { getToken, logout } = useAuth();

  // Fungsi utama untuk mengambil data produk dari API
  const fetchProducts = useCallback(
    async (page: number, pageSize: number, search: string) => {
      setLoading(true);
      try {
        const token = await getToken();
        if (!token) return;

        const response = await axios.get("/api/products", {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page: page,
            limit: pageSize,
            q: search,
          },
        });

        setProducts(response.data.data);
        setPagination({
          current: response.data.pagination.page,
          pageSize: response.data.pagination.limit,
          total: response.data.pagination.total,
        });
      } catch (error) {
        message.error("Gagal memuat data produk.");
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchProducts(1, pagination.pageSize, searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, pagination.pageSize, fetchProducts]);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    fetchProducts(newPagination.current!, newPagination.pageSize!, searchTerm);
  };

  const handleFormSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const token = await getToken();
      if (!token) {
        setIsSubmitting(false);
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      if (modalType === "edit" && editingProduct) {
        await axios.put(
          "/api/product",
          { ...values, product_id: editingProduct.product_id },
          { headers }
        );
        message.success("Produk berhasil diperbarui!");
      } else {
        await axios.post("/api/product", values, { headers });
        message.success("Produk berhasil ditambahkan!");
      }

      setIsModalVisible(false);
      fetchProducts(pagination.current, pagination.pageSize, searchTerm);
    } catch (error) {
      message.error(
        `Gagal ${modalType === "edit" ? "memperbarui" : "menambahkan"} produk.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const showCreateModal = () => {
    setModalType("create");
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (product: Product) => {
    setModalType("edit");
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDelete = async (productId: string) => {
    try {
      const token = await getToken();
      if (!token) return;
      await axios.delete(`/api/product?productId=${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Produk berhasil dihapus!");
      fetchProducts(pagination.current, pagination.pageSize, searchTerm);
    } catch (error) {
      message.error("Gagal menghapus produk.");
    }
  };

  return {
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
    setIsModalVisible,
    handleDelete,
    isSubmitting,
  };
};

export default useProduct;
