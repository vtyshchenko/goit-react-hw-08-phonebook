import { Routes, Route } from 'react-router-dom';

import { React, lazy, Suspense } from 'react';

import './App.scss';

import Phonebook from './components/Phonebook';
import Header from './components/Header/Header';

const MainView = lazy(() => import('./views/MainView.js' /* webpackChunkName: "main-view" */));
const LoginView = lazy(() => import('./views/LoginView' /* webpackChunkName: "login-view" */));
const RegisterView = lazy(() =>
  import('./views/RegisterView' /* webpackChunkName: "login-view" */),
);
const NotFoundView = lazy(() =>
  import('./views/NotFoundView.js' /* webpackChunkName: "not-found-view" */),
);

function App() {
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
            <Route path="contacts" element={<Phonebook />} />
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
