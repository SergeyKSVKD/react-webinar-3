import { memo } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

function Navbar({ changePage }) {
  const navigate = useNavigate()

  return (
    <div className="Navbar">
      <a className="Home"
        onClick={() => {
          changePage(1)
          navigate("/")
        }}>Главная</a>
    </div>
  );
}

export default memo(Navbar);