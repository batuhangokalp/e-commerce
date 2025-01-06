import { useCallback, useEffect, useState } from "react";
import { Button, message, Popconfirm, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";

const BlogsPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Blog Görseli",
      dataIndex: "image",
      key: "image",
      render: (_, record) => <img src={record.image} alt="image" width={80} />,
    },
    {
      title: "Blog İsmi",
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
            onClick={() => navigate(`/admin/blogs/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Bloğu Sil"
            description="Bloğu silmek istediğinize emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteBlog(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // #region Get blogs
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}api/blogs`);

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
    fetchBlogs();
  }, [fetchBlogs]);

  // #endregion

  // #region Delete category
  const deleteBlog = async (blogId) => {
    try {
      const response = await fetch(`${API_URL}api/blogs/${blogId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Blog başarıyla silindi.");
        fetchBlogs();
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

export default BlogsPage;
