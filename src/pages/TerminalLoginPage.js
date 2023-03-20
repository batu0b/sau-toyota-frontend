import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { CustomDatePicker } from "../components/inputs/CustomDatePicker";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { CustomInputText } from "../components/inputs/CustomInputText";
import { VirtualKeyboard } from "../components/VirtualKeyboard";
import DialogRaw from "../components/DialogRaw";

export default function TerminalLoginPage() {
  const [focusedField, setFocusedField] = useState(null);
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const colorPickerFunc = (vard) => {
    if (vard === "blue") {
      return "#1ba6e7";
    } else if (vard === "red") {
      return "#D41922";
    } else if (vard === "white") {
      return "#ffff";
    } else {
      return "#C6FFC8";
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/2 border-black flex flex-col lga:w-5/6 rounded-md border h-fit ">
        <header className="p-4 border-b border-black">asdas</header>
        <div className="h-full pt-5 flex justify-center ">
          {" "}
          <Formik
            initialValues={{
              password: "",
              RegistrationNo: "",
              assemblyNo: "",
              shift: "",
              date: null,
              termName: "",
            }}
            validationSchema={Yup.object({
              password: Yup.string().required(`${t("PassReq")}`),
              assemblyNo: Yup.number().max(5).required(),
            })}
          >
            {({ values, handleChange, setFieldValue }) => {
              return (
                <Form className="flex w-full  flex-col justify-center gap-5 items-center">
                  <Field
                    name="termName"
                    render={({ field }) => {
                      const customChangeValue = (value) => {
                        setFieldValue("termName", value);
                      };
                      return (
                        <DialogRaw
                          value={values.termName}
                          option={[`1`, ` 2`, `3`, `4`, ` 5`]}
                          open={open}
                          setOpen={setOpen}
                          setValue={customChangeValue}
                        />
                      );
                    }}
                  />
                  <div className="flex w-[420px] flex-col gap-4 items-end  ">
                    <label className="flex w-full gap-4 items-center">
                      <div className="w-[20%] rounded-md ">Terminal Listesi</div>
                      <button
                        onClick={() => setOpen(true)}
                        className="w-[80%] h-12 relative rounded-md p-3 border border-black"
                      >
                        {values.termName}{" "}
                        <span className="absolute top-1/2 -translate-y-1/2 right-5 rotate-90 text-xl">
                          {">"}
                        </span>
                      </button>
                    </label>

                    <Field
                      name="RegistrationNo"
                      type="text"
                      component={CustomInputText}
                      onFocus={() => setFocusedField("RegistrationNo")}
                      label={t("registrationNo")}
                      className="flex w-full gap-4 items-center"
                      labelClass="w-[20%] rounded-md "
                      inputClass="w-[80%] rounded-md p-3 "
                    />
                    <Field
                      name="password"
                      type="password"
                      label={t("password")}
                      className="flex w-full gap-4 items-center"
                      component={CustomInputText}
                      onFocus={() => setFocusedField("password")}
                      labelClass="w-[20%]"
                      inputClass="w-[80%] rounded-md p-3 "
                    />
                    <Field
                      className="flex  w-full gap-4 items-center"
                      name="assemblyNo"
                      type="text"
                      maxlength="5"
                      onFocus={() => setFocusedField("assemblyNo")}
                      component={CustomInputText}
                      label={t("assemblyNo")}
                      labelClass="w-[20%]"
                      inputClass="w-[80%] rounded-md p-3 "
                    />
                  </div>

                  <div
                    style={{
                      backgroundColor: `${colorPickerFunc(values.shift)}`,
                    }}
                    className={`w-fit rounded-md border p-2 border-black/30 flex items-center`}
                  >
                    <CustomDatePicker name="date" />
                    <Field
                      name="shift"
                      placeholder={`${t("Shift")}`}
                      className="Shift"
                      component="select"
                    >
                      <option value="" disabled hidden>
                        {t(`Shift`)}
                      </option>
                      <option value="blue"> {t("ShiftB")}</option>
                      <option value="red">{t("ShiftR")}</option>
                      <option value="white">{t("ShiftW")}</option>
                    </Field>
                  </div>
                  <div className="flex gap-6 ">
                    <button className="bg-[#000000]  LoginPageBtn ">
                      {t("Login")}{" "}
                    </button>
                    <button className="bg-[#d41922] LoginPageBtn  ">
                      {t("Close")}
                    </button>
                  </div>
                  <div className="h-fit bg-white w-full">
                    <VirtualKeyboard
                      handleChange={handleChange}
                      focusedItem={focusedField}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
