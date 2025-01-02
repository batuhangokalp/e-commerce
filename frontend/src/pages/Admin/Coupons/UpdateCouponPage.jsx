import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message, Spin } from "antd";

const UpdateCouponPage = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const params = useParams();

  const couponId = params.id;
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}api/coupons/${couponId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            code: data.code,
            discountPercent: data.discountPercent,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [API_URL, couponId, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}api/coupons/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Kupon başarıyla güncellendi!");
        navigate("/admin/coupons");
      } else {
        message.error("Kupon güncellenirken bir hata oluştu!");
      }
    } catch (error) {
      console.log("Kupon güncelleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Kupon Kodu"
          name="code"
          rules={[
            {
              required: true,
              message: "Kupon kodunu girin.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="İndirim Yüzdesi"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "İndirim yüzdesini girin.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateCouponPage;
