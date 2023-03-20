import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Dialog,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, options, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);
  const scrolll = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose(value);
  };

  const handleOk = () => {
    onClose(value);
  };

  const scrollUp = () => {
    scrolll.current.scrollTop -= 150;
  };
  const scrollDown = () => {
    scrolll.current.scrollTop += 150;
  };

  const handleClick = (option) => {
    setValue(option);
    handleOk();
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxHeight: 435,
          display: "flex",
          flexDirection: "row",
          backgroundColor: "transparent",
          boxShadow: "none",
          margin: 0,
        },
        ".css-1t4vnk2-MuiDialogContent-root": {
          padding: 0,
          border: "solid",
          borderWidth: 1.2,
          borderRadius: 1,
          borderColor: "#111",
          scrollBehavior: "smooth",
        },
        ".css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop": {
          backgroundColor: "transparent",
        },
      }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
      onClose={handleCancel}
    >
      <DialogContent dividers ref={scrolll}>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          sx={{ width: "100%" }}
        >
          {options.map((option, index) => (
            <DialogContent
              key={index}
              dividers
              className="relative"
              sx={{
                background: "#C6FFC8",
                padding: 0,
                height: 76,
                textAlign: "center",
              }}
              onClick={() => handleClick(option)}
            >
              <FormControlLabel
                value={option}
                key={option}
                sx={{
                  width: "100%",
                  margin: 0,
                  height: "100%",
                  justifyContent: "center",
                }}
                control={<Radio sx={{ display: "none" }} />}
                label={option}
              />
            </DialogContent>
          ))}
        </RadioGroup>
      </DialogContent>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          style={{
            padding: 20,
            borderRadius: 0,
            background: "#C6FFC8",
            borderWidth: 0.2,
            cursor: "pointer",
            paddingRight: 30,
            paddingLeft: 30,
            fontSize: 22,
          }}
          onClick={scrollUp}
        >
          ⬆
        </button>
        <button
          style={{
            padding: 20,
            paddingRight: 30,
            paddingLeft: 30,
            borderRadius: 0,
            background: "#C6FFC8",
            borderWidth: 0.2,
            cursor: "pointer",
            fontSize: 22,
          }}
          onClick={scrollDown}
        >
          ⬇{" "}
        </button>
      </div>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function DialogRaw({
  value,
  open,
  setOpen,
  setValue,
  objErrs,
  option,
}) {
  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  const optionsErr = objErrs?.map((err) => {
    return err.defectName;
  });

  const options = option?.map((op) => {
    return op;
  });
  if (value) {
    console.log(value);
  }
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        height: "auto",
      }}
    >
      <ConfirmationDialogRaw
        options={options || optionsErr}
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
      />
    </Box>
  );
}
