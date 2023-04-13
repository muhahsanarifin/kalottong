import React from "react";
import { ResetPasswordForm } from "@/components/Forms";
import { BackButton } from "@/components/Button";
import { TitleForgetPassword } from "@/components/Layout";

const ResetPassword = () => {
  return (
    <>
      <TitleForgetPassword>
        <section className="h-[50vh] flex flex-col justify-center">
          <h3 className=" text-[24px] font-[600] mx-auto">
            kalot<span className="text-red-orange">tong.</span>
          </h3>
          <ResetPasswordForm />
          <div className="flex justify-center">
            <BackButton onRoute="/home" title="Home" />
          </div>
        </section>
      </TitleForgetPassword>
    </>
  );
};

export default ResetPassword;
