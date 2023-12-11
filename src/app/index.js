import { useCallback, useContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import BasketTool from '../components/basket-tool';
import Head from '../components/head';
import Main from "./main";
import ProductCard from '../components/product-card'
import PageLayout from "../components/page-layout"
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const activeModal = useSelector(state => state.modals.name);
  const title = useSelector(state => state.catalog.header_text)
  const product = useSelector(state => state.product.product)
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changePage: useCallback(count => store.actions.pagination.changePage(count), [store]),
    changeHeader: useCallback(title => store.actions.catalog.changeHeader(title), [store]),
    loadProduct: useCallback(id => store.actions.product.loadProduct(id), [store]),
    cleanProduct: useCallback(() => store.actions.product.cleanProduct(), [store]),
  }

  const routesList = [
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/products/:id",
      element: <ProductCard
        addToBasket={callbacks.addToBasket}
        activeModal={activeModal}
        product={product}
        loadProduct={callbacks.loadProduct}
        cleanProduct={callbacks.cleanProduct}
      />,
    },
  ]

  const defaultRoutes = [
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]

  const routes = routesList.concat(defaultRoutes)
  const publicRoutes = []

  routes.map(item => {
    publicRoutes.push({
      path: item.path,
      element: <>
        <Head
          title={title}
          changeHeader={callbacks.changeHeader}
          product={product}
        />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          changePage={callbacks.changePage}
        />
        {item.element}
      </>
    })
  })

  const router = createBrowserRouter(publicRoutes);

  return (
    <PageLayout>
      <RouterProvider router={router} />
    </PageLayout>
  );
}

export default App;
