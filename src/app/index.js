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
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changeHeader: useCallback(title => store.actions.catalog.changeHeader(title), [store]),
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
        changeHeader={callbacks.changeHeader}
        activeModal={activeModal}
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
        />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
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
