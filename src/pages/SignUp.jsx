// Sign Up Page

import { useEffect, useState } from "react";
import Button from "../components/Button";
import AccountType from "../components/AccountType";
import { useForm } from "react-hook-form";
import { signUpAPIHandler } from "../services/auth/authAPIHandler";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [accountType, setAccountType] = useState(null);
  const { loading } = useSelector((state) => state.auth);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUpHandler = (data) => {
    if (!accountType) {
      toast.error("Please select account type!");
      return;
    }
    const apiPayload = { ...data, accountType: accountType };
    dispatch(signUpAPIHandler(apiPayload, navigate));
  };

  useEffect(() => {
    if (accountType) {
      if (isSubmitSuccessful) {
        reset({
          firstname: "",
          lastname: "",
          email: "",
          username: "",
          password: "",
          accountType: "",
          mobilenumber: "",
        });
      }
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div className="w-full bg-white pt-[88px] min-h-screen">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <section className="max-w-[1440px] mx-auto p-5 pt-10 text-violet-600 flex flex-col gap-10 ">
          <h2 className="text-2xl sm:text-3xl font-bold lg:w-[50%]">
            Create New Account
          </h2>
          <AccountType
            accountType={accountType}
            setAccountType={setAccountType}
          />
          <form
            onSubmit={handleSubmit(signUpHandler)}
            className="p-5  w-full md:w-[50%] shadow-lg rounded-lg border flex flex-col gap-5  text-gray-800"
          >
            <div className="flex flex-col lg:flex-row items-center w-full justify-center gap-5">
              <div className="flex flex-col gap-2 w-full lg:w-[50%]">
                <label htmlFor="firstname" className="font-semibold">
                  Firstname
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="border border-gray-300 rounded-md p-3 outline-none"
                  {...register("firstname", { required: true })}
                />
                {errors.firstname && (
                  <p className="text-red-600">Firstname is required.</p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[50%]">
                <label htmlFor="lastname" className="font-semibold">
                  Lastname
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="border border-gray-300 rounded-md p-3 outline-none"
                  {...register("lastname", { required: true })}
                />
                {errors.lastname && (
                  <p className="text-red-600">Lastname is required.</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border border-gray-300 rounded-md p-3 outline-none"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-600">Email is required.</p>
              )}
            </div>
            {accountType === "manufacturer" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="brandname" className="font-semibold">
                  Brand Name
                </label>
                <input
                  type="brandname"
                  id="brandname"
                  name="brandname"
                  className="border border-gray-300 rounded-md p-3 outline-none"
                  {...register("brandname", { required: true })}
                />
                {errors.brandname && (
                  <p className="text-red-600">Username is required.</p>
                )}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                type="username"
                id="username"
                name="username"
                className="border border-gray-300 rounded-md p-3 outline-none"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="text-red-600">Username is required.</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                className="border border-gray-300 rounded-md p-3 outline-none"
                {...register("password", { required: true }, { min: "8" })}
              />
              {errors.password && (
                <p className="text-red-600">Password is required.</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="mobileNumber" className="font-semibold">
                Mobile Number
              </label>
              <input
                type="mobileNumber"
                id="mobileNumber"
                name="mobileNumber"
                className="border border-gray-300 rounded-md p-3 outline-none"
                {...register("mobileNumber", { required: true })}
              />
              {errors.mobileNumber && (
                <p className="text-red-600">Mobile number is required.</p>
              )}
            </div>
            <Button type={"submit"}>Create Account</Button>
          </form>
          <div className="text-gray-800 -mt-2 font-semibold">
            Already have an account ?{" "}
            <Link className="text-violet-600 underline italic" to={"/sign-in"}>
              Sign in now.
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default SignUp;
