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
  const limit = useSelector(state => state.pagination.limit);
  const siblingCount = 1
  const select = useSelector(state => ({
    list: state.catalog.list,
  }));
  const activeModal = useSelector(state => state.modals.name);
  const status = useSelector(state => state.basket.status);

  const store = useStore();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    loadCount: useCallback(limit => store.actions.pagination.loadCount(limit), [store]),
    changePage: useCallback(count => store.actions.pagination.changePage(count), [store]),
  }

  useEffect(() => {
    callbacks.loadCount(limit)
  }, [])

  useEffect(() => {
    store.actions.catalog.load(limit, ((activePage - 1) * limit));
  }, [activePage]);


  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} status={status} />
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
