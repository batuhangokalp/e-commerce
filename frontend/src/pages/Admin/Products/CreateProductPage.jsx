import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, message, Select, Spin } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [form] = Form.useForm();
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // #region Get categories

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}api/categories`);

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
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
    fetchCategories();
  }, [API_URL]);
  // #endregion

  // #region Helpers
  const createSplitValues = (values) => {
    return values.split("\n").map((value) => value.trim());
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // #endregion

  // #region Create product
  const onFinish = async (values) => {
    const imgLinks = createSplitValues(values.images);
    const colors = createSplitValues(values.colors);
    const sizes = createSplitValues(values.sizes);
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price: {
            currentPrice: values.currentPrice,
            discountPrice: values.discountPrice,
          },
          colors,
          sizes,
          images: imgLinks,
        }),
      });
      if (response.ok) {
        message.success("Ürün başarıyla oluşturuldu!");
        form.resetFields();
      } else {
        message.error("Ürün oluşturulurken bir hata oluştu!");
      }
    } catch (error) {
      console.log("Ürün oluşturma hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  // #endregion

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
          label="Ürün İsmi"
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
          label="Ürün Kategorisi"
          name="category"
          rules={[
            {
              required: true,
              message: "Ürünün kategorisini seçin.",
            },
          ]}
        >
          <Select>
            {categories?.map((category) => (
              <Select.Option key={category?._id} value={category?._id}>
                {category?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Ürün Fiyatı"
          name="currentPrice"
          rules={[
            {
              required: true,
              message: "Ürün fiyatını girin.",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="İndirim Oranı"
          name="discountPrice"
          rules={[
            {
              required: true,
              message: "Ürün indirim oranı girin.",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Ürün Açıklaması"
          name="description"
          rules={[
            {
              required: true,
              message: "Ürün açıklamasını girin.",
            },
          ]}
        >
          <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
        </Form.Item>

        <Form.Item
          label="Ürün Görselleri (Linkler)"
          name="images"
          rules={[
            {
              required: true,
              message: "Ürünün görsel linklerini girin.",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her görsel linkini yeni satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Renkleri (RGB Kodları)"
          name="colors" // DB'deki isimlerle aynı olcak.
          rules={[
            {
              required: true,
              message: "Ürünün renklerini girin.",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her RGB kodunu yeni satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Bedenleri"
          name="sizes"
          rules={[
            {
              required: true,
              message: "Ürünün bedenlerini girin.",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bedeni yeni satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateProductPage;
