/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.code = 0
    this.state.lastElementId = this.state.list ? this.state.list[this.state.list.length - 1].code : 0
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    let lastElementId = this.state.list.length !== 0 ?
      this.state.list[this.state.list.length - 1].code : 0
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
    this.state.lastElementId = lastElementId
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    let code = this.state.code >= this.state.lastElementId ?
      this.state.code += 1 : this.state.lastElementId += 1
    this.setState({
      ...this.state,
      list: this.state.list ? [...this.state.list, {
        code, title: 'Новая запись'
      }] : [{
        code, title: 'Новая запись'
      }]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.state.list ?
      this.setState({
        ...this.state,
        list: this.state.list.filter(item => item.code !== code),
        code: this.state.code < code ? code : this.state.code,
      }) : null
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    document.querySelectorAll('.Item_selected').forEach(el => el.classList.remove('Item_selected'))
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (!item.count && item.selected) {
            item.count = 0
          }
          if (item.selected) {
            item.count += 1
          }
        }
        else {
          item.selected = false
        }
        return item;
      })
    })
  }
}

export default Store;
