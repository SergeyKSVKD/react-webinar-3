import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import SideLayout from "../../components/side-layout";
import HeaderTitle from "../../components/header-title";
import ProfileCard from "../../components/profile-card";
import Spinner from "../../components/spinner"
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { memo } from "react";

function Profile() {
    const username = useSelector(state => state.profile.params.profile.name)
    const phone = useSelector(state => state.profile.params.profile.phone)
    const email = useSelector(state => state.profile.params.email)
    const waiting = useSelector(state => state.profile.params.waiting)
    const { t } = useTranslate();
    const profileT = {
        name: t("profile.name"),
        phone: t("profile.phone"),
    }

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

export default memo(Profile);