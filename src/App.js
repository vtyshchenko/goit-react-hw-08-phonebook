import { Routes, Route } from 'react-router-dom';

import { React, lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.scss';

import Header from './components/Header/Header';
import { currentUser } from './redux/auth/authOperations';

const MainView = lazy(() => import('./views/MainView.js' /* webpackChunkName: "main-view" */));
const PhonebookView = lazy(() =>
  import('./views/PhonebookView' /* webpackChunkName: "phone-book-view" */),
);
const LoginView = lazy(() => import('./views/LoginView' /* webpackChunkName: "login-view" */));
const RegisterView = lazy(() =>
  import('./views/RegisterView' /* webpackChunkName: "login-view" */),
);
const NotFoundView = lazy(() =>
  import('./views/NotFoundView.js' /* webpackChunkName: "not-found-view" */),
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('11');
    dispatch(currentUser());
  }, []);

  return (
    <>
      <Suspense
        fallback={
          <>
            <h1>LOADING...</h1>
          </>
        }
      >
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<MainView />} />
            <Route path="contacts" element={<PhonebookView />} />
            <Route path="login" element={<LoginView />} />
            <Route path="register" element={<RegisterView />} />
            <Route path="*" element={<NotFoundView />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
