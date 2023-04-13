import React, { useState } from "react";
import { TitleHome } from "@/components/Layout";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";

const Home = () => {
  return (
    <>
      <TitleHome>
        <Header />
        <Main/>
        <Footer />
      </TitleHome>
    </>
  );
};

export default Home;

// Home.getLayout = function getLayout(page: React.ReactElement) {
//   return (<TitleHome>{page}</TitleHome>);
// };
