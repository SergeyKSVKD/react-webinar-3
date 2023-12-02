import React from 'react'
import cn from 'classnames'
import './style.css';
import List from '../list';

const Modal = ({ active_basket, activeBasketHandler, basket, list, onAddItem, deleteFromBasket, totalPrice }) => {

    return <div className={cn('container', {
        'active': active_basket
    })}
        onClick={() => activeBasketHandler(false)}
    >
        <div className='modal'
            onClick={(e) => {
                e.stopPropagation()
            }}
        >
            <div className='modal_title'><h2>Корзина</h2><button
                onClick={() => activeBasketHandler(false)}
            >Закрыть</button></div>
            <div className='basket_list'>
                <List
                    list={list}
                    onAddItem={onAddItem}
                    deleteFromBasket={deleteFromBasket}
                    basket={basket}
                />
            </div>
            <div className='totalPrice'><span>Итого</span><span>{totalPrice}</span></div>
        </div>
    </div>
}

export default React.memo(Modal)