import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { CustomDatePicker } from "../components/inputs/CustomDatePicker";
import { useTranslation } from "react-i18next";
import { CustomInputText } from "../components/inputs/CustomInputText";
import { VirtualKeyboard } from "../components/VirtualKeyboard";
import DialogRaw from "../components/DialogRaw";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ExampleData from "../db/exampleData.json";
import { TerminalLoginSchema } from "../validations";
import { SnackBarComponent } from "../components/SnackBar";
import { useFetch } from "../hooks/useFetch";
import { apiUrl } from "../db/config";

export default function TerminalLoginPage() {
  const [isAuth, setIsAuth] = useOutletContext();
  const [focusedField, setFocusedField] = useState(null);
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(true);
  const [snackOptions, setSnackOptions] = useState({
    show: false,
    message: "",
    messageType: "",
  });
  const { depCode, filterCode } = useParams();
  const { data } = useFetch(`${apiUrl}TerminalData?depCode=${depCode}`);
  const { t } = useTranslation();
  const { ExampleUser } = ExampleData;
  const navigate = useNavigate();

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
  //dummy selectyor data
  useEffect(() => {
    if (data) {
      data[0]?.filterBaseds.map((item) => {
        if (item.termName) {
          setOptions((prev) => [...prev, item.termName]);
        } else {
          setOptions((prev) => [...prev, "Dummy Select"]);
        }
      });
    }
  }, [data]);
  //formik custom submit
  const handleOnSubmit = async (values, actions) => {
    const user = ExampleUser.find(
      (person) =>
        person.password === values.password &&
        person.sicilno === values.RegistrationNo
    );
    if (user) {
      alert(JSON.stringify(values));
      await actions.resetForm();
      setIsAuth(true);
      navigate(`/cvqsterminal/defectentry/${depCode}/${filterCode}`, {
        replace: true,
      });
    } else {
      setSnackOptions({
        message: `${t("UserNotFound")}`,
        show: true,
        messageType: "error",
      });
    }
  };

  return (
    <div className="h-screen flex justify-center  items-center">
      <div className="w-1/2 border-black flex flex-col lga:w-5/6 rounded-md border h-fit ">
        <header className="p-4 border-b uppercase  text-center text-red-600 font-bold text-lg border-black">
          cvqs (ttmt)
        </header>
        <div className="h-full pt-5 flex justify-center ">
          {" "}
          <Formik
            initialValues={{
              password: "",
              RegistrationNo: "",
              assemblyNo: "",
              shift: "",
              date: new Date(),
              termName: "",
            }}
            validationSchema={TerminalLoginSchema}
            onSubmit={handleOnSubmit}
          >
            {({ values, handleChange, setFieldValue, handleSubmit }) => {
              return (
                <Form
                  onSubmit={handleSubmit}
                  className="flex w-full  flex-col justify-center gap-5 items-center"
                >
                  <div className="flex w-[420px] flex-col gap-4 items-end  ">
                    <Field name="termName">
                      {() => {
                        const customChangeValue = (value) => {
                          setFieldValue("termName", value);
                        };
                        return (
                          <>
                            <label className="flex w-full gap-4 items-center">
                              <div className="w-[20%] rounded-md ">
                                {t("TerminalList")}
                              </div>
                              <span
                                onClick={() => setOpen(true)}
                                className="w-[80%] h-12 text-center cursor-pointer relative rounded-md p-3 border border-black"
                              >
                                {values.termName}{" "}
                                <span className="absolute top-1/2 -translate-y-1/2 right-5 rotate-90 text-xl">
                                  {">"}
                                </span>
                              </span>
                            </label>

                            <DialogRaw
                              value={values.termName}
                              option={options}
                              open={open}
                              setOpen={setOpen}
                              setValue={customChangeValue}
                            />
                          </>
                        );
                      }}
                    </Field>
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
                    className={`w-fit justify-evenly rounded-md border p-2  border-black/30 flex items-center`}
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
                    <button
                      type="submit"
                      className="bg-[#000000]  LoginPageBtn "
                    >
                      {t("Login")}{" "}
                    </button>
                    <button
                      onClick={() =>
                        navigate("/", {
                          preventScrollReset: true,
                          replace: true,
                        })
                      }
                      className="bg-[#d41922] LoginPageBtn  "
                    >
                      {t("Close")}
                    </button>
                  </div>

                  <div className="h-fit bg-white w-full">
                    <VirtualKeyboard
                      handleChange={handleChange}
                      focusedItem={focusedField}
                    />
                  </div>
                  <SnackBarComponent
                    showTimer={1500}
                    snackOptions={snackOptions}
                    setSnack={setSnackOptions}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
