// Manufacturer Dashboard View Page

import React, { useEffect } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getRetailerAssociationsAPIHandler,
  getRetailerClaimWarrantyAPIHandler,
  setRetailerAssociations,
} from "../services/retailer/retailerAPIHandler";
import { MdAccountCircle } from "react-icons/md";

const RetailerDashboard = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const { token, loading, displayPicture } = useSelector((state) => state.auth);
  const { claimedWarrantyData, retailerData, associatedBrands } = useSelector(
    (state) => state.retailer
  );
  const dispatch = useDispatch();
  const submitHandler = (data) => {
    const reqPayload = [];
    for (const iterator in data) {
      if (data[iterator] === true) reqPayload.push(iterator);
    }
    dispatch(setRetailerAssociations(reqPayload, token));
  };

  useEffect(() => {
    if (associatedBrands?.length) {
      dispatch(getRetailerClaimWarrantyAPIHandler(token));
    }
  }, [associatedBrands]);

  useEffect(() => {
    dispatch(getRetailerAssociationsAPIHandler(token));
  }, []);

  useEffect(() => {
    reset({
      nike: false,
      puma: false,
      sketchers: false,
      xioami: false,
      samsung: false,
      vivo: false,
    });
  }, [reset, isSubmitSuccessful]);

  return (
    <div className="w-full bg-white min-h-screen pt-[88px]">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <section className="max-w-[1440px] mx-auto p-5 pt-10 text-violet-600 flex flex-col gap-10">
          <h2 className="text-2xl lg:text-3xl font-bold">Retailer Dashboard</h2>
          <div className="p-5 md:ps-0 text-gray-800 flex flex-col md:flex-row gap-10 items-center">
            <div className="h-[150px] w-[150px] bg-violet-600 rounded-full">
              {displayPicture ? (
                <img
                  src={displayPicture}
                  alt="display-picture"
                  className="h-full w-full object-cover object-center rounded-full p-[2px]"
                />
              ) : (
                <MdAccountCircle className="h-full w-full object-cover object-center text-white scale-110 rounded-full" />
              )}
            </div>
            <div className="flex flex-col italic gap-2">
              <span className="font-semibold text-xl capitalize">
                Hi, 👋 {retailerData?.firstname + " " + retailerData.lastname}
              </span>
              <span className="text-violet-800 font-semibold uppercase text-sm not-italic">
                {retailerData?.accountType} Account
              </span>
              <span>@{retailerData?.username}</span>
            </div>
          </div>
          <h2 className="font-semibold text-gray-800">Associted Brands</h2>

          {associatedBrands ? (
            <div className="flex gap-10 flex-wrap">
              {associatedBrands.map((data, i) => (
                <span
                  className="font-semibold text-gray-800 italic capitalize"
                  key={i}
                >
                  {data}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <h2 className="text-xl text-gray-800 font-semibold capitalize">
                Please select the brands with which you are associated as a
                retailer
              </h2>
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="p-5 w-full md:w-[50%] shadow-lg rounded-lg border flex flex-col gap-10 text-gray-800 "
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-10">
                  <div className="flex items-center justify-between ">
                    <label htmlFor="nike" className="font-semibold italic">
                      Nike
                    </label>
                    <input
                      type="checkbox"
                      id="nike"
                      name="nike"
                      className="border border-gray-300 rounded-md p-2 outline-none"
                      {...register("nike")}
                    />
                  </div>
                  <div className="flex items-center justify-between ">
                    <label htmlFor="puma" className="font-semibold italic">
                      Puma
                    </label>
                    <input
                      type="checkbox"
                      id="puma"
                      name="puma"
                      className="border border-gray-300 rounded-md p-2 outline-none"
                      {...register("puma")}
                    />
                  </div>
                  <div className="flex items-center justify-between ">
                    <label htmlFor="sketchers" className="font-semibold italic">
                      Sketchers
                    </label>
                    <input
                      type="checkbox"
                      id="sketchers"
                      name="sketchers"
                      className="border border-gray-300 rounded-md p-2 outline-none"
                      {...register("sketchers")}
                    />
                  </div>
                  <div className="flex items-center justify-between ">
                    <label htmlFor="xioami" className="font-semibold italic">
                      Xioami
                    </label>
                    <input
                      type="checkbox"
                      id="xioami"
                      name="xioami"
                      className="border border-gray-300 rounded-md p-2 outline-none"
                      {...register("xioami")}
                    />
                  </div>
                  <div className="flex items-center justify-between ">
                    <label htmlFor="samsung" className="font-semibold italic">
                      Samsung
                    </label>
                    <input
                      type="checkbox"
                      id="samsung"
                      name="samsung"
                      className="border border-gray-300 rounded-md p-2 outline-none"
                      {...register("samsung")}
                    />
                  </div>
                  <div className="flex items-center justify-between ">
                    <label htmlFor="vivo" className="font-semibold italic">
                      Vivo
                    </label>
                    <input
                      type="checkbox"
                      id="vivo"
                      name="vivo"
                      className="border border-gray-300 rounded-md p-2 outline-none"
                      {...register("vivo")}
                    />
                  </div>
                </div>

                <Button type={"submit"}>Submit</Button>
              </form>
            </div>
          )}
          <div className="flex flex-col gap-5 pb-10 ">
            <h2 className="text-gray-800 font-semibold text-xl">
              Showing Claimed Warranties
            </h2>
            {!claimedWarrantyData?.length && (
              <div className="text-center text-gray-800">
                No data is available
              </div>
            )}
            {claimedWarrantyData &&
              claimedWarrantyData.map((data, i) => {
                return (
                  <div
                    className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-10 text-gray-800 text-[14px] border rounded-md  hover:shadow-lg transition-all duration-200"
                    key={i}
                  >
                    <span>
                      <span className="font-semibold">Product Id :</span>
                      <br />
                      {data?.productId}
                    </span>
                    <span>
                      <span className="font-semibold">Claimed On :</span>
                      <br />
                      {data?.createdAt &&
                        new Date(data.createdAt).toDateString()}
                    </span>
                    <span>
                      <span className="font-semibold">Status :</span>
                      <br />
                      {(data?.progressStep == "1" &&
                        "Claim Under Process By Retailer") ||
                        (data?.progressStep == "2" &&
                          "Claim Under Process By Manufacturer") ||
                        (data?.progressStep == "3" && "Claim Approved")}
                    </span>
                    <div className="text-left lg:text-center">
                      <Link to={`/retailer/view-claim/${data._id}`}>
                        <Button>View Claim</Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      )}
    </div>
  );
};

export default RetailerDashboard;
