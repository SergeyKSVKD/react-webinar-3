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
        const list = json.result.items.map(item => {
            return {
                ...item,
                value: item._id,
            }
        })
        list.unshift({ _id: '1', title: 'Все', parent: null, value: '' });
        const categories = []
        list.map(item => {
            if (item.parent === null) {
                categories.push(item)
            }
            if (item.parent?._id) {
                const child = list.find(el => el._id === item._id)
                const parent = categories.find(el => el._id === child.parent._id)
                if (parent?.parent === null) {
                    const index = categories.indexOf(parent)
                    return categories.splice(index + 1, 0, {
                        ...child,
                        title: `- ${child.title}`
                    })
                }
                else {
                    const parent = categories.find(el => el._id === child.parent._id)
                    const index = categories.indexOf(parent)
                    return categories.splice(index + 1, 0, {
                        ...child,
                        title: `- - ${child.title}`
                    })
                }
            }
        })
        this.setState({ list: categories, waiting: false }, 'Загружен список категорий')
    }
}

export default CategoriesState;