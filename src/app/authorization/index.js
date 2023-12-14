import { useCallback, useEffect, memo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from "../../hooks/use-selector";
import { useNavigate } from 'react-router-dom';
import TopHeader from '../../components/top-header';
import useTranslate from '../../hooks/use-translate';

function Authorization() {
    const store = useStore()
    const navigate = useNavigate()

    const auth = useSelector(state => state.user.auth)
    const username = useSelector(state => state.user.params.profile.name)
    const id = useSelector(state => state.user.params._id)

    const callbacks = {
        logout: useCallback(() => {
            store.actions.user.logout()
            navigate("/login")
        }, [store]),
        self: useCallback((token) => store.actions.user.self(token), [store]),
    }

    const { t } = useTranslate();
    const TopHeaderT = {
        enter: t("user.enter"),
        exit: t("user.exit"),
    }

    useEffect(() => {
        const localStorageToken = localStorage.getItem('X-Token')
        localStorageToken && callbacks.self(localStorageToken)
    }, [])

    return (
        <TopHeader
            t={TopHeaderT}
            auth={auth}
            username={username}
            id={id}
            logout={callbacks.logout}
        />
    )
}

export default memo(Authorization);