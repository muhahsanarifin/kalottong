import Head from "next/head";
import { TitleProps } from "../utils/types/titleType";

const TitleHome: React.FC<TitleProps> = ({ children }) => {
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

const TitleProfile: React.FC<TitleProps> = ({ children }) => {
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

const TitleRegister: React.FC<TitleProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>kalottong | Register</title>
        <meta name="description" content="Task management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </>
  );
};

const TitleForgetPassword: React.FC<TitleProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>kalottong | Forget Password</title>
        <meta name="description" content="Task management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </>
  );
};

export { TitleHome, TitleProfile, TitleRegister, TitleForgetPassword };
