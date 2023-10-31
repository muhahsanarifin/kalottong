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
      <main className="h-[90vh] flex flex-col items-center gap-y-2">
        <div className="my-20">
          <h3 className=" text-2xl sm:text-[18px] font-[600]">
            <span className="text-red-orange">Kalottong</span> | Forgot
            Password.
          </h3>
        </div>
        <section className="w-1/2 md:w-full">
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


