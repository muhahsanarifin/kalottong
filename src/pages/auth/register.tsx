import React from "react";
import type { NextPageWithLayout } from "../_app";
import Title from "@/components/Layout";
import { RouteToHome } from "@/helpers/handleRoutes";
import Breadcrumb from "@/components/Breadcrumb";
import { RegisterForm } from "@/components/Forms";

const Register: NextPageWithLayout = () => {
  return (
    <>
      <section className="flex w-[50%] mx-auto md:w-full">
        <Breadcrumb page="Register" />
      </section>
      <section className="h-[90vh] flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold text-gray-900">
          <span className="text-red-orange">kalottong</span> member
        </h3>
        <RegisterForm />
      </section>
    </>
  );
};

export default Register;

Register.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <RouteToHome>
      <Title title="Register">{page}</Title>
    </RouteToHome>
  );
};
