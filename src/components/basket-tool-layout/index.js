import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function BasketToolLayout({ children }) {

    const cn = bem('BasketToolLayout');

    return (
        <div className={cn()}>
            {children}
        </div>
    );
}

BasketToolLayout.propTypes = {
    children: PropTypes.node
}

export default memo(BasketToolLayout);