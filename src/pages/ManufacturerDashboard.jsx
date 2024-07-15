// Manufacturer Dashboard View Page

import React, { useEffect } from "react";
import Button from "../components/Button";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getManuClaimWarrantyAPIHandler } from "../services/manufacturer/manufacturerAPIHandler";
import { MdAccountCircle } from "react-icons/md";

const ManufacturerDashboard = () => {
  const { token, loading, displayPicture } = useSelector((state) => state.auth);
  const { claimedWarrantyData, manufacturerData } = useSelector(
    (state) => state.manufacturer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getManuClaimWarrantyAPIHandler(token));
  }, []);
  return (
    <div className="w-full bg-white min-h-screen pt-[88px]">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <section className="max-w-[1440px] mx-auto p-5 pt-10 text-violet-600 flex flex-col gap-10">
          <h2 className="text-2xl lg:text-3xl font-bold">
            Manufacturer Dashboard
          </h2>
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
                Hi, 👋{" "}
                {manufacturerData?.firstname + " " + manufacturerData.lastname}
              </span>
              <span className="text-violet-800 font-semibold uppercase text-sm not-italic">
                {manufacturerData?.accountType} Account
              </span>
              <span>@{manufacturerData?.username}</span>
            </div>
          </div>
          <div className="flex flex-col gap-5 pb-10">
            <h2 className="text-gray-800 font-semibold text-xl">
              Showing Claimed Warranties
            </h2>
            {!claimedWarrantyData && (
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
                      <Link to={`/manufacturer/view-claim/${data._id}`}>
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

export default ManufacturerDashboard;
