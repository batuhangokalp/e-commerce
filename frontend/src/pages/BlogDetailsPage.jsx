
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogDetails from "../components/BlogDetails/BlogDetails";

const BlogDetailsPage = () => {
  const [blogData, setBlogData] = useState([]);
  const params = useParams();
  const blogId = params.id;

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBlogForId = async () => {
      try {
        const response = await fetch(`${API_URL}api/blogs/${blogId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogForId();
  }, [API_URL, blogId]);
  return (
    blogData && (
      <BlogDetails
        blogData={blogData}
        setBlogData={setBlogData}
      />
    )
  );
};
export default BlogDetailsPage;
