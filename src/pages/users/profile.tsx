import React, { useState } from "react";
import { TitleProfile } from "@/components/Layout";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Breadcrumb from "@/components/Breadcrumb";

const Profile = () => {
  const handleFirstname = (e: any) => {
    console.log(e.target.value);
    console.log(
      ((document.getElementById("firstnameDisplay") as HTMLElement).innerHTML =
        e.target.value)
    );
  };

  const handleLastname = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <>
      <TitleProfile>
        <header className="flex">
          <Breadcrumb page="Profile"/>
        </header>
        <main className="min-h-screen">
          <div className="h-min flex flex-col m-auto gap-2 py-4 xs:py-0">
            <a
              href="#"
              className="group relative block bg-white rounded-lg p-4 shadow-sm shadow-indigo-100 mx-auto w-[50%] h-full"
            >
              {false ? (
                <Image
                  alt="Developer"
                  src=""
                  className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                  width={500}
                  height={500}
                />
              ) : (
                // <h1 className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50">
                //   Image not found
                // </h1>
                <Icon
                  icon="material-symbols:frame-person"
                  className="absolute inset-0 h-[50%] w-[50%] object-cover opacity-75 transition-opacity group-hover:opacity-50 text-gray-100 m-auto"
                />
              )}

              <div className="relative p-4 sm:p-6 lg:p-8">
                <p className="text-sm font-medium uppercase tracking-widest text-red-orange">
                  accan@gmail.com
                </p>

                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  <span id="firstnameDisplay" className="firstname">
                    MUH
                  </span>{" "}
                  <span className="lastnameDisplay">AHSAN</span>
                </p>

                <div className="mt-32 sm:mt-48 lg:mt-64">
                  <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    {/* <p className="text-sm text-white">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Omnis perferendis hic asperiores quibusdam quidem
                      voluptates doloremque reiciendis nostrum harum.
                      Repudiandae?
                    </p> */}

                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </a>
            <fieldset className="bg-white rounded-lg p-4 shadow-sm shadow-indigo-100 mx-auto w-[50%] p-2 flex flex-col gap-y-2">
              <legend className="text-red-orange font-bold">
                Edit profile:
              </legend>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Email
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="firstname"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleFirstname}
                />
                <label
                  htmlFor="firstname"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Firstname
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="lastname"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleLastname}
                />
                <label
                  htmlFor="lastname"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Lastname
                </label>
              </div>
            </fieldset>
          </div>
        </main>
        <Footer />
      </TitleProfile>
    </>
  );
};

export default Profile;

// Profile.getLayout = function getLayout(page: React.ReactElement) {
//   return (<TitleProfile>{page}</TitleProfile>);
// };
