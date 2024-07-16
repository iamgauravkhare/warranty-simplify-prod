import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { IoMenu } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPIHandler } from "../services/auth/authAPIHandler";
import { MdAccountCircle } from "react-icons/md";
import { markNotificationAsReadAPIHandler } from "../services/notification/notificationAPIHandler";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccMenu, setShowAccMenu] = useState(false);
  const { token, accountType, displayPicture } = useSelector(
    (state) => state.auth
  );

  const { notifications: consNotifications } = useSelector(
    (state) => state.consumer
  );
  const { notifications: retaNotifications } = useSelector(
    (state) => state.retailer
  );
  const { notifications: manuNotifications } = useSelector(
    (state) => state.manufacturer
  );

  const accMenuData = [
    { path: `/${accountType}-dashboard`, name: "Dashboard" },
    { path: `/${accountType}/account-settings`, name: "Account Settings" },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    setShowMenu(false);
    setShowAccMenu(false);
    setShowNotifications(false);
    dispatch(logoutAPIHandler(navigate));
  };

  const disableAllMenus = () => {
    setShowMenu(false);
    setShowAccMenu(false);
    setShowNotifications(false);
  };

  const notificationAPIHandler = (claimId) => {
    const data = {
      id: claimId,
    };
    dispatch(markNotificationAsReadAPIHandler(data, token));
  };

  return (
    <div className="w-full shadow-md fixed bg-white z-50">
      <nav className="max-w-[1440px] mx-auto p-5 text-violet-600 flex items-center justify-between relative">
        <Link to={"/"}>
          <h1 className="text-xl sm:text-2xl font-extrabold nav-heading">
            <span className="text-4xl">W</span>arranty Simplify
          </h1>
        </Link>
        <div className="flex items-center justify-center gap-5">
          {token && accountType ? (
            <>
              {accountType === "consumer" ? (
                <>
                  <span className="gap-5 hidden lg:flex">
                    <Link to={"/register-warranty"} onClick={disableAllMenus}>
                      <Button>Register Warranty</Button>
                    </Link>
                    <Link to={"/claim-warranty"} onClick={disableAllMenus}>
                      <Button>Claim Warranty</Button>
                    </Link>
                  </span>
                  <span className="hidden md:flex">
                    <Link to={"/consumer-dashboard"} onClick={disableAllMenus}>
                      <Button>Dashboard</Button>
                    </Link>
                  </span>
                </>
              ) : accountType === "retailer" ? (
                <span className="hidden md:flex">
                  <Link to={"/retailer-dashboard"} onClick={disableAllMenus}>
                    <Button>Dashboard</Button>
                  </Link>
                </span>
              ) : (
                <span className="hidden md:flex">
                  <Link
                    to={"/manufacturer-dashboard"}
                    onClick={disableAllMenus}
                  >
                    <Button>Dashboard</Button>
                  </Link>
                </span>
              )}

              <button
                className="w-[45px] h-[45px] rounded-full bg-violet-500 flex items-center justify-center group hover:bg-violet-800 text-4xl transition-all duration-200"
                onClick={() => {
                  setShowNotifications(false);
                  setShowAccMenu((prev) => !prev);
                }}
              >
                {displayPicture ? (
                  <img
                    src={displayPicture}
                    alt="display-picture"
                    className="h-full w-full object-cover object-center rounded-full p-[2px]"
                  />
                ) : (
                  <span className="bg-white rounded-full relative  text-gray-300 transition-all duration-200">
                    <MdAccountCircle />
                  </span>
                )}
              </button>
              <button
                className="w-[45px] h-[45px] rounded-full bg-violet-500 flex items-center justify-center group hover:bg-violet-800 text-4xl transition-all duration-200 relative"
                onClick={() => {
                  setShowAccMenu(false);
                  setShowNotifications((prev) => !prev);
                }}
              >
                <span className="bg-white rounded-full relative outline-none group-hover:text-violet-800 transition-all duration-200">
                  <IoIosNotifications />
                  <span className="bg-red-500 h-[25px] w-[25px] rounded-full absolute top-[-30%] right-[-30%] text-white text-[12px] flex justify-center items-center font-semibold">
                    {accountType === "consumer"
                      ? consNotifications?.length
                      : accountType === "retailer"
                      ? retaNotifications?.length
                      : accountType === "manufacturer"
                      ? manuNotifications?.length
                      : 0}
                  </span>
                </span>
              </button>
            </>
          ) : (
            <>
              <span className="hidden gap-5 md:flex">
                <Link to={"/sign-in"}>
                  <Button>Sign In</Button>
                </Link>
                <Link to={"/sign-up"}>
                  <Button>Sign Up</Button>
                </Link>
              </span>
            </>
          )}
        </div>
        {showAccMenu && (
          <div className="p-2 top-[90%] pt-12 right-[19px] absolute w-[250px] gap-3 bg-white text-violet-600 font-semibold rounded-lg border shadow-lg border-gray-300 flex items-start justify-between flex-col">
            <span
              className="absolute text-3xl top-[10px] right-[10px] cursor-pointer hover:text-violet-800 transition-all duration-200"
              onClick={() => setShowAccMenu(false)}
            >
              <IoMdCloseCircleOutline />
            </span>
            {accountType === "consumer" && (
              <>
                <Link
                  to={"/register-warranty"}
                  className="w-full flex lg:hidden hover:bg-violet-50 transition-all duration-200 rounded-md p-3"
                  onClick={() => setShowAccMenu(false)}
                >
                  <button>Register Warranty</button>
                </Link>
                <Link
                  to={"/claim-warranty"}
                  className="w-full flex lg:hidden hover:bg-violet-50 transition-all duration-200 rounded-md p-3"
                  onClick={() => setShowAccMenu(false)}
                >
                  <button>Claim Warranty</button>
                </Link>
              </>
            )}
            {accMenuData.map((e, i) => {
              return (
                <Link
                  to={e.path}
                  className="w-full hover:bg-violet-50 transition-all duration-200 rounded-md p-3"
                  key={i}
                  onClick={() => setShowAccMenu(false)}
                >
                  <button>{e.name}</button>
                </Link>
              );
            })}

            <button
              onClick={logoutHandler}
              className="w-full hover:bg-violet-50 transition-all duration-200 rounded-md p-3 text-left"
            >
              Logout
            </button>
          </div>
        )}
        {showNotifications && (
          <div className="p-2 top-[90%] right-[19px] pt-12 absolute w-[300px] h-[400px] overflow-x-auto bg-white rounded-lg flex flex-col gap-2 border shadow-lg border-gray-300 noti-ctn">
            <span
              className="absolute text-3xl top-[10px] right-[10px] cursor-pointer hover:text-violet-800 transition-all duration-200"
              onClick={() => setShowNotifications(false)}
            >
              <IoMdCloseCircleOutline />
            </span>

            {accountType && accountType === "consumer" ? (
              consNotifications.length ? (
                consNotifications?.map((e) => (
                  <div
                    className="w-full bg-violet-50 text-gray-800 italic transition-all flex flex-col gap-1 duration-200 rounded-md p-3"
                    key={e._id}
                  >
                    <p className="text-sm">{e.message}</p>
                    <div className="flex justify-between">
                      <Link
                        to={`/${accountType}/view-claim/${
                          e.message.split(" - ")[1]
                        }`}
                        className="underline text-violet-800"
                        onClick={disableAllMenus}
                      >
                        Open Claim
                      </Link>
                      <button
                        className="underline text-violet-800"
                        onClick={() => notificationAPIHandler(e._id)}
                      >
                        Mark as read
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full bg-violet-50 text-gray-800 italic transition-all duration-200 rounded-md p-3 text-center">
                  <p>No notifications!</p>
                </div>
              )
            ) : (
              <></>
            )}
            {accountType && accountType === "retailer" ? (
              retaNotifications.length ? (
                retaNotifications?.map((e) => (
                  <div
                    className="w-full bg-violet-50 text-gray-800 italic transition-all flex flex-col gap-1 duration-200 rounded-md p-3"
                    key={e._id}
                  >
                    <p className="text-sm">{e.message}</p>
                    <div className="flex justify-between">
                      <Link
                        to={`/${accountType}/view-claim/${
                          e.message.split(" - ")[1]
                        }`}
                        className="underline text-violet-800"
                        onClick={disableAllMenus}
                      >
                        Open Claim
                      </Link>
                      <button
                        className="underline text-violet-800"
                        onClick={() => notificationAPIHandler(e._id)}
                      >
                        Mark as read
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full bg-violet-50 text-gray-800 italic transition-all duration-200 rounded-md p-3 text-center">
                  <p>No notifications!</p>
                </div>
              )
            ) : (
              <></>
            )}
            {accountType && accountType === "manufacturer" ? (
              manuNotifications.length ? (
                manuNotifications?.map((e) => (
                  <div
                    className="w-full bg-violet-50 text-gray-800 italic transition-all flex flex-col gap-1 duration-200 rounded-md p-3"
                    key={e._id}
                  >
                    <p className="text-sm">{e.message}</p>
                    <div className="flex justify-between">
                      <Link
                        to={`/${accountType}/view-claim/${
                          e.message.split(" - ")[1]
                        }`}
                        className="underline text-violet-800"
                        onClick={disableAllMenus}
                      >
                        Open Claim
                      </Link>
                      <button
                        className="underline text-violet-800"
                        onClick={() => notificationAPIHandler(e._id)}
                      >
                        Mark as read
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full bg-violet-50 text-gray-800 italic transition-all duration-200 rounded-md p-3 text-center">
                  <p>No notifications!</p>
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        )}
        {!token && (
          <div
            className="flex md:hidden text-4xl cursor-pointer"
            onClick={() => setShowMenu(true)}
          >
            <IoMenu />
          </div>
        )}
        {showMenu && (
          <div className="p-2 pt-12 top-[90%] right-[19px] absolute w-[250px] gap-3 bg-white text-violet-600 font-semibold rounded-lg border shadow-lg border-gray-300 flex items-start justify-between flex-col">
            <span
              className="absolute text-3xl top-[10px] right-[10px] cursor-pointer hover:text-violet-800 transition-all duration-200"
              onClick={() => setShowMenu(false)}
            >
              <IoMdCloseCircleOutline />
            </span>
            <Link
              to="/sign-in"
              className="w-full hover:bg-violet-50 transition-all duration-200 rounded-md p-3"
              onClick={() => setShowMenu(false)}
            >
              <button>Sign In</button>
            </Link>
            <Link
              to="/sign-up"
              className="w-full hover:bg-violet-50 transition-all duration-200 rounded-md p-3"
              onClick={() => setShowMenu(false)}
            >
              <button>Sign Up</button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
