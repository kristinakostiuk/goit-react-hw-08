import css from './Modal.module.css';

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        {title && <h2>{title}</h2>}
        {message && <p>{message}</p>}
        {children && <div className={css.content}>{children}</div>}
        <div className={css.buttons}>
          {onConfirm && (
            <button onClick={onConfirm} className={css.confirmButton}>
              Yes
            </button>
          )}
          <button onClick={onClose} className={css.cancelButton}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
