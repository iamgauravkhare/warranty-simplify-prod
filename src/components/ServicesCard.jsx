const ServicesCard = ({ data }) => {
  return (
    <div className="services-card-bg p-1 hover:scale-105 transition-all duration-300  aspect-square shadow-lg">
      <div className="flex flex-col items-center justify-evenly gap-10 p-8 bg-white aspect-square">
        <h2 className="text-xl md:text-2xl font-bold">{data.heading}</h2>
        <div className="flex flex-col items-start justify-center gap-5 text-gray-600">
          {data.subHeading.map((e, i) => (
            <p
              key={i}
              className="text-[16px] font-semibold italic flex gap-5 items-center"
            >
              <img
                src="/star-icon.png"
                alt="star-icon"
                className="w-[20px] h-[20px] object-cover"
              />
              {e}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
