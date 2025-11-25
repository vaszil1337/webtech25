export default function ErrorModal({
    open,
    title,
    message,
    confirmText = "Rendben",
    onConfirm,
    isLoading
}) {
    if (!open) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box ring-1 ring-error">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4 text-sm text-base-content/80">{message}</p>
                <div className="modal-action">
                    {isLoading ? <span className="loading loading-spinner loading-md"></span> :
                        <div>
                            <button className="btn btn-error" onClick={onConfirm}>{confirmText}</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}