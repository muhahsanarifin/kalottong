import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const PrivateRoute = ({ children }: any) => {
  const router = useRouter();

  useEffect(() => {
    if (!getCookie("token")) router.replace("/home");
  }, [router]);

  return children;
};

export { PrivateRoute };
