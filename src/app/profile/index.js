import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import SideLayout from "../../components/side-layout";
import HeaderTitle from "../../components/header-title";
import ProfileCard from "../../components/profile-card";
import Spinner from "../../components/spinner"
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import { useEffect } from "react";

function Profile() {
    const token = localStorage.getItem('X-Token')
    const username = useSelector(state => state.user.params.profile.name)
    const phone = useSelector(state => state.user.params.profile.phone)
    const email = useSelector(state => state.user.params.email)
    const waiting = useSelector(state => state.user.params.waiting)
    const navigate = useNavigate()
    const { t } = useTranslate();
    const profileT = {
        name: t("profile.name"),
        phone: t("profile.phone"),
    }

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [token])

    return (
        <>
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <SideLayout padding={'medium'}>
                <HeaderTitle text={t("profile.title")} />
            </SideLayout>
            <Spinner active={waiting}>
                <ProfileCard t={profileT}
                    username={username}
                    phone={phone}
                    email={email}
                />
            </Spinner>
        </>
    )
}

export default Profile;