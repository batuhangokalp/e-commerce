import { useEffect, useState } from "react";
import { Button, message, Popconfirm, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "images",
      key: "images",
      render: (_, record) => (
        <img src={record?.images?.[0]} alt="image" width={80} />
      ),
    },
    {
      title: "Ürün İsmi",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <b>{record.name}</b>,
    },
    {
      title: "Kategori",
      dataIndex: "categoryName",
      key: "category",
      render: (_, record) => <span>{record.categoryName}</span>,
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render: (_, record) => (
        <span>{record?.price?.currentPrice?.toFixed(2)}</span>
      ),
    },
    {
      title: "İndirim Oranı",
      dataIndex: "price",
      key: "price",
      render: (_, record) => <span>%{record?.price?.discountPrice}</span>,
    },
    {
      title: "İşlem",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Ürünü Sil"
            description="Ürünü silmek istediğinize emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteProduct(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // #region Get categories and products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`${API_URL}api/categories`),
          fetch(`${API_URL}api/products`),
        ]);

        if (!categoriesResponse.ok || !productsResponse.ok) {
          message.error("Veri getirme işlemi başarısız!");
        }

        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json(),
        ]);

        const productsWithCategories = productsData.map((product) => {
          const categoryId = product.category;
          const category = categoriesData.find(
            (item) => item._id === categoryId
          );

          return {
            ...product,
            categoryName: category ? category.name : "",
          };
        });
        setDataSource(productsWithCategories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_URL]);

  // #endregion

  // #region Delete product
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${API_URL}api/products/${productId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Ürün başarıyla silindi.");
        setDataSource((prevProducts) => {
          return prevProducts.filter((product) => product._id !== productId);
        });
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

export default ProductPage;
