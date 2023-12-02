import React from "react";
import PropTypes from "prop-types";
import './style.css';
import cn from 'classnames'

function Item({ item, onAddItem, basket, deleteFromBasket }) {

  const callbacks = {
    onAddItem: () => {
      onAddItem(item.code);
    },
    deleteFromBasket: () => {
      deleteFromBasket(item.code)
    }
  }

  return (
    <div className={cn('Item', {
      'Item_basket': basket
    })}>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title}
      </div>
      <div className='Item-price'>
        {`${item.price} `} ₽
      </div>
      {basket ?
        <div className='Item-count'>
          {basket ? `${item.count ? item.count : 1} шт` : null}
        </div> : null}
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
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }))
};

Item.defaultProps = {
  onAddItem: () => {
  },
  deleteFromBasket: () => {
  }
}

export default Item;
