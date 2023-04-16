import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useImgContext } from "../../context/ImgConext/ImgContext";
import { ErrrorModalSchema } from "../../validations";
import { CustomInputText } from "../inputs/CustomInputText";
import { CustomSelectInput } from "../inputs/CustomSelectInput";
import { VirtualKeyboard } from "../VirtualKeyboard";

export const ErrorModalForm = ({ componyName, show }) => {
  const [focusedField, setFocusedField] = useState(null);
  const { errorCords, value, defPart } = useImgContext();
  const { t } = useTranslation();
  const rddOptions = [`rdd 1`, `rdd 2`, `rdd 3`];
  const repairMethod =  [`Tamir Methodu 1`, `Tamir Methoduı  2`, `Tamir Methodu  3`, `Tamir Methodu  4` , `Tamir Methodu  5` , `Tamir Methodu  6` , `Tamir Methodu  7` ];
  const defectResponsible = [`Hata Sorumlusu 1`, `Hata Sorumlusu 2`, `Hata Sorumlusu 3`, ` Hata Sorumlusu 4`, ];
  const defectClass = [`Hata Sınıfı 1`, `Hata Sınıfı  2`, `Hata Sınıfı  3`];
  const exitDepartment = [`Çıkış Departmanı 1`, `Çıkış Departmanı  2`, `Çıkış Departmanı  3`, `Çıkış Departmanı  4` , `Çıkış Departmanı  5` , `Çıkış Departmanı  6`];
  const repairType = [`Tamir Tipi 1`, `Tamir Tipi  2`, `Tamir Tipi  3`, `Tamir Tipi  4` , `Tamir Tipi  5` ];
  const navigate = useNavigate();
  const handleOnSubmit = (values) => {
    alert(
      JSON.stringify({
        CORDS: errorCords,
        defType: value,
        ...values,
        defPart: defPart,
      })
    );
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
              DefectResponsible: "",
              DefectClass: "",
              RepairType: "",
              RDD: "",
              FrequentDefect: false,
              Harigami: false,
              RepairMethod: "",
              ExitDepartment: "",
            }}
            validationSchema={ErrrorModalSchema}
            onSubmit={handleOnSubmit}
          >
            {({ handleChange, handleSubmit, touched }) => {
              return (
                <Form
                  onSubmit={handleSubmit}
                  className="flex flex-col h-full font-medium  justify-between p-5"
                >
                  <div className="flex w-full">
                    <div className="w-1/2 ">
                      
                      <h1 className="font-bold text-xl">{componyName}</h1>
                      <Field
                        name="DefectResponsible"
                        type="text"
                        component={CustomSelectInput}
                        options={defectResponsible}
                        label={t("ErrorManaging")}
                        className="ModalFormInputs"
                        inputClass="p-2 w-[70%] rounded-md"
                        optionClass="bg-[#c5fec8]"
                        
                      />
                      <Field
                        name="DefectClass"
                        type="text"
                        component={CustomSelectInput}
                        options={defectClass}
                        label={t("ErrorClass")}
                        className="ModalFormInputs"
                        inputClass="p-2 w-[70%] rounded-md"
                        optionClass="bg-[#c5fec8]"
                      />{" "}
                      <Field
                        name="ExitDepartment"
                        type="text"
                        component={CustomSelectInput}
                        options={exitDepartment}
                        label={t("ExitDepartment")}
                        className="ModalFormInputs"
                        inputClass="p-2 w-[70%] rounded-md"
                        optionClass="bg-[#c5fec8]"
                      />{" "}
                      <Field
                        name="RepairType"
                        type="text"
                        component={CustomSelectInput}
                        options={repairType}
                        label={t("RepairType")}
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
                        <label>{t("FrequentError")}</label>
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
                          options={rddOptions}
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
                          {t("Save")}
                        </button>
                        <button
                          type="button"
                          onClick={handlaCancel}
                          className="ErrorEntrySideBttn bg-red-600 text-white"
                        >
                          {t("Cancel")}
                        </button>
                      </span>
                      <Field
                        name="RepairMethod"
                        type="text"
                        component={CustomSelectInput}
                        options={repairMethod}
                        label={t("RepairMethod")}
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
                      label={t("Description")}
                      inputClass="p-1 rounded-md w-full "
                    />{" "}
                    <Field
                      onFocus={() => setFocusedField("Process")}
                      name="Process"
                      type="text"
                      component={CustomInputText}
                      className="flex w-full gap-4 items-center"
                      labelClass="w-[20%] rounded-md "
                      label={t("Process")}
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
