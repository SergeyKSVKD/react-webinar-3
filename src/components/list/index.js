import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, onAddItem }) {
  return (
    <>
      {
        list.map(item =>
          <div key={item.code}>
            <Item item={item} onAddItem={onAddItem} />
          </div>
        )}
    </>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func
};

List.defaultProps = {
  onAddItem: () => {
  },
}

export default React.memo(List);
