
import { useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";

const CreateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}api/coupons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Kupon başarıyla oluşturuldu!");
        form.resetFields();
      } else {
        message.error("Kupon oluşturulurken bir hata oluştu!");
      }
    } catch (error) {
      console.log("Kupon oluşturma hatası:", error);
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
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateCouponPage;
