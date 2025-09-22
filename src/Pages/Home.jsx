import React, { useEffect, useState } from "react";
import HomeBanner from "../components/HomeBanner";
import HeroSection from "../components/HeroSection";
import CategoriesList from "../components/categoriesList";
import FeaturedProducts from "../components/FeaturedProducts";
import FeaturesSection from "../components/FeaturesSection";
import BlogSection from "../components/BlogSection";
import ReviewSection from "../components/ReviewSection";

const Home = () => {
  return (
    <>
      <HomeBanner />
      <HeroSection />
      <CategoriesList />
      <FeaturedProducts />
      <ReviewSection />
      <BlogSection />
      <FeaturesSection />
    </>
  );
};

export default Home;
