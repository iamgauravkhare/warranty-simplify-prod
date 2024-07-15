// Consumer Claim View Page

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import ClaimImage from "../components/ClaimImage";
import Button from "../components/Button";
import { APIHandler } from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/reducers/slices/authSlice";

const ConsumerClaimView = () => {
  const currentPath = useLocation();
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);
  const [claimData, setClaimData] = useState(null);
  const [claimId, setclaimId] = useState(
    currentPath.pathname.split("/").reverse()[0]
  );
  const fetchClaimData = (claimId) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await APIHandler(
        "POST",
        "/consumer-services/get-claim-data",
        { claimId },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setClaimData(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    dispatch(fetchClaimData(claimId));
  }, [claimId]);

  useEffect(() => {
    setclaimId(currentPath.pathname.split("/").reverse()[0]);
  }, [currentPath]);

  return (
    <div className="w-full bg-white pt-[88px]">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <section className="max-w-[1440px] mx-auto p-5 pt-10 text-gray-800 flex flex-col gap-5  ">
          <h2 className=" text-2xl lg:text-3xl font-bold text-violet-600">
            Warranty Claim Details
          </h2>
          <div className="">
            <span>
              <span className="font-semibold">Claim Id : </span>
              {claimId}
            </span>
          </div>
          <div className="flex flex-col gap-5 ">
            <span className="font-semibold">Live Tracking</span>
            <div className="p-10 flex flex-col md:flex-row items-center gap-20 md:gap-0 justify-between relative mb-5">
              <div className="border-2 border-dashed border-violet-600 h-[450px] md:h-[0px] w-[0px] md:w-[88%] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"></div>
              <div
                className={`h-[60px] w-[60px] border-4 border-violet-600 rounded-full relative z-10 text-white text-3xl flex items-center justify-center ${
                  !claimData?.progress?.claimInitiated?.status
                    ? "trackerThumb bg-white"
                    : "bg-green-500"
                }`}
              >
                {claimData?.progress?.claimInitiated?.status && <FaCheck />}
                <span className="absolute top-[120%] left-[50%] translate-x-[-50%] text-center whitespace-nowrap text-violet-600 text-[10px] sm:text-sm font-semibold bg-white">
                  Claim Initiated
                </span>
              </div>
              <div
                className={`h-[60px] w-[60px] border-4 border-violet-600 rounded-full relative z-10  text-white text-3xl flex items-center justify-center ${
                  claimData?.progress?.claimInProcessRetailer?.status
                    ? "bg-green-500"
                    : claimData?.progressStep == "1"
                    ? "trackerThumb bg-white"
                    : ""
                }`}
              >
                {claimData?.progress?.claimInProcessRetailer?.status && (
                  <FaCheck />
                )}
                <span className="absolute top-[120%] left-[50%] translate-x-[-50%] text-center whitespace-nowrap text-violet-600 text-[10px] sm:text-sm font-semibold bg-white">
                  Claim Under Process By Retailer
                </span>
              </div>
              <div
                className={`h-[60px] w-[60px] border-4 border-violet-600 rounded-full relative z-10  text-white text-3xl flex items-center justify-center ${
                  claimData?.progress?.claimInProcessManufacturer?.status
                    ? "bg-green-500"
                    : claimData?.progressStep == "2"
                    ? "trackerThumb bg-white"
                    : "bg-white"
                }`}
              >
                {claimData?.progress?.claimInProcessManufacturer?.status && (
                  <FaCheck />
                )}
                <span className="absolute top-[120%] left-[50%] translate-x-[-50%] text-violet-600 text-[10px] sm:text-sm font-semibold text-center whitespace-nowrap bg-white">
                  Claim Under Process By Manufacturer
                </span>
              </div>
              <div
                className={`h-[60px] w-[60px] border-4 border-violet-600 rounded-full relative z-10 text-3xl flex items-center justify-center ${
                  claimData?.progress?.claimApproved?.status
                    ? "bg-green-500 text-white"
                    : claimData?.progressStep == "3"
                    ? "trackerThumb bg-white"
                    : "bg-white"
                }`}
              >
                {claimData?.progress?.claimApproved?.status && <FaCheck />}
                <span className="absolute top-[120%] left-[50%] translate-x-[-50%]  text-violet-600 text-[10px] sm:text-sm font-semibold text-center whitespace-nowrap bg-white">
                  Claim Approved
                </span>
              </div>
            </div>
            <details className="">
              <summary className="relative flex items-center gap-2">
                <span className="font-semibold">Tracking Details</span>
                <span className="text-2xl">
                  <MdKeyboardArrowDown />
                </span>
              </summary>
              <ul className="p-5 flex flex-col gap-2">
                <li>
                  Claim initiated on{" "}
                  {claimData &&
                    new Date(
                      claimData?.progress?.claimInProcessRetailer?.time
                    ).toDateString()}
                </li>
                <li>
                  Claim forwaded by retailer to manufacturer on{" "}
                  {claimData &&
                    new Date(
                      claimData?.progress?.claimInProcessManufacturer?.time
                    ).toDateString()}
                </li>
                <li>
                  Claim approved on{" "}
                  {claimData &&
                    new Date(
                      claimData?.progress?.claimApproved?.time
                    ).toDateString()}
                </li>
              </ul>
            </details>
          </div>
          <div className="flex flex-col gap-4 ">
            <span className="font-semibold text-xl">Product Infomation</span>
            <span>
              <span className="font-semibold">Product Id : </span>
              {claimData?.productId}
            </span>
            <span>
              <span className="font-semibold">Brand : </span>
              {claimData?.brandname}
            </span>
            <span>
              <span className="font-semibold">
                Product Warranty Registered On :{" "}
              </span>
              {claimData?.warrantyData &&
                new Date(claimData?.warrantyData?.createdAt).toDateString()}
            </span>
            <span>
              <span className="font-semibold">Expiry Date : </span>

              {claimData?.warrantyData &&
                new Date(claimData?.warrantyData?.expiryDate).toDateString()}
            </span>
            <span>
              <span className="font-semibold">Waranty Status : </span>

              {claimData?.warrantyData?.expiryDate >
              claimData?.warrantyData?.createdAt
                ? "Active"
                : "Expired"}
            </span>
            <span>
              <span className="font-semibold">Issue Description : </span>
              {claimData?.issue}
            </span>
            <Link to={claimData?.invoice?.src} target="_blank">
              <span className="font-semibold text-violet-600 underline">
                Open Invoice
              </span>
            </Link>
            <span className="font-semibold">Product Images :</span>
            <ClaimImage images={claimData && claimData?.productImages} />
          </div>
        </section>
      )}
    </div>
  );
};

export default ConsumerClaimView;
