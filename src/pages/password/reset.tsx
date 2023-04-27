import React from "react";
import type { NextPageWithLayout } from "../_app";
import { TitleForgetPassword } from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import { ResetPasswordForm } from "@/components/Forms";
import Footer from "@/components/Footer";

const ResetPassword: NextPageWithLayout = () => {
  return (
    <>
      <section className="w-[50%] mx-auto">
        <Breadcrumb page="Forgot Password" />
      </section>
      <main className="h-[90vh] flex flex-col justify-center gap-y-2">
        <h3 className=" text-[24px] font-[600] mx-auto">
          kalot<span className="text-red-orange">tong.</span>
        </h3>
        <section className="w-[50%] mx-auto">
          <ResetPasswordForm />
        </section>
      </main>
      <section className="w-[50%] mx-auto">
        <Footer />
      </section>
    </>
  );
};

export default ResetPassword;

ResetPassword.getLayout = function getLayout(page: React.ReactElement) {
  return <TitleForgetPassword>{page}</TitleForgetPassword>;
};
