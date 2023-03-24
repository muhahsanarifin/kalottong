import Head from "next/head";
import { TitleProps } from "../utils/types/title";

const TitleHome = ({ children }: TitleProps) => {
  return (
    <>
      <Head>
        <title>kalottong | Home</title>
        <meta name="description" content="Task management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </>
  );
};

const TitleProfile = ({ children }: TitleProps) => {
  return (
    <>
      <Head>
        <title>kalottong | Profile</title>
        <meta name="description" content="Task management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </>
  );
};

export { TitleHome, TitleProfile };
