import { Routes, Route } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
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

  return (
    <PageLayout head={<Authorization />}>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile/:id'} element={<Profile />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </PageLayout>
  );
}

export default App;
