import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "./Button";

const ConsClaimedWarranties = () => {
  const { claimedWarrantyData } = useSelector((state) => state.consumer);
  return (
    <div className="flex flex-col gap-5 pb-10 ">
      <h2 className="text-gray-800 font-semibold text-xl">
        Showing Claimed Warranties
      </h2>
      {!claimedWarrantyData?.length && (
        <div className="text-center text-gray-800">No data is available</div>
      )}
      {claimedWarrantyData &&
        claimedWarrantyData?.map((data, i) => {
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
                {data?.createdAt && new Date(data.createdAt).toDateString()}
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
                <Link to={`/consumer/view-claim/${data._id}`}>
                  <Button>View Claim</Button>
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ConsClaimedWarranties;
