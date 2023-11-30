import React, { useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const basket = store.getState().basket.list;
  const active_basket = store.getState().active_basket;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItemFromBasket(code);
    }, [store]),

    onAddItem: useCallback((item) => {
      store.addItemToBasket(item);
    }, [store]),

    activeBasketHandler: useCallback((action) => {
      store.activeBasketHandler(action);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        basket={basket}
        active_basket={active_basket}
        activeBasketHandler={callbacks.activeBasketHandler}
        deleteFromBasket={callbacks.onDeleteItem}
      />
      <List
        list={list}
        onAddItem={callbacks.onAddItem}
        basket={basket}
      />
    </PageLayout>
  );
}

export default App;
