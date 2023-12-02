import { calculate } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.basket = { list: [], counter: 0 };
    this.state.active_basket = false
    this.state.totalPrice = 0
    this.uniqueProducts = 0
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

  addItemToBasket(code) {
    if (!this.state.basket.list.find(el => el.code === code)) {
      const newItem = { ...this.state.list.find(el => el.code === code), count: 1 }
      this.setState({
        ...this.state,
        basket: { counter: this.state.basket.counter + 1, list: [...this.state.basket.list, newItem] },
      })
      this.setState({
        ...this.state,
        uniqueProducts: this.state.basket.list.length,
        totalPrice: calculate(this.state.basket.list),
      })
    }
    else {
      this.state.basket.list.map(el => {
        if (el.code === code) {
          el.count++;
        }
      })
      this.setState({
        ...this.state,
        basket: { counter: this.state.basket.counter + 1, list: [...this.state.basket.list,] },
        totalPrice: calculate(this.state.basket.list),
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
      basket: { ...this.state.basket, list: this.state.basket.list.filter(item => item.code !== code) },
    })
    this.setState({
      ...this.state,
      uniqueProducts: this.state.basket.list.length,
      totalPrice: calculate(this.state.basket.list),
    })
  };

  activeBasketHandler(action) {
    this.setState({
      ...this.state,
      active_basket: this.state.active_basket = action,
    })
  }
}

export default Store;
