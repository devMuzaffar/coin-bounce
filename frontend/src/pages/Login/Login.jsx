import { useFormik } from "formik";
import { TextInput } from "../../components";
import loginSchema from "../../schemas/loginSchema";
import { login } from "../../api/internal";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";

const Login = () => {
  const loginButtonStyle =
    "bg-[#3861fb] text-white border-none outline-none w-1/3 rounded-xl py-4 px-8 font-bold m-2.5 mt-8 hover:bg-blue-900 cursor-pointer disabled:bg-blue-400 disabled:cursor-auto";
  const registerStyle =
    "mt-12 ml-2.5 text-[#16c784] cursor-pointer hover:text-green-700";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const { values, touched, handleBlur, handleChange, errors, isValid, dirty } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: loginSchema,
    });

  // Handle Login
  const handleLogin = async () => {
    const data = {
      username: values.username,
      password: values.password,
    };
    const response = await login(data);

    if (response.status === 200) {
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
    <div className="mx-auto w-[80vw] h-[calc(100vh-200px)] flex flex-col items-center justify-center py-2.5">
      <div className="text-5xl font-bold w-[inherit] text-center py-8">
        Log in to your account
      </div>

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

      {/* Button */}
      <button
        disabled={!isValid || !dirty}
        className={loginButtonStyle}
        onClick={() => handleLogin()}
      >
        Log In
      </button>
      <span>
        Don&apos;t have an account?{" "}
        <button
          className={registerStyle}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Register
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

export default Login;
