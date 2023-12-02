import React from "react";
import './style.css';
import { plural } from "../../utils";

function Controls({ uniqueProducts, activeBasketHandler, totalPrice }) {

  return (
    <>
      <div className='Controls'>
        В корзине:
        <span className='total'>{uniqueProducts > 0 ? ` ${uniqueProducts} 
        ${plural(uniqueProducts, { one: 'товар', few: 'товара', many: 'товаров' })} / ${totalPrice}`
          : 'пусто'}</span>
        <button onClick={() => activeBasketHandler(true)}>Перейти</button>
      </div>
    </>
  )
}

export default Controls;
