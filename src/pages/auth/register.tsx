import React from "react";
import { RegisterForm } from "@/components/Forms";
import { TitleRegister } from "@/components/Layout";

const Register = () => {
  return (
    <>
      <TitleRegister>
        <section className="flex flex-col items-center">
          <h3 className="text-2xl font-bold text-gray-900">
            <span className="text-red-orange">kalottong</span> member
          </h3>
          <RegisterForm />
        </section>
      </TitleRegister>
    </>
  );
};

export default Register;
