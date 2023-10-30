import Image from "next/image";
import { FourZeroFour } from "@/utils/assest";

const NotFound = () => {
  return (
    <main className="absolute inset-0 flex">
      <Image
        src={FourZeroFour}
        alt="Not Found"
        className="m-auto"
      />
    </main>
  );
};
export default NotFound;
