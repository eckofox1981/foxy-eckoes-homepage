import classNames from "classnames";
import "../../styles/toast.css";
import "../../styles/buttons.css";
import { useToastStore } from "../../store/ToastStore";

export function Toast() {
  const toast = useToastStore((store) => store.toast);
  const hideToast = useToastStore((store) => store.hideToast);

  return (
    <div
      className={classNames("toast", toast.display)}
      style={{ backgroundColor: toast.color }}
    >
      <h3 className="toast-title">{toast.title}</h3>
      <p className="toast-text">{toast.text}</p>
      <button className="menu-button" onClick={hideToast}>
        Close
      </button>
    </div>
  );
}
