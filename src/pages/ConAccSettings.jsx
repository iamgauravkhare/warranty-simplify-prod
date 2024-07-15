// Consumer Account Settings Page

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfileData,
  uploadDisplayPicture,
} from "../services/profile/profileAPIHandler";
import Button from "../components/Button";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

const ConAccSettings = () => {
  const [showImageUploadForm, setShowImageUploadForm] = useState(false);
  const [showProfileUpdateForm, setShowProfileUpdateForm] = useState(false);
  const { token, loading, displayPicture } = useSelector((state) => state.auth);
  const { consumerData } = useSelector((state) => state.consumer);
  const [profileData, setProfileData] = useState({
    email: consumerData?.email,
    mobileNumber: consumerData?.mobileNumber,
  });
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const profileUpdateHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfileData(profileData, token));
    setShowProfileUpdateForm(false);
    setShowImageUploadForm(false);
  };

  const displayPictureUploadHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.set("displayPicture", e.target.displayPicture.files[0]);
    dispatch(uploadDisplayPicture(data, token));
    e.target.displayPicture.value = "";
    setShowImageUploadForm(false);
    setShowProfileUpdateForm(false);
  };

  return (
    <div className="w-full bg-white pt-[88px] min-h-screen">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <section className="max-w-[1440px] mx-auto p-5 pt-10 text-violet-600 flex flex-col gap-5">
          <h2 className="text-2xl lg:text-3xl font-bold">Account settings</h2>
          <h2 className="text-gray-800 font-semibold">Account Information</h2>
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
              <span className="font-semibold text-xl">
                Hi, 👋
                {consumerData?.firstname + " " + consumerData.lastname}
              </span>
              <span className="text-violet-800 font-semibold uppercase text-sm not-italic">
                {consumerData?.accountType} Account
              </span>
              <span>@{consumerData?.username}</span>
              <span>Email : {consumerData?.email}</span>
              <span>Mobile Number : {consumerData?.mobileNumber}</span>
              <div className="flex gap-5 flex-col sm:flex-row cursor-pointer">
                <span
                  onClick={() => setShowImageUploadForm((prev) => !prev)}
                  className="text-violet-600 underline font-semibold"
                >
                  Update Display Picture
                </span>
                <span
                  onClick={() => setShowProfileUpdateForm((prev) => !prev)}
                  className="text-violet-600 underline font-semibold"
                >
                  Update Profile Details
                </span>
              </div>
            </div>
          </div>
          {showImageUploadForm && (
            <form
              className="p-5  w-full md:w-[50%] rounded-lg border text-gray-800 flex flex-col gap-5 relative pt-12"
              encType="multipart/form-data"
              onSubmit={displayPictureUploadHandler}
            >
              <span
                className="absolute text-3xl top-[10px] right-[10px] cursor-pointer hover:text-violet-800 transition-all duration-200"
                onClick={() => setShowImageUploadForm(false)}
              >
                <IoMdCloseCircleOutline />
              </span>
              <div className="flex flex-col gap-2">
                <label htmlFor="displayPicture" className="font-semibold">
                  Upload Display Picture
                </label>
                <input
                  type="file"
                  id="displayPicture"
                  name="displayPicture"
                  required
                  className="border border-gray-300 rounded-md p-2 outline-none"
                />
              </div>
              <Button type={"submit"}>Upload Display Picture</Button>
            </form>
          )}

          {showProfileUpdateForm && (
            <form
              onSubmit={profileUpdateHandler}
              className="p-5 w-full md:w-[50%] rounded-lg border text-gray-800 flex flex-col gap-5 relative pt-12"
              encType="multipart/form-data"
            >
              <span
                className="absolute text-3xl top-[10px] right-[10px] cursor-pointer hover:text-violet-800 transition-all duration-200"
                onClick={() => setShowProfileUpdateForm(false)}
              >
                <IoMdCloseCircleOutline />
              </span>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={profileData.email}
                  onChange={onChangeHandler}
                  name="email"
                  className="border border-gray-300 rounded-md p-2 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="mobileNumber" className="font-semibold">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={profileData.mobileNumber}
                  onChange={onChangeHandler}
                  className="border border-gray-300 rounded-md p-2 outline-none"
                />
              </div>
              <Button type={"submit"} loading={loading}>
                Update Profile
              </Button>
            </form>
          )}
        </section>
      )}
    </div>
  );
};

export default ConAccSettings;
