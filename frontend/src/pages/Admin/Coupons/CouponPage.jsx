import { useEffect, useState } from "react";
import { Button, message, Popconfirm, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";

const CouponPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Kupon Kodu",
      dataIndex: "code",
      key: "code",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "İndirim Yüzdesi",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (text) => <b>%{text}</b>,
    },
    {
      title: "İşlem",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/coupons/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Kuponu Sil"
            description="Kuponu silmek istediğinize emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteCoupon(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // #region Get coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}api/coupons`);

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
    };
    fetchCoupons();
  }, [API_URL]);

  // #endregion

  // #region Delete coupon
  const deleteCoupon = async (couponId) => {
    try {
      const response = await fetch(`${API_URL}api/coupons/${couponId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Kupon başarıyla silindi.");
        setDataSource((prevCoupons) => {
          return prevCoupons.filter((coupon) => coupon._id !== couponId);
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

export default CouponPage;
