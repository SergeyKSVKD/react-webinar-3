import { useCallback, useEffect, memo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from "../../hooks/use-selector";
import { useNavigate, useLocation } from 'react-router-dom';


function AuthLayot({ children }) {
    const store = useStore()
    const navigate = useNavigate()
    const location = useLocation()

    const auth = useSelector(state => state.session.auth)
    const id = useSelector(state => state.session.params._id)

    const callbacks = {
        changeAuthStatus: useCallback((status) => store.actions.session.changeAuthStatus(status), [store]),
        self: useCallback((token) => store.actions.session.self(token), [store]),
        getProfile: useCallback((token, url) => store.actions.profile.getProfile(token, url), [store]),
    }

    useEffect(() => {
        const localStorageToken = localStorage.getItem('X-Token')
        if (!auth && localStorageToken) {
            callbacks.self(localStorageToken)
        }
        if (!localStorageToken) {
            callbacks.changeAuthStatus(false)
        }
        if (auth && location.pathname.includes('/login')) {
            navigate(`/profile/${id}`)
        }
        setTimeout(() => {
            if (location.pathname.includes('/profile')) {
                const url = location.pathname.slice(9, location.pathname.length + 1)
                callbacks.getProfile(localStorageToken, url)
            }
            if (!localStorageToken && !auth && location.pathname.includes('/profile')) {
                navigate("/login")
            }
        }, [300]) // ответ > 300ms, ошибочная отрисовка ошибки доступа (403)
    }, [auth, location.pathname])

    return (
        <>
            {children}
        </>
    )
}

export default memo(AuthLayot);