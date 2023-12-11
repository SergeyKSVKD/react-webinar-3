import StoreModule from "../module";

class Basket extends StoreModule {

  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
      status: 'idle',
    }
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
  */
  async addToBasket(_id) {
    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      this.setState({
        ...this.getState(),
        status: 'loading',
      }, 'Загрузка товара');
      const response = await fetch(`api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json()
      const product = await json.result
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      // @todo В реальном приложении будет запрос к АПИ вместо поиска по состоянию.
      list.push({ ...product, amount: 1 }); // list уже новый, в него можно пушить.
      // Добавляем к сумме.
      sum += product.price;
    }

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length,
      status: 'idle',
    }, 'Добавление в корзину');
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Удаление из корзины');
  }
}

export default Basket;
