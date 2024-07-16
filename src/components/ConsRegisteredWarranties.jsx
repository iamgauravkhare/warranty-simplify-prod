import { useSelector } from "react-redux";

const ConsRegisteredWarranties = () => {
  const { registeredWarramtyData } = useSelector((state) => state.consumer);
  return (
    <div className="flex flex-col gap-5 pb-10">
      <h2 className="text-gray-800 font-semibold text-xl">
        Showing Registered Warranties
      </h2>
      {!registeredWarramtyData?.length && (
        <div className="text-center text-gray-800">No data is available</div>
      )}
      {registeredWarramtyData &&
        registeredWarramtyData.map((data, i) => {
          return (
            <div
              className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-10 text-gray-800 text-[14px] border rounded-md hover:shadow-lg transition-all duration-200"
              key={i}
            >
              <span>
                <span className="font-semibold">Product Id :</span>
                <br />
                {data.registeredWarrantyId.productId}
              </span>
              <span>
                <span className="font-semibold">Brand :</span>
                <br />
                {data.registeredWarrantyId.brandname}
              </span>
              <span>
                <span className="font-semibold">Warranty Expiry :</span>
                <br />
                {data.registeredWarrantyId.expiryDate &&
                  new Date(data.registeredWarrantyId.expiryDate).toDateString()}
              </span>
              <span>
                <span className="font-semibold">Status :</span>
                <br />
                {data.registeredWarrantyId.expiryDate >
                data.registeredWarrantyId.createdAt
                  ? "Active"
                  : "Expired"}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default ConsRegisteredWarranties;
