import { memo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import './style.css';
import { numberFormat } from '../../utils'
import Basket from "../../app/basket";
import Preloader from '../../components/preloader'

function ProductCard({ addToBasket, activeModal, product, loadProduct, cleanProduct }) {
  const location = useLocation()
  const [language, setLanguage] = useState({
    locale: 'ru-Ru',
    options: { style: "currency", currency: "RUB" },
  })

  useEffect(() => {
    const id = location.pathname.slice(10, location.pathname.length)
    loadProduct(id)

    return () => cleanProduct()
  }, [location.pathname])

  return (<>
    {product ? <div className='product'>
      <p>{product.description}</p>
      <p>Страна производитель: <span className='bold'>{product.madeIn.title}</span></p>
      <p>Категория: <span className='bold'>{product.category.title}</span></p>
      <p>Год выпуска: <span className='bold'>{product.edition}</span></p>
      <p className='currency'>Цена: {numberFormat(product.price, language.locale, language.options)}</p>
      <button onClick={() => addToBasket(product._id)}>Добавить</button>
    </div> : <Preloader />}
    {activeModal === 'basket' && <Basket />}

  </>

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
