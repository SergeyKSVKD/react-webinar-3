import { memo, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import './style.css';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { numberFormat } from '../../utils'
import Basket from "../../app/basket";

function ProductCard({ addToBasket }) {
  const location = useLocation()
  const store = useStore();
  const [product, setProduct] = useState(null)
  const [language, setLanguage] = useState({
    locale: 'ru-Ru',
    options: { style: "currency", currency: "RUB" },
  })

  async function loadProduct(id) {
    const url = `api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    const res = await fetch(url)
    const data = await res.json()
    setProduct(data.result || [])
  }

  useEffect(() => {
    loadProduct(location.pathname.slice(10, location.pathname.length))
    return () => {
      setProduct(null)
    }
  }, [location.pathname])

  const callbacks = {
    changeHeader: useCallback(title => store.actions.catalog.changeHeader(title), [store]),
  }

  const activeModal = useSelector(state => state.modals.name);

  useEffect(() => {
    product && callbacks.changeHeader(product.title)

    return () => callbacks.changeHeader('Магазин')
  })

  return (<>
    {product && <div className='product'>
      <p>{product.description}</p>
      <p>Страна производитель: <span className='bold'>{product.madeIn.title}</span></p>
      <p>Категория: <span className='bold'>{product.category.title}</span></p>
      <p>Год выпуска: <span className='bold'>{product.edition}</span></p>
      <p className='currency'>Цена: {numberFormat(product.price, language.locale, language.options)}</p>
      <button onClick={() => addToBasket(product._id)}>Добавить</button>
    </div>}
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
