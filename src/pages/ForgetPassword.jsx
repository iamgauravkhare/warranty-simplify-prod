// Forget Password Page

import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { APIHandler } from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [OTPSent, setOTPSent] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmNewPass, setConfirmShowNewPass] = useState(false);
  const [resetPassData, setResetPassData] = useState({
    email: "",
    resetPasswordToken: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const onchangeHandler = (e) => {
    setResetPassData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const forgetPasswordHandler = async (data) => {
    try {
      setLoading(true);
      setResetPassData((prev) => {
        return { ...prev, email: data.email };
      });
      const response = await APIHandler(
        "POST",
        "auth/forget-password-otp",
        data
      );
      if (response.data.success) {
        setOTPSent(true);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  const resetPasswordHandler = async (data) => {
    try {
      setLoading(true);
      const response = await APIHandler("PUT", "auth/reset-password", data);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/sign-in");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
    setResetPassData((prev) => {
      return {
        ...prev,
        email: "",
        resetPasswordToken: "",
        newPassword: "",
        confirmNewPassword: "",
      };
    });
  };

  const resetPassFormHandler = (e) => {
    e.preventDefault();
    if (resetPassData.newPassword !== resetPassData.confirmNewPassword) {
      toast.error("Password not matched");
      return;
    }
    resetPasswordHandler(resetPassData);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
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
          <h2 className="text-2xl sm:text-3xl font-bold lg:w-[50%]">
            Forget Password
          </h2>

          {!OTPSent ? (
            <>
              <h2 className="text-gray-800 font-semibold italic">
                We will send a one time password at your registered email
                address to verify you and then you can reset your password.
              </h2>
              <form
                onSubmit={handleSubmit(forgetPasswordHandler)}
                className="p-5 w-full md:w-[50%] shadow-lg rounded-lg border flex flex-col gap-5 text-gray-800"
              >
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
                <Button type={"submit"}>Send OTP</Button>
              </form>
              <div className="text-gray-800 -mt-2 font-semibold">
                <Link
                  className="text-violet-600 underline italic"
                  to={"/sign-in"}
                >
                  Back to sign in
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-semibold italic text-green-600">
                One time password has been succesfully sent to your registered
                email address{" "}
                <span className="font-bold">{resetPassData?.email}</span>,
                Please check your email and reset your password!
              </h2>
              <form
                onSubmit={resetPassFormHandler}
                className="p-5 w-full md:w-[50%] shadow-lg rounded-lg border flex flex-col gap-5 text-gray-800 select-none"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="resetPasswordToken" className="font-semibold">
                    One Time Password
                  </label>
                  <input
                    type="text"
                    id="resetPasswordToken"
                    name="resetPasswordToken"
                    required
                    onChange={onchangeHandler}
                    value={resetPassData.resetPasswordToken}
                    className="border border-gray-300 rounded-md p-3 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2 relative">
                  <label htmlFor="newPassword" className="font-semibold">
                    New Password
                  </label>
                  <input
                    type={showNewPass ? "text" : "password"}
                    autoComplete="new-password"
                    id="newPassword"
                    name="newPassword"
                    required
                    onChange={onchangeHandler}
                    value={resetPassData.newPassword}
                    className="border border-gray-300 rounded-md p-3 outline-none"
                  />
                  <span
                    onClick={() => setShowNewPass((prev) => !prev)}
                    className="w-fit absolute right-3 top-[47%] text-4xl cursor-pointer"
                  >
                    {showNewPass ? (
                      <span>
                        <IoEye />
                      </span>
                    ) : (
                      <span>
                        <IoEyeOff />
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-2 relative">
                  <label htmlFor="confirmNewPassword" className="font-semibold">
                    Confirm New Password
                  </label>
                  <input
                    type={showConfirmNewPass ? "text" : "password"}
                    id="confirmNewPassword"
                    autoComplete="new-password"
                    name="confirmNewPassword"
                    required
                    onChange={onchangeHandler}
                    value={resetPassData.confirmNewPassword}
                    className="border border-gray-300 rounded-md p-3 outline-none"
                  />
                  <span
                    onClick={() => setConfirmShowNewPass((prev) => !prev)}
                    className="w-fit absolute right-3 top-[47%] text-4xl cursor-pointer"
                  >
                    {showConfirmNewPass ? (
                      <span>
                        <IoEye />
                      </span>
                    ) : (
                      <span>
                        <IoEyeOff />
                      </span>
                    )}
                  </span>
                </div>
                <Button type={"submit"}>Reset Password</Button>
              </form>
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default ForgetPassword;
