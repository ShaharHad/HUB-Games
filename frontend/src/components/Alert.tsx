import { ReactNode } from "react";

export interface AlertData {
  text: string;
  type: string;
}

interface Props {
  children: ReactNode;
  type: string;
  onClose: () => void;
}

const types = ["primary", "success", "danger", "info", "warning"];

const Alert = ({ children, type, onClose }: Props) => {
  return (
    <div>
      {!types.includes(type) ? (
        <div className={"alert alert-danger alert-dismissible"}>
          Error in Alert type {type}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      ) : (
        <div
          className={"alert alert-" + type + " alert-dismissible"}
          role="alert"
        >
          {children}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      )}
    </div>
  );
};

export default Alert;
