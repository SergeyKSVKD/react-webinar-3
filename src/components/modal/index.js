import React from 'react'
import cn from 'classnames'
import './style.css';
import Item from "../item";

const Modal = ({ active_basket, activeBasketHandler, basket }) => {

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
                {basket.map(item =>
                    <div key={item.code}>
                        <Item item={item} basket={true}/>
                    </div>)}
            </div>
        </div>

    </div>
}

export default React.memo(Modal)