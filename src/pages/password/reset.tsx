import React from "react";
import type { NextPageWithLayout } from "../_app";
import Title from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import { ResetPasswordForm } from "@/components/Forms";

const ResetPassword: NextPageWithLayout = () => {
  return (
    <>
      <section className="w-[50%] mx-auto md:w-full">
        <Breadcrumb page="Forgot Password" />
      </section>
      <main className="h-[90vh] flex flex-col justify-center gap-y-2">
        <h3 className=" text-[24px] font-[600] mx-auto">
          kalot<span className="text-red-orange">tong.</span>
        </h3>
        <section className="w-[50%] mx-auto  md:w-full">
          <ResetPasswordForm />
        </section>
      </main>
    </>
  );
};

export default ResetPassword;

ResetPassword.getLayout = function getLayout(page: React.ReactElement) {
  return <Title title="Reset Password">{page}</Title>;
};
