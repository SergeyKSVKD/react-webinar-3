import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import List from "../../components/list";
import Pagination from '../../components/pagination';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Basket from "../basket/";

function Main() {
  const activePage = useSelector(state => state.pagination.active_page);
  const pageCount = useSelector(state => state.pagination.count);
  const siblingCount = 1
  const select = useSelector(state => ({
    list: state.catalog.list,
  }));
  const activeModal = useSelector(state => state.modals.name);

  const store = useStore();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    loadCount: useCallback(_id => store.actions.pagination.loadCount(), [store]),
    changePage: useCallback(count => store.actions.pagination.changePage(count), [store]),
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
      <Pagination
        activePage={activePage}
        pageCount={pageCount}
        siblingCount={siblingCount}
        changePage={callbacks.changePage}
      />
    </>
  );
}

export default memo(Main);
