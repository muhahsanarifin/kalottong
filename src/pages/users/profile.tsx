import React, { useState, useEffect } from "react";
import { TitleProfile } from "@/components/Layout";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Breadcrumb from "@/components/Breadcrumb";
import { InputProfile } from "@/components/Input";
import { SaveInputProfileButton } from "@/components/Button";
import { useSelector, useDispatch } from "react-redux";
import { usersAction } from "../../redux/reducers/users";
import { getCookie } from "cookies-next";
import type { RootState } from "@/redux/store";

const Profile = () => {
  const dispatch = useDispatch<any>();
  const [disable, setDisable] = useState<boolean>(true);
  const profile = useSelector((state: RootState) => state.user.retriveProfile);
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [notelp, setNoTelp] = useState<string>("");

  const handleFirstname = (e: any) => {
    // console.log(e.target.value);
    setFirstName(e.target.value);
  };

  const handleLastname = (e: any) => {
    // console.log(e.target.value);
    setLastname(e.target.value);
  };

  const handleNoTelp = (e: any) => {
    // console.log(e.target.value);
    setNoTelp(e.target.value);
  };

  // Test retrive data profile
  useEffect(() => {
    dispatch(usersAction.retriveProfileThunk(getCookie("token")));
  }, [dispatch]);

  // console.log("user:", profile);
  // console.log("image:", profile.image);
  // console.log("email:", profile.email);
  // console.log("firstname:", profile.firstname);
  // console.log("lastname:", profile.lastname);
  // console.log("gender:", profile.gender);

  return (
    <>
      <TitleProfile>
        <header className="flex">
          <Breadcrumb page="Profile" />
        </header>
        <main className="min-h-screen">
          <div className="h-min flex flex-col m-auto gap-2 py-4 xs:py-0">
            <a
              href="#"
              className="group relative block bg-white rounded-lg p-4 shadow-[0_16px_90px_rgba(19,7,52,0.08)] mx-auto w-[50%] h-full"
            >
              {true ? (
                <Image
                  alt="Developer"
                  src={`${process.env.NEXT_PUBLIC_IMAGE_CLOUDNIARY}${profile.image}`}
                  className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                  width={500}
                  height={500}
                  priority
                />
              ) : (
                <Icon
                  icon="material-symbols:frame-person"
                  className="absolute inset-0 h-[50%] w-[50%] object-cover opacity-75 transition-opacity group-hover:opacity-50 text-gray-100 m-auto"
                />
              )}

              <div className="relative p-4 sm:p-6 lg:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-red-orange">
                  accan@gmail.com
                </p>
                <div className="mt-32 sm:mt-48 lg:mt-64">
                  <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
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
                            JPEG, JPG, PNG or WEBP (MAX file size. 200kb)
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
            <fieldset className="bg-white rounded-lg shadow-[0_16px_90px_rgba(19,7,52,0.08)] mx-auto w-[50%] p-2 flex flex-col gap-y-2">
              <legend className="flex">
                <button onClick={() => setDisable(!disable)}>
                  <Icon
                    icon="material-symbols:edit"
                    className="h-[18px] w-[18px] text-red-orange hover:text-red-orange-dark"
                  />
                </button>
              </legend>
              <div className="relative flex items-center gap-x-2">
                <InputProfile
                  onType="text"
                  onTitle="Firstname"
                  onId="firstname"
                  setOnChange={handleFirstname}
                  onDisable={disable}
                  onHtmlFor="firstname"
                />
                <SaveInputProfileButton
                  onSetAction={() => console.log("Test")}
                  onDisable={disable || !firstname}
                />
              </div>
              <div className="relative flex items-center gap-x-2">
                <InputProfile
                  onType="text"
                  onTitle="Lastname"
                  onId="lastname"
                  setOnChange={handleLastname}
                  onDisable={disable}
                  onHtmlFor="lastname"
                />
                <SaveInputProfileButton
                  onSetAction={() => console.log("Test")}
                  onDisable={disable || !lastname}
                />
              </div>
              <div className="relative flex items-center gap-x-2">
                <InputProfile
                  onType="number"
                  onTitle="No Telp"
                  onId="notelp"
                  setOnChange={handleNoTelp}
                  onDisable={disable}
                  onHtmlFor="notelp"
                />
                <SaveInputProfileButton
                  onSetAction={() => console.log("Test")}
                  onDisable={disable || !notelp}
                />
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
