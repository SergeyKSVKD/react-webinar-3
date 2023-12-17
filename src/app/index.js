import { Routes, Route } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import AuthLayout from '../containers/auth-layout';
import PageLayout from "../components/page-layout"
import Authorization from './authorization';
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  const error = useSelector(state => state.profile.params.error)

  return (
    <AuthLayout>
      <PageLayout head={<Authorization />}>
        <Routes>
          <Route path={''} element={<Main />} />
          <Route path={'/articles/:id'} element={<Article />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/profile/:id'} element={!error ? <Profile /> :
            <span style={{ display: "block", textAlign: "center", color: "red" }}>{error}</span>
          } />
        </Routes>

        {activeModal === 'basket' && <Basket />}
      </PageLayout>
    </AuthLayout>
  );
}

export default App;
