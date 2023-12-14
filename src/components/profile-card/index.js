import { memo } from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ t, username, phone, email }) {
  const cn = bem("ProfileCard");

  return (
    <div className={cn()}>
      <p>{t.name}:<span>{username}</span></p>
      <p>{t.phone}:<span>{phone}</span></p>
      <p>email:<span>{email}</span></p>
    </div>
  )
}

export default memo(ProfileCard);