import React, { useState } from "react";
import PropTypes from "prop-types";
import './style.css';

function Item({ item, onAddItem, basket }) {
  let [count, setCount] = useState(0)

  const callbacks = {
    onAddItem: () => {
      setCount(count += 1)
      onAddItem(item, count);
    },
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
        <button onClick={callbacks.onAddItem}>
          Добавить
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
};

Item.defaultProps = {
  onAddItem: () => {
  },
}

export default Item;
