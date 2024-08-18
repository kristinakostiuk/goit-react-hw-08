import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateContact } from '../../redux/contacts/operations';
import css from './EditContactForm.module.css';
import { toast } from 'react-hot-toast';

const EditContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(/^\d+(-\d+)*$/, 'It should be a number!')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export default function EditContactForm({ contact, setIsEditModalOpen }) {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(updateContact({ id: contact.id, updatedData: values }))
      .unwrap()
      .then(() => {
        toast.success('Contact updated successfully!');
        setIsEditModalOpen(false);
      })
      .catch(() => {
        toast.error('Failed to update contact.');
      });

    actions.resetForm();
  };

  return (
    <Formik
      validationSchema={EditContactSchema}
      initialValues={{
        name: contact.name,
        number: contact.number,
      }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label htmlFor="name" className={css.label}>
          Name
        </label>
        <Field type="text" name="name" className={css.input} />
        <ErrorMessage
          name="name"
          component="span"
          className={css.errorMessage}
        />

        <label htmlFor="number" className={css.label}>
          Number
        </label>
        <Field type="text" name="number" className={css.input} />
        <ErrorMessage
          name="number"
          component="span"
          className={css.errorMessage}
        />

        <button type="submit" className={css.button}>
          Update Contact
        </button>
      </Form>
    </Formik>
  );
}
