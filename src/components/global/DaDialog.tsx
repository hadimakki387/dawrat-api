import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import DaButton from "./DaButton";

interface DialogProps {
  open: boolean;
  title?: string;
  message?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  PaperProps?: React.CSSProperties;
  closeText?: string;
  confirmText?: string;
  defaultButtoms?: boolean;
  children?: React.ReactNode;
  closeIcon?: boolean;
  styling?:{
    okButton?:{
      className?:string
    },
    closeButton?:{
      className?:string
    }
  }
}

export default function DaDialog({
  open = false,
  title,
  message,
  onClose,
  onConfirm,
  maxWidth = "sm",
  PaperProps,
  closeText = "Cancel",
  confirmText = "Confirm",
  defaultButtoms = false,
  children,
  closeIcon = false,
}: DialogProps) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={maxWidth}
        fullWidth
        PaperProps={{
          sx: PaperProps,
        }}
      >
        {title && (
          <DialogTitle
            id="alert-dialog-title"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>{title}</div>{" "}
            <button>
              {closeIcon && (
                <FontAwesomeIcon
                  icon={faX}
                  onClick={onClose}
                  className={`w-4 h-4`}
                />
              )}
            </button>{" "}
          </DialogTitle>
        )}

        <div className="p-4">{children}</div>

        {defaultButtoms && (
          <DialogActions>
            <DaButton onClick={onClose} label={closeText} />
            <DaButton onClick={onConfirm} label={confirmText} />
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
}
