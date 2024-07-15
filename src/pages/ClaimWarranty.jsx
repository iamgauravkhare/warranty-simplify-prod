// Claim Warranty Page

import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { claimWarrantyAPIHandler } from "../services/consumer/consumerAPIHandler";
import { setLoading } from "../store/reducers/slices/authSlice";
import { APIHandler } from "../utils/axiosInstance";
import toast from "react-hot-toast";

const ClaimWarranty = () => {
  const { token, loading } = useSelector((state) => state.auth);
  const [productId, setProductId] = useState("");
  const [warrantyActive, setWarrantyActive] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const claimWarrantyHandler = (data) => {
    const formData = new FormData();
    for (let i = 0; i < data.imagesPayload.length; i++) {
      formData.append("imagesPayload", data.imagesPayload[i]);
    }
    formData.append("invoicePayload", data.invoicePayload[0]);
    formData.append("brandname", data.brandname);
    formData.append("productId", data.productId);
    formData.append("productIssue", data.productIssue);
    dispatch(claimWarrantyAPIHandler(formData, token, navigate));
  };
  const checkWarrantyHandler = async (productId) => {
    try {
      dispatch(setLoading(true));
      const response = await APIHandler(
        "POST",
        `/consumer-services/check-warranty/${productId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.data.success === true) {
        setWarrantyActive(true);
        setProductId("");
        toast.success("Warranty is active!");
      } else {
        toast.success("Warranty is expires!");
      }
    } catch (error) {
      toast.error(error.response.data?.message);
    }
    dispatch(setLoading(false));
  };

  const checkWarrantyFormSubmit = (e) => {
    e.preventDefault();

    checkWarrantyHandler(productId);
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        brandname: "",
        productId: "",
        productIssue: "",
        imagesPayload: "",
        invoicePayload: "",
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
        <section className="max-w-[1440px] mx-auto p-5 pt-10 text-violet-600 flex flex-col gap-10 ">
          <h2 className="text-2xl lg:text-3xl font-bold lg:w-[50%]">
            Claim Your Product Warranty Now!
          </h2>

          {warrantyActive ? (
            <form
              onSubmit={handleSubmit(claimWarrantyHandler)}
              className="p-5  w-full md:w-[50%] shadow-lg rounded-lg border text-gray-800 flex flex-col gap-5"
              encType="multipart/form-data"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="brandname" className="font-semibold">
                  Brand Name
                </label>
                <input
                  type="text"
                  id="brandname"
                  name="brandname"
                  className="border border-gray-300 rounded-md p-2 outline-none"
                  {...register("brandname", { required: true })}
                />
                {errors.brandname && (
                  <p className="text-red-600">Brandname is required.</p>
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
                  className="border border-gray-300 rounded-md p-2 outline-none"
                  {...register("productId", { required: true })}
                />
                {errors.productId && (
                  <p className="text-red-600">Product id is required.</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="productIssue" className="font-semibold">
                  Describe your issue with product
                </label>
                <textarea
                  rows={5}
                  id="productIssue"
                  name="productIssue"
                  className="border border-gray-300 rounded-md p-2 outline-none"
                  style={{ resize: "none" }}
                  {...register("productIssue", { required: true })}
                />
                {errors.productIssue && (
                  <p className="text-red-600">Product issue is required.</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="invoice" className="font-semibold">
                  Upload Invoice
                </label>
                <input
                  type="file"
                  id="invoice"
                  name="invoicePayload"
                  className="border border-gray-300 rounded-md p-2 outline-none"
                  {...register("invoicePayload", { required: true })}
                />
                {errors.invoicePayload && (
                  <p className="text-red-600">Invoice is required.</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="productImages" className="font-semibold">
                  Uploaded Product Images
                </label>
                <input
                  type="file"
                  id="productImages"
                  name="imagesPayload"
                  multiple
                  className="border border-gray-300 rounded-md p-2 outline-none"
                  {...register("imagesPayload", { required: true })}
                />
                {errors.imagesPayload && (
                  <p className="text-red-600">Product images is required.</p>
                )}
              </div>
              <Button type={"submit"} loading={loading}>
                Claim Warranty
              </Button>
            </form>
          ) : (
            <>
              <p className="text-red-600 italic font-semibold">
                Inorder to claim your product warranty first you have to verify
                your product warranty status
              </p>
              <form
                onSubmit={checkWarrantyFormSubmit}
                className="p-5  w-full md:w-[50%] shadow-lg rounded-lg border text-gray-800 flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="productid" className="font-semibold">
                    Enter Product Id
                  </label>
                  <input
                    type="text"
                    id="productid"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    name="productid"
                    className="border border-gray-300 rounded-md p-2 outline-none"
                  />
                </div>
                <Button type={"submit"} loading={!productId}>
                  Verify Warranty
                </Button>
              </form>
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default ClaimWarranty;
