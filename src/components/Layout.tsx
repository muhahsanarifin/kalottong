import Head from "next/head";
import { TitleProps } from "../utils/types/titleType";

const Title: React.FC<TitleProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{`kalottong | ${title}`}</title>
        <meta name="description" content="Task management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </>
  );
};

export default Title;
