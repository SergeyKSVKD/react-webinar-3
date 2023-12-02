import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, onAddItem, basket, deleteFromBasket }) {
  const displayedList = basket && basket || list

  return (
    <>
      {
        displayedList.map(item =>
          <div key={item.code}>
            <Item item={item} onAddItem={onAddItem} deleteFromBasket={deleteFromBasket} basket={basket}/>
          </div>
        )}
    </>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItem: PropTypes.func,
  deleteFromBasket: PropTypes.func,
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }))
};

List.defaultProps = {
  onAddItem: () => {
  },
  deleteFromBasket: () => {
  },
}

export default React.memo(List);
