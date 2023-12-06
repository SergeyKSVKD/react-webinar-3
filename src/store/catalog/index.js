import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      header_text: 'Магазин'
    }
  }

  changeHeader(title) {

    this.setState({
        ...this.getState(),
        header_text: title,
    }, 'Смена заголовка');
}

  async load(skip = 0) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
