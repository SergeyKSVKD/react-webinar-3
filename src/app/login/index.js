import { useCallback } from "react";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import SideLayout from "../../components/side-layout";
import HeaderTitle from "../../components/header-title";
import Authentication from "../../components/authentication";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

function Login() {
    const store = useStore();
    const { t } = useTranslate();
    const authorizationT = {
        login: t("user.login"),
        password: t("user.password"),
        submit: t("user.submit"),
    }

    const callbacks = {
        login: useCallback(({ login, password, navigate }) => store.actions.user.login({ login, password, navigate }), [store]),
    }

    const error = useSelector(state => state.user.params.error)
    const token = useSelector(state => state.user.params.token)

    return (
        <>
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <SideLayout padding={'medium'}>
                <HeaderTitle
                    text={t("user.enter")} />
            </SideLayout>
            <Authentication
                t={authorizationT}
                loginHandler={callbacks.login}
                error={error}
                token={token}
            />
        </>
    )
}

export default Login;