import React from "react";
import HeadLanding from "../Components/LandingPage/HeadLanding";
import Hero from "../Components/LandingPage/Hero";
import Features from "../Components/LandingPage/Features";
import Working from "../Components/LandingPage/Working";
import Feedback from "../Components/LandingPage/Feedback";
import Footer from "../Components/LandingPage/Footer";
import Pricing from "../Components/LandingPage/Pricing";



const LandingPage: React.FC = () => {
  return (
    <div className="relative z-10">
      <HeadLanding />
      <div id="hero" className="mt-20">
        <Hero />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="working">
        <Working />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <div id="feedback">
        <Feedback />
      </div>
      <Footer />
    </div>

  )
};

export default LandingPage;
