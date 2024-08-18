import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import css from './Contact.module.css';
import { deleteContact } from '../../redux/contacts/operations';
import Modal from '../Modal/Modal';
import EditContactForm from '../EditContactForm/EditContactForm';

export default function Contact({ data: { id, name, number } }) {
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact(id))
      .then(() => {
        toast.success('Contact deleted successfully!');
      })
      .catch(() => {
        toast.error('Failed to delete contact.');
      });
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={css.contact}>
      <div>
        <p className={css.name}>👤 {name}</p>
        <p className={css.number}>📞 {number}</p>
      </div>
      <div className={css.buttonContainer}>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className={css.buttonEdit}
        >
          Edit
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className={css.button}
        >
          Delete
        </button>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this contact?"
      />

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Contact"
      >
        <EditContactForm
          contact={{ id, name, number }}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </Modal>
    </div>
  );
}
