import { useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import ReactQuill from "react-quill";

const CreateBlogPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Blog başarıyla oluşturuldu!");
        form.resetFields();
      } else {
        message.error("Blog oluşturulurken bir hata oluştu!");
      }
    } catch (error) {
      console.log("Blog oluşturma hatası:", error);
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
          label="Kategori Görseli (Link)"
          name="image"
          rules={[
            {
              required: true,
              message: "Kategori görsel linkini girin.",
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
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateBlogPage;
