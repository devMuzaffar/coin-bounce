import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import registerSchema from "../../schemas/registerSchema";
import { TextInput } from "../../components";
import { setUser } from "../../redux/userSlice";
import { register } from "../../api/internal";

const Singup = () => {
  const registerButtonStyle =
    "bg-[#3861fb] text-white border-none outline-none w-1/3 rounded-xl py-4 px-8 font-bold m-2.5 mt-8 hover:bg-blue-900 cursor-pointer disabled:bg-blue-400 disabled:cursor-auto";
  const registerStyle =
    "mt-12 ml-2.5 text-[#16c784] cursor-pointer hover:text-green-700";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const { values, touched, handleBlur, handleChange, errors, isValid, dirty } =
    useFormik({
      initialValues: {
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
    });

  // Handle register
  const handleRegister = async () => {
    const data = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    const response = await register(data);

    if (response.status === 201) {
      // 1. setUser
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth,
      };
      dispatch(setUser(user));
      // 2. redirect -> homepage
      navigate("/");
    } else if (response.code === "ERR_BAD_RESPONSE") {
      // Display error message
      setError(response.response.data.message);
    }
  };

  return (
    <div className="mx-auto w-[80vw] h-full flex flex-col items-center justify-center py-2.5">
      <div className="text-5xl font-bold w-[inherit] text-center py-8">
        Sign Up to your account
      </div>

      {/* Name */}
      <TextInput
        type="text"
        name="name"
        value={values.name}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="name"
        error={errors.name && touched.name ? 1 : undefined}
        errorMessage={errors.name}
      />

      {/* username */}
      <TextInput
        type="text"
        name="username"
        value={values.username}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="username"
        error={errors.username && touched.username ? 1 : undefined}
        errorMessage={errors.username}
      />

      {/* email */}
      <TextInput
        type="text"
        name="email"
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="email"
        error={errors.email && touched.email ? 1 : undefined}
        errorMessage={errors.email}
      />

      {/* password */}
      <TextInput
        type="password"
        name="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="password"
        error={errors.password && touched.password ? 1 : undefined}
        errorMessage={errors.password}
      />

      {/* Confirm Password */}
      <TextInput
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="confirm password"
        error={
          errors.confirmPassword && touched.confirmPassword ? 1 : undefined
        }
        errorMessage={errors.confirmPassword}
      />

      {/* Button */}
      <button
        disabled={!isValid || !dirty}
        className={registerButtonStyle}
        onClick={() => handleRegister()}
      >
        Sign Up
      </button>

      <span>
        Already have an account?{" "}
        <button
          className={registerStyle}
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </span>
      {error != "" ? (
        <p className="text-red-600 my-5 text-xl font-bold">{error}</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Singup;
