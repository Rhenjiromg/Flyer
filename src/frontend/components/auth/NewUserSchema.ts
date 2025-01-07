import * as yup from "yup";

const NewUserSchema = yup.object({
  firstname: yup.string().required("FirstNameRequired"),
  lasname: yup.string(),
  username: yup
    .string()
    .required("UsernameRequired")
    .test("username-unique", "UsernameTaken", async (value) => {
      return true;
    }),
  email: yup.string().required("EmailRequired").email("InvalidEmail"),
  password: yup
    .string()
    .required("PasswordRequired")
    .test("password-validation", "PasswordInvalid", (value) => {
      if (value.length < 0) {
        return false;
      } /**Add more validation here */
      return true;
    }),
});

export { NewUserSchema };
