import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { CustomDatePicker } from "../components/inputs/CustomDatePicker";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { CustomInputText } from "../components/inputs/CustomInputText";

export default function TerminalLoginPage() {
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
      <div className="w-1/2 border-black flex flex-col lga:w-5/6 rounded-md border h-[90vh] ">
        <header className="p-4 border-b border-black">asdas</header>
        <div className="h-full flex justify-center ">
          {" "}
          <Formik
            initialValues={{
              password: "",
              RegistrationNo: "",
              assemblyNo: "",
              shift: "",
              date: null,
            }}
            validationSchema={Yup.object({
              password: Yup.string().required(`${t("PassReq")}`),
            })}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              handleReset,
              dirty,
              isSubmitting,

              touched,
            }) => {
              return (
                <Form className="flex flex-col justify-center gap-5 items-start">
                  <div className="flex w-[420px] flex-col gap-4 items-end  ">
                    <Field
                      name="RegistrationNo"
                      type="text"
                      component={CustomInputText}
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
                      labelClass="w-[20%]"
                      inputClass="w-[80%] rounded-md p-3 "
                    />
                    <Field
                      className="flex  w-full gap-4 items-center"
                      name="assemblyNo"
                      type="number"
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
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
