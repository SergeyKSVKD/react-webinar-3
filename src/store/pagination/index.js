import StoreModule from "../module";

class Pagination extends StoreModule {

    initState() {
        return {
            active_page: 1,
            count: 0,
            limit: 10,
        }
    }


    changePage(count) {

        this.setState({
            ...this.getState(),
            active_page: count,
        }, 'Смена страницы');
    }

    async loadCount(limit = 10) {
        const response = await fetch(`/api/v1/articles?limit=${limit}&skip=10&fields=items(_id, title, price),count`);
        const json = await response.json()
        const count = await json.result.count
        this.setState({
            ...this.getState(),
            count: Math.ceil(count / limit ),
        }, 'Общее количество страниц');
    }
}

export default Pagination;