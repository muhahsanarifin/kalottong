const Footer = () => {
  const getFullYear = () => {
    return new Date().getFullYear();
  };

  const year = getFullYear();

  return (
    <>
      <footer className="flex">
        <h1 className="text-[14px] font-medium">
          © 2022 - {year} <span className="text-red-orange">kalottong</span>
        </h1>
      </footer>
    </>
  );
};

export default Footer;
