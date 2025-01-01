import { useCallback, useEffect, useState } from "react";
import { Button, message, Popconfirm, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Kategori Görseli",
      dataIndex: "image",
      key: "image",
      render: (_, record) => <img src={record.img} alt="image" width={80} />,
    },
    {
      title: "Kategori İsmi",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "İşlem",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/categories/update/${record._id}`)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Kategoriyi Sil"
            description="Kategoriyi silmek istediğinize emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteCategory(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // #region Get categories
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}api/categories`);

      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
        setLoading(false);
      } else {
        message.error("Veri getirme işlemi başarısız!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // #endregion

  // #region Delete category
  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}api/categories/${categoryId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Kategori başarıyla silindi.");
        fetchCategories();
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };
  // #endregion
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default CategoryPage;
