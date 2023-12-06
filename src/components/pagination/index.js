import './style.css';
import cn from 'classnames'
import useStore from "../../store/use-store";
import useSelector from '../../store/use-selector'
import { useCallback } from 'react';

const Pagination = () => {
    const store = useStore();
    const activePage = useSelector(state => state.pagination.active_page);
    const pageCount = useSelector(state => state.pagination.count);
    const siblingCount = 1
    const callbacks = {
        changePage: useCallback(count => store.actions.pagination.changePage(count), [store]),
    }

    const PageBtn = ({ page }) => {

        return <div
            onClick={() => callbacks.changePage(page)}
            className={cn("page", { "active": activePage === page })}
        >{page}</div>
    }

    const Dots = () => {
        return <div className='dots'>...</div>
    }

    const arr = new Array(pageCount).fill({})
    const pagination = arr.map((_, i) => {
        return <PageBtn key={i + 1} page={i + 1} />
    })
    const filtered = pagination.filter(item => item.props.page <= activePage + siblingCount
        && item.props.page > activePage - siblingCount - 1 && item.props.page !== 1
        && item.props.page !== pageCount)
    const first = pagination.filter(item => item.props.page === 1)
    const last = pagination.filter(item => item.props.page === pageCount)

    const pag = [
        first,
        filtered.length > 0 && filtered[0].props.page - 1 === 1 ? null : <Dots key='first'/>,
        ...filtered,
        filtered.length > 0 && filtered[filtered.length - 1].props.page + 1 === pageCount ? null : <Dots key='last'/>,
        last,
    ]

    return <div className='pagination'>
        {pag}
    </div>
}

export default Pagination