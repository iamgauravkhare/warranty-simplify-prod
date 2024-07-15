// Register Warranty Page

import React, { useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { registerWarrantyAPIHandler } from "../services/consumer/consumerAPIHandler";

const RegisterWarranty = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const { token, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerWarrantyHandler = (data) => {
    dispatch(registerWarrantyAPIHandler(data, token, navigate));
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        brandname: "",
        productId: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  return (
    <div className="w-full min-h-screen bg-white pt-[88px]">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <section className="max-w-[1440px] mx-auto p-5 pt-10 text-violet-600 flex flex-col gap-10">
          <h2 className="text-2xl lg:text-3xl font-bold lg:w-[50%]">
            Register Your Product Warranty Now!
          </h2>
          <form
            onSubmit={handleSubmit(registerWarrantyHandler)}
            className="p-5  w-full md:w-[50%] shadow-lg rounded-lg border flex flex-col gap-5 text-gray-800"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="brandname" className="font-semibold">
                Brand Name
              </label>
              <input
                type="text"
                id="brandname"
                name="brandname"
                className="border border-gray-300 rounded-md p-3 outline-none"
                {...register("brandname", { required: true })}
              />
              {errors.brandname && (
                <p className="text-red-600">Brand name is required.</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="productId" className="font-semibold">
                Product Id
              </label>
              <input
                type="text"
                id="productId"
                name="productId"
                className="border border-gray-300 rounded-md p-3 outline-none"
                {...register("productId", {
                  required: true,
                })}
              />
              {errors.productId && (
                <p className="text-red-600">Product id is required.</p>
              )}
            </div>
            <Button type={"submit"}>Register Warranty</Button>
          </form>
        </section>
      )}
    </div>
  );
};

export default RegisterWarranty;
