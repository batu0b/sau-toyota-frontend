import { Alert, Slide, Snackbar } from "@mui/material";
import React from "react";

export const SnackBarComponent = ({ showTimer, snackOptions, setSnack }) => {
  const handleClose = () => {
    setSnack({
      ...snackOptions,
      show: false,
    });
  };
  const Transition = (props) => {
    return <Slide {...props} direction={snackOptions.Transition || "down"} />;
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={showTimer}
      TransitionComponent={Transition}
      open={snackOptions.show}
      onClose={handleClose}
    >
      <Alert severity={snackOptions.messageType}>{snackOptions.message}</Alert>
    </Snackbar>
  );
};
