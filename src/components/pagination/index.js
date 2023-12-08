import './style.css';
import cn from 'classnames'
import { useMemo, memo } from 'react';
import PropTypes from "prop-types";

const Pagination = ({ activePage, pageCount, siblingCount = 1, changePage }) => {

    const PageBtn = ({ page }) => {
        return <div
            onClick={() => changePage(page)}
            className={cn("page", { "active": activePage === page })}
        >{page}</div>
    }

    const Dots = () => {
        return <div className='dots'>...</div>
    }

    const pagination = useMemo(() => {
        const map = new Map()
        for (let i = 0; i < pageCount; i++) {
            map.set(`${i}`, <PageBtn key={i + 1} page={i + 1} />)
        }
        return map
    }, [pageCount, PageBtn])

    const first = pagination.get("0")
    const last = pagination.get(`${pageCount - 1}`)
    const filtered = []
    pagination.forEach(item => {
        if (item.props.page <= activePage + siblingCount
            && item.props.page > activePage - siblingCount - 1 && item.props.page !== 1
            && item.props.page !== pageCount) {
            filtered.push(item)
        }
    })

    const pag = [
        first,
        filtered.length > 0 && filtered[0].props.page - 1 === 1 ? null : <Dots key='first' />,
        ...filtered,
        filtered.length > 0 && filtered[filtered.length - 1].props.page + 1 === pageCount ? null : <Dots key='last' />,
        last,
    ]

    return <div className='pagination'>
        {pag}
    </div>
}

Pagination.propTypes = {
    activePage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    siblingCount: PropTypes.number,
    changePage: PropTypes.func,
};

Pagination.defaultProps = {
    siblingCount: 1,
    changePage: () => { },
}

export default memo(Pagination)