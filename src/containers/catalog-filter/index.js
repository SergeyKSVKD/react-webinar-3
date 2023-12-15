import { memo, useCallback, useEffect, useMemo } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import Spinner from "../../components/spinner"

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  const category = useSelector(state => state.catalog.params.category);
  const categories = useSelector(state => state.categories.list);
  const waiting = useSelector(state => state.categories.waiting);

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    loadCategories: useCallback(() => store.actions.categories.loadCategories(), [store]),
    ChangeCategory: useCallback(category => store.actions.catalog.setParams({ category, page: 1 }), [store]),
  };

  const options = {
    sort: useMemo(() => ([
      { value: 'order', title: 'По порядку' },
      { value: 'title.ru', title: 'По именованию' },
      { value: '-price', title: 'Сначала дорогие' },
      { value: 'edition', title: 'Древние' },
    ]), [])
  };

  const { t } = useTranslate();

  useEffect(() => {
    callbacks.loadCategories()
  }, []);

  return (
    <SideLayout padding='medium'>
      <Spinner active={waiting}>
        <Select options={categories} value={category} onChange={callbacks.ChangeCategory} />
      </Spinner>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
        delay={1000} />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
