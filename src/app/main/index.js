import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import List from "../../components/list";
import Pagination from '../../components/pagination';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Basket from "../basket/";

function Main() {
  const activePage = useSelector(state => state.pagination.active_page);
  const select = useSelector(state => ({
    list: state.catalog.list,
  }));
  const activeModal = useSelector(state => state.modals.name);

  const store = useStore();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    loadCount: useCallback(_id => store.actions.pagination.loadCount(), [store]),
  }

  useEffect(() => {
    callbacks.loadCount()
  }, [])

  useEffect(() => {
    store.actions.catalog.load((activePage - 1) * 10);
  }, [activePage]);


  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  };

  return (
    <>
      <List list={select.list} renderItem={renders.item} />
      {activeModal === 'basket' && <Basket />}
      <Pagination />
    </>
  );
}

export default memo(Main);
