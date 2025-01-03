import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";

const ProductDetailsPage = () => {
  const [productData, setProductData] = useState([]);
  const params = useParams();
  const productId = params.id;

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProductForId = async () => {
      try {
        const response = await fetch(`${API_URL}api/products/${productId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductForId();
  }, [API_URL, productId]);
  return productData && <ProductDetails productData={productData} />;
};
export default ProductDetailsPage;
