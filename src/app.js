import React, { useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const basket = store.getState().basket.list
  const active_basket = store.getState().active_basket;
  const totalPrice = store.getState().totalPrice;
  const uniqueProducts =store.getState().uniqueProducts;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItemFromBasket(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItemToBasket(code);
    }, [store]),

    activeBasketHandler: useCallback((action) => {
      store.activeBasketHandler(action);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        uniqueProducts={uniqueProducts}
        activeBasketHandler={callbacks.activeBasketHandler}
        totalPrice={totalPrice}
      />
      <List
        list={list}
        onAddItem={callbacks.onAddItem}
        deleteFromBasket={callbacks.onDeleteItem}
      />
      <Modal
        list={list}
        active_basket={active_basket}
        activeBasketHandler={callbacks.activeBasketHandler}
        basket={basket}
        deleteFromBasket={callbacks.onDeleteItem}
        onAddItem={callbacks.onAddItem}
        totalPrice={totalPrice}
      />
    </PageLayout>
  );
}

export default App;
