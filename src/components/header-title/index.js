import PropTypes from "prop-types";
import { memo } from "react";
import './style.css'

function HeaderTitle({text}) {

    return (
    <h2 className="HeaderTitle">{text}</h2>
  )
}

HeaderTitle.propTypes = {
  text: PropTypes.string
}


export default memo(HeaderTitle)