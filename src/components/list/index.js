import { memo } from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import useSelector from "../../store/use-selector";
import cn from 'classnames'

function List({ list, renderItem }) {
  const activeModal = useSelector(state => state.modals.name);
  return (
    <div className={cn('List', {
      'BasketList': activeModal === 'basket'
    })}>{
        list.map(item =>
          <div key={item._id} className='List-item'>
            {renderItem(item)}
          </div>
        )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: (item) => { },
}

export default memo(List);
