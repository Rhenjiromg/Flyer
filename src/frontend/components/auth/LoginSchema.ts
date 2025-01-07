import * as yup from "yup";

const loginSchema = yup.object({
  Credentials: yup.string().required("CredentialRequired"),
  Password: yup.string().required("PasswordRequired"),
});
export { loginSchema };
