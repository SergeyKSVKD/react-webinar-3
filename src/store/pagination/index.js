import StoreModule from "../module";

class Pagination extends StoreModule {

    initState() {
        return {
            active_page: 1,
            count: 0,
        }
    }


    changePage(count) {

        this.setState({
            ...this.getState(),
            active_page: count,
        }, 'Смена страницы');
    }

    async loadCount() {
        const response = await fetch(`/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count`);
        const json = await response.json()
        const count = await json.result.count
        this.setState({
            ...this.getState(),
            count: Math.ceil(count / 10 ),
        }, 'Общее количество страниц');
    }
}

export default Pagination;