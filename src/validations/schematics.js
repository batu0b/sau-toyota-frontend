import * as Yup from "yup";

export const TerminalLoginSchema = Yup.object().shape({
  password: Yup.string().required(),
  assemblyNo: Yup.string().required(),
  RegistrationNo: Yup.string().required(),
  shift: Yup.string().required(),
  termName: Yup.string().required(),
  date: Yup.date().required(),
});
