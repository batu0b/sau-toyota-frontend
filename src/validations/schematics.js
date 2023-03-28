import * as Yup from "yup";

export const TerminalLoginSchema = Yup.object().shape({
  password: Yup.string().required(),
  assemblyNo: Yup.string().required(),
  RegistrationNo: Yup.string().required(),
  shift: Yup.string().required(),
  termName: Yup.string().required(),
  date: Yup.date().required(),
});

export const ErrrorModalSchema = Yup.object().shape({
  Description: Yup.string().required(),
  Process: Yup.string().required(),
  ErrorManager: Yup.string().required(),
  ErrorClass: Yup.string().required(),
  RepairType: Yup.string().required(),
  RDD: Yup.string().required(),
  FrequentError: Yup.bool().required(),
  Harigami: Yup.bool().required(),
  RepairMethod: Yup.string().required(),
  ExitDepartment: Yup.string().required(),
});
