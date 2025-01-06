import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input, message, Spin } from "antd";
import ReactQuill from "react-quill";

const UpdateBlogPage = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const params = useParams();

  const blogId = params.id;
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchBlog = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}api/blogs/${blogId}`);

      if (!response.ok) {
        throw new Error("Verileri getirme hatası");
      }

      const data = await response.json();
      if (data) {
        form.setFieldsValue({
          name: data.name,
          image: data.image,
          description: data.description,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [API_URL, blogId, form]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}api/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Blog başarıyla güncellendi!");
      } else {
        message.error("Blog güncellenirken bir hata oluştu!");
      }
    } catch (error) {
      console.log("Blog güncelleme hatası:", error);
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
          label="Blog İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Blog ismini girin.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Blog Görseli (Link)"
          name="image"
          rules={[
            {
              required: true,
              message: "Blog görsel linkini girin.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Blog Açıklaması"
          name="description"
          rules={[
            {
              required: true,
              message: "Blog açıklamasını girin.",
            },
          ]}
        >
          <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateBlogPage;
