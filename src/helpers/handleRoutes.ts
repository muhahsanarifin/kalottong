import { useEffect } from "react";
import cookie from "../utils/storage/cookies";
import { useRouter } from "next/router";

const PrivateRoute = ({ children }: any) => {
  const router = useRouter();

  useEffect(() => {
    if (!cookie.get({ key: "token" })) router.replace("/home");
  }, [router]);

  return children;
};

const RouteToHome = ({ children }: any) => {
  const router = useRouter();

  useEffect(() => {
    if (cookie.get({ key: "token" })) router.replace("/home");
  }, [router]);

  return children;
};

export { PrivateRoute, RouteToHome };
