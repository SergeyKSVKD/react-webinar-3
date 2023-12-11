import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import Navbar from '../navbar'
import BasketToolLayout from '../basket-tool-layout'

function BasketTool({ sum, amount, onOpen, changePage }) {
  const cn = bem('BasketTool');
  return (<BasketToolLayout>
    <Navbar
      changePage={changePage}
    />
    <div className={cn()}>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / ${numberFormat(sum)} ₽`
          : `пусто`
        }
      </span>
      <button onClick={onOpen}>Перейти</button>
    </div>
  </BasketToolLayout>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
