/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.basket = [];
    this.state.active_basket = false
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
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItemToBasket(item, count) {
    if (!this.state.basket.find(el => el.title === item.title)) {
      this.setState({
        ...this.state,
        basket: [...this.state.basket, item]
      })
    }
    else {
      this.state.basket.map(el => {
        if (el.title === item.title) {
          el.count = count;
        }
      })
    }
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItemFromBasket(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      basket: this.state.basket.filter(item => item.code !== code)
    })
  };

  activeBasketHandler(action) {
    this.setState({
      ...this.state,
      active_basket: this.state.active_basket = action
    })
  }
}

export default Store;
