import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../redux/auth/operations';
import HomePage from '../pages/HomePage/Homepage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import ContactsPage from '../pages/ContactsPage/ContactsPage';
import Layout from '../components/Layout/Layout';
import PrivateRoute from '../components/PrivatRoute/PrivateRoute';
import RestrictedRoute from '../components/RestrictedRoute/RestrictedRoute';
import { Toaster } from 'react-hot-toast';
import { selectIsRefreshing } from '../redux/auth/selectors';
import css from './App.module.css';

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return (
      <div className={css.spinnerContainer}>
        <div className={css.spinner}></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/register"
            element={<RestrictedRoute component={RegistrationPage} />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute component={LoginPage} />}
          />
          <Route
            path="/contacts"
            element={<PrivateRoute component={ContactsPage} />}
          />
        </Route>
      </Routes>
    </>
  );
}
