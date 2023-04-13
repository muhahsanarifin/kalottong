import { Spinner } from "flowbite-react";

export const SpinnerLoader = () => {
  return (
    <>
      <Spinner size="md" className="fill-red-orange" />
    </>
  );
};

export const ErrorMessage: React.FC<any> = ({ msg }) => {
  return (
    <>
      <p className=" bg-red-50 text-red-500 font-bold text-[12px] p-2 rounded-md">
        {msg}
      </p>
    </>
  );
};
