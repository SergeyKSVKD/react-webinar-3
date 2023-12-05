import { memo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import './style.css';
import { numberFormat } from '../../utils'

function ProductCard({ addToBasket }) {
    const location = useLocation()
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
    }, [])

    return (<>
        {product && <div className='product'>
            <p>{product.description}</p>
            <p>Страна производитель: <span className='bold'>{product.madeIn.title}</span></p>
            <p>Категория: <span className='bold'>{product.category.title}</span></p>
            <p>Год выпуска: <span className='bold'>{product.edition}</span></p>
            <p className='currency'>Цена: {numberFormat(product.price, language.locale, language.options)}</p>
            <button onClick={() => addToBasket(product._id)}>Добавить</button>
        </div>}
    </>

    )
}

ProductCard.propTypes = {
    title: PropTypes.node,
};

export default memo(ProductCard);
