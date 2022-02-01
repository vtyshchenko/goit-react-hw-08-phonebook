import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { React, lazy, Suspense, useEffect } from 'react';

import './App.scss';

import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
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
  const stateApp = useSelector(state => state.auth);
  const isFatchingCurrentUser =
    ((stateApp.token && stateApp.user.name) || (!stateApp.token && !stateApp.user.name)) &&
    !stateApp.isFetchingCurrent;
  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  return (
    isFatchingCurrentUser && (
      <>
        (
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
                element={
                  <PrivateRoute redirectTo="/">
                    <PhonebookView />
                  </PrivateRoute>
                }
              />
              <Route
                path="login"
                element={
                  <PublicRoute redirectTo="/contacts" restricted>
                    <LoginView />
                  </PublicRoute>
                }
              />
              <Route
                path="register"
                element={
                  <PublicRoute redirectTo="/contacts" restricted>
                    <RegisterView />
                  </PublicRoute>
                }
              />
              <Route path="*" element={<NotFoundView />} />
            </Route>
          </Routes>
        </Suspense>
      </>
    )
  );
}

export default App;
