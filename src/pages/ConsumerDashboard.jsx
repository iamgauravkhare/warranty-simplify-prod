// Consumer Dashboard Page

import React, { useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Button from "../components/Button";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getClaimWarrantyAPIHandler,
  getRegisteredWarrantyAPIHandler,
} from "../services/consumer/consumerAPIHandler";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

const ConsumerDashboard = () => {
  const { token, loading, displayPicture, accountType } = useSelector(
    (state) => state.auth
  );
  const { consumerData } = useSelector((state) => state.consumer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClaimWarrantyAPIHandler(token));
    dispatch(getRegisteredWarrantyAPIHandler(token));
  }, []);
  return (
    <div className="w-full bg-white min-h-screen pt-[88px]">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <section className="max-w-[1440px] mx-auto p-5 pt-10 text-violet-600 flex flex-col gap-10">
          <h2 className="text-2xl lg:text-3xl font-bold">Consumer Dashboard</h2>
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
                Hi, 👋 {consumerData?.firstname + " " + consumerData.lastname}
              </span>
              <span className="text-violet-800 font-semibold uppercase text-sm not-italic">
                {consumerData?.accountType} Account
              </span>
              <span>@{consumerData?.username}</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5 px-5 items-center justify-center">
            <Link to={"/consumer-dashboard/consumer-claimed-warranties"}>
              <button className="bg-violet-600 text-white px-9 py-3 rounded-lg text-[15px] font-semibold hover:bg-violet-800 transition-all duration-200">
                Show Claims
              </button>
            </Link>
            <Link to={"/consumer-dashboard/consumer-registered-warranties"}>
              <button className="bg-violet-600 text-white px-9 py-3 rounded-lg text-[15px] font-semibold hover:bg-violet-800 transition-all duration-200">
                Show Warranties
              </button>
            </Link>
          </div>
          <Outlet />
        </section>
      )}
    </div>
  );
};

export default ConsumerDashboard;
