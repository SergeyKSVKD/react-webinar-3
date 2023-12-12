import { useCallback, memo } from 'react';
import BasketTool from '../../components/basket-tool';
import Head from '../../components/head';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function Header() {
    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum,
        title: state.catalog.header_text,
        product: state.product.product,
    }));

    const store = useStore();

    const callbacks = {
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
        changePage: useCallback(count => store.actions.pagination.changePage(count), [store]),
        changeHeader: useCallback(title => store.actions.catalog.changeHeader(title), [store]),
    }

    return (
        <>
            <Head
                title={select.title}
                changeHeader={callbacks.changeHeader}
                product={select.product}
            />
            <BasketTool
                onOpen={callbacks.openModalBasket}
                amount={select.amount}
                sum={select.sum}
                changePage={callbacks.changePage}
            />
        </>
    );
}

export default memo(Header);