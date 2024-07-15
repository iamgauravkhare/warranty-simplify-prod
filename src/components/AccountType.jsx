import { FaCheck } from "react-icons/fa";

const AccountType = ({ accountType, setAccountType }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <span className="text-gray-800 font-semibold">Choose Account Type</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <button
          className={`${
            accountType === "consumer"
              ? "bg-violet-600 text-white  border-violet-600"
              : "hover:bg-violet-800 hover:text-white hover:border-gray-300"
          } font-semibold transition-all duration-200 px-9 py-3 rounded-lg border border-gray-300 flex items-center justify-center gap-2`}
          onClick={() => setAccountType("consumer")}
        >
          Consumer
          {accountType && accountType === "consumer" && (
            <div className="h-[25px] w-[25px] flex items-center justify-center bg-white rounded-full text-violet-600">
              <FaCheck />
            </div>
          )}
        </button>
        <button
          className={`${
            accountType === "retailer"
              ? "bg-violet-600 text-white border-violet-600"
              : "hover:bg-violet-800 hover:text-white hover:border-gray-300"
          } font-semibold transition-all duration-200 px-9 py-3 rounded-lg border border-gray-300 flex items-center justify-center gap-2 `}
          onClick={() => setAccountType("retailer")}
        >
          Retailer
          {accountType && accountType === "retailer" && (
            <div className="h-[25px] w-[25px] flex items-center justify-center bg-white rounded-full text-violet-600">
              <FaCheck />
            </div>
          )}
        </button>
        <button
          className={`${
            accountType === "manufacturer"
              ? "bg-violet-600 text-white border-violet-600"
              : "hover:bg-violet-800 hover:text-white hover:border-gray-300"
          } font-semibold transition-all duration-200 px-9 py-3 rounded-lg border border-gray-300 flex items-center justify-center gap-2`}
          onClick={() => setAccountType("manufacturer")}
        >
          Manufacturer
          {accountType && accountType === "manufacturer" && (
            <div className="h-[25px] w-[25px] flex items-center justify-center bg-white rounded-full text-violet-600">
              <FaCheck />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default AccountType;
