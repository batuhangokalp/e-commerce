import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./BlogItem.css";
const BlogItem = ({ blogData }) => {
  console.log(blogData);

  return (
    <li className="blog-item">
      <Link to={`/blog/${blogData._id}`} className="blog-image">
        <img src={blogData?.image} alt={blogData?.name} />
      </Link>
      <div className="blog-info">
        <div className="blog-info-top">
          <span>25 Feb, 2021</span> - <span>0 Comments</span>
        </div>
        <div className="blog-info-center">
          <a href="#">{blogData?.name}</a>
        </div>
        <div className="blog-info-bottom">
          <Link to={`/blog/${blogData._id}`}>Read More</Link>
        </div>
      </div>
    </li>
  );
};
export default BlogItem;

BlogItem.propTypes = {
  blogData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
