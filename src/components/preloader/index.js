import './style.css'
import { memo } from 'react';

const Preloader = () => {

    return (<>
        <div className='title'>Загрузка...</div>
    </>)
}

export default memo(Preloader)