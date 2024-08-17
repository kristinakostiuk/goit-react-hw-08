import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegistrationForm.module.css';

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={RegistrationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label} htmlFor="name">
          Name
        </label>
        <Field className={css.input} type="text" name="name" />
        <ErrorMessage
          className={css.errorMessage}
          name="name"
          component="div"
        />

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
        <Field className={css.input} type="password" name="password" />
        <ErrorMessage
          className={css.errorMessage}
          name="password"
          component="div"
        />

        <button className={css.button} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
}
