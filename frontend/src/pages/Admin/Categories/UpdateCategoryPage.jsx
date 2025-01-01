import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input, message, Spin } from "antd";

const UpdateCategoryPage = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const params = useParams();

  const categoryId = params.id;
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}api/categories/${categoryId}`);

      if (!response.ok) {
        throw new Error("Verileri getirme hatası");
      }

      const data = await response.json();
      if (data) {
        form.setFieldsValue({
          name: data.name,
          img: data.img,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [API_URL, categoryId, form]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Kategori başarıyla güncellendi!");
      } else {
        message.error("Kategori güncellenirken bir hata oluştu!");
      }
    } catch (error) {
      console.log("Kategori güncelleme hatası:", error);
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
          label="Kategori İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Kategori ismini girin.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kategori Görseli (Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Kategori görsel linkini girin.",
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

export default UpdateCategoryPage;
