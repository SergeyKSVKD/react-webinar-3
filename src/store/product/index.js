import StoreModule from "../module";

class Product extends StoreModule {

    initState() {
        return {
            product: null,
        }
    }

    async loadProduct(id) {
        const response = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
        const json = await response.json()
        const product = await json.result
        this.setState({
            ...this.getState(),
            product,
        }, 'Информация о продукте');
    }

    cleanProduct() {
        this.setState({
            ...this.getState(),
            product: null,
        }, 'Очистка данных о продукте');
    }
}

export default Product;