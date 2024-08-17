import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import css from './LoginForm.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label} htmlFor="email">
          Email
        </label>
        <Field className={css.input} type="email" name="email" />
        <ErrorMessage
          className={css.errorMessage}
          name="email"
          component="div"
        />

        <label className={css.label} htmlFor="password">
          Password
        </label>
        <Field type="password" name="password" className={css.input} />
        <ErrorMessage
          className={css.errorMessage}
          name="password"
          component="div"
        />

        <button className={css.button} type="submit">
          Login
        </button>
      </Form>
    </Formik>
  );
}
