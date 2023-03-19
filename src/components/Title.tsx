import Head from "next/head";
import { TitleProps } from "../utils/types/title";

const Title = ({ title }: TitleProps) => {
  return (
    <>
      <Head>
        <title>kalottong | {title}</title>
        <meta name="description" content="kalottong" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico"/>
      </Head>
    </>
  );
};

export default Title;
