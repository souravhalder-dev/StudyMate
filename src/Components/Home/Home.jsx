import React from "react";
import HeroSection from "../HeroSection/HeroSection";
import TopStudyPartners from "../Pages/TopStudyPartners";
import HowItWorks from "../Pages/HowItWorks";
import Testimonials from "../Pages/Testimonials";
import FAQList from "../Pages/FAQList";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TopStudyPartners/>
      <HowItWorks/>
      <Testimonials/>
      <FAQList/>
    </div>
  );
};

export default Home;
