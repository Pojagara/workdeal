import Head from "next/head";
import React, { useEffect, useState } from "react";
import Banner1 from "../components/banner/Banner1";
import Home1Blog from "../components/blog/Home1Blog";
import Preloader from "../components/common/Preloader ";
import Footer from "../components/footer/Footer";
import HowItwork1 from "../components/howItWork/HowItwork1";
import CreativeService from "../components/service/CreativeService";
import HomeService from "../components/service/HomeService";
import OfferService from "../components/service/OfferService";
import PopularService from "../components/service/PopularService";
import FeaturesShop from "../components/shop/FeaturesShop";
import Testimonial1 from "../components/testimonial/Testimonial1";
import WhyChooseUs from "../components/whyChooseUs/WhyChooseUs";
import Header1 from "./../components/header/Header1";

export default function Home() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  }, []);
  return (
    <>
      {!loading ? (
        <Preloader />
      ) : (
        <>
          <Head>
            <title>SERVE - On Demand Services Next JS Template</title>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            ></meta>
            <meta name="description" content="Generated by create next app" />
            <link
              rel="icon"
              href="assets/images/faviconS.png"
              type="image/gif"
              sizes="20x20"
            />
          </Head>
          <Header1 />
          <Banner1 />
          <CreativeService />
          <PopularService />
          <HomeService />
          <FeaturesShop />
          <OfferService />
          <WhyChooseUs />
          <Testimonial1 />
          <HowItwork1 />
          <Home1Blog />
          <Footer />
        </>
      )}
    </>
  );
}
