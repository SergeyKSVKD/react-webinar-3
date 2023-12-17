import { memo } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function TopHeader({ t, auth, username, id, logout }) {
    const cn = bem("TopHeader");

    const navigate = useNavigate();

    return (
        <div className={cn()}>
            {
                auth ?
                    <div className={cn("link")}>
                        <Link to={`/profile/${id}`} className={cn("userTitle")}>{username}</Link>
                        <button onClick={() => logout()}>{t.exit}</button>
                    </div>
                    :
                    <button onClick={() => navigate('/login')}>{t.enter}</button>
            }
        </div>
    )
}

export default memo(TopHeader);