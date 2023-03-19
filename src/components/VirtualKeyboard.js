import { useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { lang } from "../Lang/VirutalKbLang";
export const VirtualKeyboard = ({ focusedItem }) => {
  const [inputs, setInputs] = useState({});
  const [layoutName, setLayoutName] = useState("default");
  const [inputName, setInputName] = useState("default");
  const keyboard = useRef();
  const { setFieldValue, values } = useFormikContext();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setInputName(focusedItem);
  }, [focusedItem]);

  useEffect(() => {
    if (focusedItem) {
      setInputs({
        ...inputs,
        [focusedItem]: values[focusedItem],
      });

      keyboard.current.setInput(values[focusedItem]);
    }
  }, [values[focusedItem], focusedItem]);

  const onChangeAll = (inputs) => {
    setInputs({ ...inputs });
    if (focusedItem) {
      setFieldValue(inputName, inputs[inputName]);
    }
  };

  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";

    setLayoutName(newLayoutName);
  };

  const onKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  return (
    <div className="App">
      <KeyboardReact
        layout={lang(i18n)}
        keyboardRef={(r) => (keyboard.current = r)}
        inputName={inputName}
        layoutName={layoutName}
        onChangeAll={onChangeAll}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};
