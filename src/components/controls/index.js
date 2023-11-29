import React from "react";
import './style.css';
import Modal from '../modal/index'
import { plural } from "../../utils";
import BasketIcon from "../../share/basket.svg";

function Controls({ basket, active_basket, activeBasketHandler, deleteFromBasket }) {
  const totalPrice = basket.reduce((acc, item) => {
    let count = item.count ? item.count : 1
    return acc + item.price * count
  }, 0)

  const totalItem = basket.reduce((acc, item) => {
    let count = item.count ? item.count : 1
    return acc + count
  }, 0)

  return (
    <>
      <div className='Controls'>
        В корзине:
        <span className='total'>{basket.length > 0 ? ` ${basket.length} 
        ${plural(basket.length, { one: 'товар', few: 'товара', many: 'товаров' })} / ${totalPrice} ₽`
          : 'пусто'}</span>
        {/* <button onClick={() => activeBasketHandler(true)}>Перейти</button> */}
        <div className='icon' onClick={() => activeBasketHandler(true)} >
          <span className='icon_count'>{totalItem}</span>
          <BasketIcon />
        </div>
      </div>
      <Modal
        active_basket={active_basket}
        activeBasketHandler={activeBasketHandler}
        basket={basket}
        deleteFromBasket={deleteFromBasket}
        totalPrice={totalPrice}
      />
    </>
  )
}

export default Controls;
