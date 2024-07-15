// Sign In Page

import { useEffect } from "react";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { signInAPIHandler } from "../services/auth/authAPIHandler";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signInHandler = (data) => {
    dispatch(signInAPIHandler(data, navigate));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        username: "",
        password: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  return (
    <div className="w-full bg-white pt-[88px] min-h-screen">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <section className="max-w-[1440px] mx-auto p-5 pt-10 text-violet-600 flex flex-col gap-10">
          <h2 className="text-2xl sm:text-3xl font-bold lg:w-[50%]">Sign In</h2>
          <form
            onSubmit={handleSubmit(signInHandler)}
            className="p-5 w-full md:w-[50%] shadow-lg rounded-lg border flex flex-col gap-5 text-gray-800"
          >
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
                className="border border-gray-300 rounded-md p-3 outline-none"
                autoComplete="new-password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-600">Password is required.</p>
              )}
            </div>
            <Button type={"submit"}>Sign In</Button>
          </form>
          <div className="flex items-start gap-4 flex-col">
            <div className="text-gray-800 font-semibold">
              Don't have an account ?{" "}
              <Link
                className="text-violet-600 underline italic"
                to={"/sign-up"}
              >
                Create new account now.
              </Link>
            </div>
            <Link
              className="text-violet-600 italic font-semibold"
              to={"/forget-password"}
            >
              <span className="underline">Forget Password</span> ?
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default SignIn;
