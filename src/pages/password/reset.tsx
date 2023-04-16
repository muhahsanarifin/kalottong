import React from "react";
import { ResetPasswordForm } from "@/components/Forms";
import { TitleForgetPassword } from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

const ResetPassword = () => {
  return (
    <>
      <TitleForgetPassword>
        <header>
          <Breadcrumb page="Forgot Password" />
        </header>
        <main className="h-[90vh] flex flex-col justify-center gap-y-2">
          <h3 className=" text-[24px] font-[600] mx-auto">
            kalot<span className="text-red-orange">tong.</span>
          </h3>
          <section className="w-[50%] mx-auto">
            <ResetPasswordForm />
          </section>
        </main>
        <Footer/>
      </TitleForgetPassword>
    </>
  );
};

export default ResetPassword;
