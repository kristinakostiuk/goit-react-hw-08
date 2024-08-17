import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <div className={css.loginPage}>
      <h1 className={css.loginPage}>Login</h1>
      <LoginForm />
    </div>
  );
}
