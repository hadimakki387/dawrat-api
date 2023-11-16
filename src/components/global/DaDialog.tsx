import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

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
  defaultButtoms = true,
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

        <div className="px-5 pb-5">{children}</div>

        {defaultButtoms && (
          <DialogActions>
            <Button onClick={onClose}>{closeText}</Button>
            <Button onClick={onConfirm} autoFocus>
              {confirmText}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
}
