import { useCallback, memo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from "../../hooks/use-selector";
import { useNavigate } from 'react-router-dom';
import TopHeader from '../../components/top-header';
import useTranslate from '../../hooks/use-translate';

function Authorization() {
    const store = useStore()
    const navigate = useNavigate()

    const auth = useSelector(state => state.session.auth)
    const username = useSelector(state => state.session.params.profile.name)
    const id = useSelector(state => state.session.params._id)

    const callbacks = {
        logout: useCallback(() => {
            store.actions.session.logout()
            navigate("/login")
        }, [store]),
    }

    const { t } = useTranslate();
    const TopHeaderT = {
        enter: t("user.enter"),
        exit: t("user.exit"),
    }

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