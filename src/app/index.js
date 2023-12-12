import { useEffect } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./main";
import Product from './product'
import Header from './header';
import PageLayout from "../components/page-layout"
import useStore from "../store/use-store";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  return (
    <PageLayout>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
