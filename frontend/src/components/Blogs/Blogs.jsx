import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BlogItem from "./BlogItem";
import "./Blogs.css";
const Blogs = () => {
  const [blogsData, setBlogsData] = useState([]);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // #region Get categories
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}api/blogs`);
        if (response.ok) {
          const data = await response.json();
          setBlogsData(data);
        } else {
          console.log("Bloglar getirilemedi!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [API_URL]);
  // #endregion
  return (
    <section className="blogs">
      <div className="container">
        <div className="section-title">
          <h2>From Our Blog</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="blog-list">
          {blogsData?.map((blogData) => (
            <BlogItem key={blogData._id} blogData={blogData} />
          ))}
        </ul>
      </div>
    </section>
  );
};
export default Blogs;

Blogs.propTypes = {
  blogsData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
