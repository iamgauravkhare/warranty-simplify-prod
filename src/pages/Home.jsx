// Home Page

import Button from "../components/Button";
import ServicesCard from "../components/ServicesCard";
import { Link } from "react-router-dom";

const Home = () => {
  const servicesData = [
    {
      heading: "For Consumers",
      subHeading: [
        "Easy Claim Submission",
        "Real-Time Tracking",
        "Document Management",
      ],
    },
    {
      heading: "For Retailers",
      subHeading: [
        "Efficient Customer Management",
        "Brand Association",
        "Streamlined Communication",
      ],
    },
    {
      heading: "For Manufacturers",
      subHeading: [
        "Claim Approvals",
        "Brand Overview",
        "Improved Customer Satisfaction",
      ],
    },
  ];

  return (
    <div className="w-full bg-white pt-[88px]">
      <section className="max-w-[1440px] mx-auto px-5 py-40 text-violet-600 flex items-start justify-center flex-col gap-5">
        <h2 className="text-5xl font-bold lg:w-[50%]">
          Claim, Track, and Manage Warranties with Ease.
        </h2>
        <p className="lg:w-[50%] text-xl italic mb-5 text-gray-600">
          Easily manage and track your warranty claims in real-time from one
          secure platform. Enjoy a hassle-free warranty experience with instant
          updates and seamless document uploads.
        </p>
        <Link to={"/sign-up"}>
          <Button>Get Started</Button>
        </Link>
      </section>
      <section className="max-w-[1440px] mx-auto px-5 py-40 text-violet-600 flex items-center justify-center flex-col gap-20">
        <h2 className="text-5xl font-bold">Why Choose Our Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 items-start">
          {servicesData.map((data, i) => (
            <ServicesCard key={i} data={data} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
