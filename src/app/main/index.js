import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {
  const select = useSelector(state => ({
    list: state.catalog.list,
  }));

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  };

  return (
      <List list={select.list} renderItem={renders.item} />
  );
}

export default memo(Main);
