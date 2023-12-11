import { memo } from "react";
import PropTypes from "prop-types";
import './style.css';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
function Head({ title, changeHeader, product }) {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      changeHeader("Магазин")
    }
    if (product) {
      changeHeader(product.title)
    }
  }, [location.pathname, product])

  return (
    <div className='Head'>
      <h1>{title}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
