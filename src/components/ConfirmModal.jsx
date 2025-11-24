export default function ConfirmModal({
  open,
  title = "Megerősítés",
  message = "Biztos vagy benne?",
  confirmText = "Igen, törlöm",
  cancelText = "Mégse",
  onConfirm,
  onCancel,
  isLoading
}) {
  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4 text-sm text-base-content/80">{message}</p>
        <div className="modal-action">
          {isLoading ? <span className="loading loading-spinner loading-md"></span> :
          <div>
          <button className="btn btn-ghost" onClick={onCancel}>{cancelText}</button>
          <button className="btn btn-error" onClick={onConfirm}>{confirmText}</button>
          </div>
          }
      
        </div>
      </div>
    </div>
  );
}