import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { React, lazy, Suspense, useEffect } from 'react';

import './App.scss';

import authSelectors from './redux/auth/authSelectors';
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
  const loggedIn = useSelector(authSelectors.getIsLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  console.log(loggedIn);
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
            <Route
              path="contacts"
              element={loggedIn ? <PhonebookView /> : <Navigate to="../login" />}
            />
            <Route path="login" element={loggedIn ? <Navigate to="../" /> : <LoginView />} />
            <Route path="register" element={loggedIn ? <Navigate to="../" /> : <RegisterView />} />
            <Route path="*" element={<NotFoundView />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
