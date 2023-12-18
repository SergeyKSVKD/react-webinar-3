import StoreModule from "../module";

class CategoriesState extends StoreModule {

    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            list: [],
            waiting: false,
        };
    }

    /**
     * @return {Promise<void>}
     */

    async loadCategories() {
        this.setState({ ...this.getState(), waiting: true }, 'Загрузка списка категорий')
        const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
        const json = await response.json();
        let list = json.result.items.map(item => {
            return {
                ...item,
                value: item._id,
            }
        })

        let categories = [];
        const top = list.filter(item => item.parent === null);

        const formattedCategories = (id, level = 0, separator = '- ') => {
            const parent = list.find(item => item._id === id);
            categories = [...categories, {
                ...parent,
                title: parent.parent?._id
                    ? `${separator.repeat(level)}${parent.title}`
                    : parent.title
            }];

            const children = list.filter(item => item.parent?._id === id);

            if (children.length) {
                children.map(item => {
                    formattedCategories(item._id, (level + 1));
                })
            }
        }

        top.map(item => {
            formattedCategories(item._id);
        })
        categories.unshift({ _id: '1', title: 'Все', parent: null, value: '' });
        this.setState({ list: categories, waiting: false }, 'Загружен список категорий')
    }
}

export default CategoriesState;