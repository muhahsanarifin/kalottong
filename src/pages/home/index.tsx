import type { NextPageWithLayout } from "../_app"
import { TitleHome } from "@/components/Layout";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (<TitleHome>{page}</TitleHome>);
};
