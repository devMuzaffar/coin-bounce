import * as yup from "yup";
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const errorMessage = "use lowercase, uppercase and digits";

const registerSchema = yup.object({
  name: yup.string().min(5).max(30).required("name is required"),
  username: yup.string().min(5).max(30).required("username is required"),
  email: yup
    .string()
    .min(5)
    .max(30)
    .email("enter a valid email")
    .required("email is required"),
  password: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordPattern, { message: errorMessage })
    .required("password is required"),
  confirmPassword: yup
    .string()
    .min(8)
    .max(25)
    .oneOf([yup.ref("password")], "password not matching")
    .required("password must match"),
});

export default registerSchema;
