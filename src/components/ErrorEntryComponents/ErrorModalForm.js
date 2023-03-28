import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useImgContext } from "../../context/ImgConext/ImgContext";
import { ErrrorModalSchema } from "../../validations";
import { CustomInputText } from "../inputs/CustomInputText";
import { CustomSelectInput } from "../inputs/CustomSelectInput";
import { VirtualKeyboard } from "../VirtualKeyboard";

export const ErrorModalForm = ({ componyName, show }) => {
  const [focusedField, setFocusedField] = useState(null);
  const { errorCords, value } = useImgContext();
  const dummyA = [`1`, `2`, `3`, ` 4`, `5`, `6`, `7`, `8`, `9`];
  const navigate = useNavigate();
  const handleOnSubmit = (values) => {
    alert(JSON.stringify({ CORDS: errorCords, defType: value, ...values }));
    localStorage.setItem("reloading", "true");
    localStorage.setItem("saved", "true");
    navigate(0);
  };
  const handlaCancel = () => {
    localStorage.setItem("reloading", "true");
    navigate(0);
  };
  if (show) {
    return (
      <div className="top-0 bottom-0 w-full fixed p-5 z-50 bg-black/30 flex justify-center items-center">
        <div className="w-[90%] h-[100%] bg-[#c5fec8] rounded-md">
          <Formik
            initialValues={{
              Description: "",
              Process: "",
              ErrorManager: "",
              ErrorClass: "",
              RepairType: "",
              RDD: "",
              FrequentError: false,
              Harigami: false,
              RepairMethod: "",
              ExitDepartment: "",
            }}
            validationSchema={ErrrorModalSchema}
            onSubmit={handleOnSubmit}
          >
            {({ handleChange, setFieldValue, handleSubmit, values }) => {
              return (
                <Form
                  onSubmit={handleSubmit}
                  className="flex flex-col h-full font-medium  justify-between p-5"
                >
                  <div className="flex w-full">
                    <div className="w-1/2 ">
                      <h1 className="font-bold text-xl">{componyName}</h1>
                      <Field
                        name="ErrorManager"
                        type="text"
                        component={CustomSelectInput}
                        options={dummyA}
                        label={"Hata Sorumlusu"}
                        className="ModalFormInputs"
                        inputClass="p-2 w-[70%] rounded-md"
                        optionClass="bg-[#c5fec8]"
                      />
                      <Field
                        name="ErrorClass"
                        type="text"
                        component={CustomSelectInput}
                        options={dummyA}
                        label={"Hata Sinifi"}
                        className="ModalFormInputs"
                        inputClass="p-2 w-[70%] rounded-md"
                        optionClass="bg-[#c5fec8]"
                      />{" "}
                      <Field
                        name="ExitDepartment"
                        type="text"
                        component={CustomSelectInput}
                        options={dummyA}
                        label={"Exit Department"}
                        className="ModalFormInputs"
                        inputClass="p-2 w-[70%] rounded-md"
                        optionClass="bg-[#c5fec8]"
                      />{" "}
                      <Field
                        name="RepairType"
                        type="text"
                        component={CustomSelectInput}
                        options={dummyA}
                        label={"Tamir Tipi"}
                        className="ModalFormInputs"
                        inputClass="p-2 w-[70%] rounded-md"
                        optionClass="bg-[#c5fec8]"
                      />
                    </div>
                    <div className="w-1/2 flex flex-col gap-5">
                      <span className="flex self-end  gap-2">
                        {" "}
                        <input
                          className="w-8 h-8 bg-transparent"
                          type="checkbox"
                        />
                        <label>Sik Gelen Hata</label>
                      </span>
                      <span className="flex items-center justify-between">
                        <span className="flex gap-2">
                          {" "}
                          <input
                            className="w-8 h-8 bg-transparent"
                            type="checkbox"
                          />
                          <label>Harigami</label>
                        </span>
                        <Field
                          name="RDD"
                          type="text"
                          component={CustomSelectInput}
                          options={dummyA}
                          label={"RDD"}
                          className="ModalFormInputs w-1/2"
                          inputClass="p-2 w-[70%] rounded-md"
                          optionClass="bg-[#c5fec8]"
                        />
                      </span>
                      <span className="flex justify-evenly gap-5">
                        <button
                          type="submit"
                          className="ErrorEntrySideBttn bg-red-600 text-white "
                        >
                          Kaydet
                        </button>
                        <button
                          type="button"
                          onClick={handlaCancel}
                          className="ErrorEntrySideBttn bg-red-600 text-white"
                        >
                          Iptal
                        </button>
                      </span>
                      <Field
                        name="RepairMethod"
                        type="text"
                        component={CustomSelectInput}
                        options={dummyA}
                        label={"Tamir Metodu"}
                        className="ModalFormInputs"
                        inputClass="p-2 w-[70%] rounded-md"
                        optionClass="bg-[#c5fec8]"
                      />
                    </div>
                  </div>
                  <div className=" flex-col w-full gap-4 items-end flex">
                    <Field
                      onFocus={() => setFocusedField("Description")}
                      name="Description"
                      type="text"
                      component={CustomInputText}
                      className="flex w-full gap-4 items-center"
                      labelClass="w-[20%] rounded-md "
                      label="Aciklama"
                      inputClass="p-1 rounded-md w-full "
                    />{" "}
                    <Field
                      onFocus={() => setFocusedField("Process")}
                      name="Process"
                      type="text"
                      component={CustomInputText}
                      className="flex w-full gap-4 items-center"
                      labelClass="w-[20%] rounded-md "
                      label="Yapilan Islem"
                      inputClass="p-1 rounded-md w-full "
                    />{" "}
                  </div>
                  <div className="h-fit  ">
                    {" "}
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
    );
  }
};
