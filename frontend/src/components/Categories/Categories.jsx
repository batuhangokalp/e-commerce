import { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import "./Categories.css";
const Categories = () => {
  const [categoryData, setCategoryData] = useState([]);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // #region Get categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}api/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategoryData(data);
        } else {
          console.log("Kategoriler getirilemedi!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [API_URL]);
  // #endregion
  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>All Categories</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="category-list">
          {categoryData?.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </ul>
      </div>
    </section>
  );
};
export default Categories;
