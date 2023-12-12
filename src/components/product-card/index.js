import { memo } from "react";
import PropTypes from "prop-types";
import './style.css';
import { numberFormat } from '../../utils'

function ProductCard({ addToBasket, product, language }) {

  return (
    <div className='product'>
      <p>{product.description}</p>
      <p>Страна производитель: <span className='bold'>{product.madeIn.title}</span></p>
      <p>Категория: <span className='bold'>{product.category.title}</span></p>
      <p>Год выпуска: <span className='bold'>{product.edition}</span></p>
      <p className='currency'>Цена: {numberFormat(product.price, language.locale, language.options)}</p>
      <button onClick={() => addToBasket(product._id)}>Добавить</button>
    </div>
  )
}

ProductCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    edition: PropTypes.number,
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  addToBasket: PropTypes.func,
};

export default memo(ProductCard);
