import React, { useState } from "react";
import PropTypes from "prop-types";
import './style.css';

function Item({ item, onAddItem, basket, deleteFromBasket }) {
  let [count, setCount] = useState(0)

  const callbacks = {
    onAddItem: () => {
      setCount(count += 1)
      onAddItem(item, count);
    },
    deleteFromBasket: () => {
      deleteFromBasket(item.code)
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title}
      </div>
      <div className='Item-price'>
        {`${item.price} `} ₽
      </div>
      <div className='Item-count'>
        {basket ? `${item.count ? item.count : 1} шт` : null}
      </div>
      <div className='Item-actions'>
        <button onClick={!basket ? callbacks.onAddItem : callbacks.deleteFromBasket}>
          {!basket ? 'Добавить' : 'Удалить'}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onAddItem: PropTypes.func,
  deleteFromBasket: PropTypes.func,
};

Item.defaultProps = {
  onAddItem: () => {
  },
  deleteFromBasket: () => {
  },
}

export default Item;
