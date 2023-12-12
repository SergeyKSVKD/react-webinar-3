import { memo, useState, useEffect, useCallback } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useLocation } from "react-router-dom";
import Basket from "../../app/basket";
import Preloader from '../../components/preloader'
import ProductCard from "../../components/product-card";

function Product() {
    const store = useStore();
    const activeModal = useSelector(state => state.modals.name);
    const product = useSelector(state => state.product.product)
    const location = useLocation()
    const [language, setLanguage] = useState({
        locale: 'ru-Ru',
        options: { style: "currency", currency: "RUB" },
    })

    const callbacks = {
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        loadProduct: useCallback(id => store.actions.product.loadProduct(id), [store]),
        cleanProduct: useCallback(() => store.actions.product.cleanProduct(), [store]),
    }

    useEffect(() => {
        const id = location.pathname.slice(10, location.pathname.length)
        callbacks.loadProduct(id)

        return () => callbacks.cleanProduct()
    }, [location.pathname])

    return (<>
        {product ? <ProductCard
            product={product}
            language={language}
            addToBasket={callbacks.addToBasket}
        /> : <Preloader />}
        {activeModal === 'basket' && <Basket />}
    </>
    )
}

export default memo(Product);