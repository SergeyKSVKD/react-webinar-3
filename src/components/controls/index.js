import React from "react";
import './style.css';
import Modal from '../modal/index'
import { plural } from "../../utils";

function Controls({ basket, active_basket, activeBasketHandler }) {
  const totalPrice = basket.reduce((acc, item) => {
    let count = item.count ? item.count : 1
    return acc + item.price * count
  }, 0)

  return (
    <>
      <div className='Controls'>
        В корзине:
        <span className='total'>{basket.length > 0 ? ` ${basket.length} 
        ${plural(basket.length, { one: 'товар', few: 'товара', many: 'товаров' })} / ${totalPrice} ₽`
          : 'пусто'}</span>
        <button onClick={() => activeBasketHandler(true)}>Перейти</button>
      </div>
      <Modal
        active_basket={active_basket}
        activeBasketHandler={activeBasketHandler}
        basket={basket}
      />
    </>
  )
}

export default Controls;
