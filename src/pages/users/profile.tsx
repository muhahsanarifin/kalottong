import React, { useState, useEffect } from "react";
import type { NextPageWithLayout } from "../_app";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";

import { usersAction } from "@/redux/reducers/users";
import type { RootState, AppDispatch } from "@/redux/store";
import { PrivateRoute } from "@/helpers/handleRoutes";
import cookie from "@/utils/storage/cookies";

import Title from "@/components/Layout";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import { InputProfile } from "@/components/Input";
import {
  SaveInputProfileButton,
  SaveImageProfileButton,
} from "@/components/Button";
import { ErrorMessage, SuccessMessage } from "@/components/Feed";

const Profile: NextPageWithLayout = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const [disable, setDisable] = useState<boolean>(true);
  const retriveProfile = useSelector(
    (state: RootState) => state.user.retriveProfile
  );
  const editProfile = useSelector((state: RootState) => state.user.editProfile);
  const editNoTelp = useSelector((state: RootState) => state.user.editNoTelp);
  const [notelp, setNoTelp] = useState<string>(
    "" || retriveProfile.data?.notelp
  );
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");

  const [body, setBody] = useState({
    firstname: "" || retriveProfile.data?.firstname,
    lastname: "" || retriveProfile.data?.lastname,
  });

  interface NoTelpParams {
    target: {
      value: string;
    };
  }

  interface InputNameParams {
    target: {
      name: string;
      value: string;
    };
  }

  interface ImageParams {
    target: {
      files: File[];
    };
  }

  const handleInputName = (e: InputNameParams) => {
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };

  const handleUpdateProfile = async () => {
    Object.assign(body, {
      gender_id: retriveProfile?.data?.gender === "man" ? 1 : 2,
    });

    const cbEPFulfilled = () => {
      const cbRPFulfilled = () => {
        dispatch(usersAction.clearEditProfileData());
      };

      dispatch(
        usersAction.retriveProfileThunk({
          cbRPFulfilled,
          accessToken: cookie.get({ key: "token" }),
        })
      );
    };

    dispatch(
      usersAction.editProfileThunk({
        body,
        cbEPFulfilled,
        accessToken: cookie.get({ key: "token" }),
      })
    );
  };

  const handleInputNoTelp = (e: NoTelpParams) => {
    const { value } = e.target;
    setNoTelp(value);
  };

  const handleUpdateNoTelp = () => {
    const body = {
      notelp,
    };

    const cbENPFulfilled = () => {
      const cbRPFulfilled = () => {
        dispatch(usersAction.clearEditNoTelpData());
      };
      dispatch(
        usersAction.retriveProfileThunk({
          cbRPFulfilled,
          accessToken: cookie.get({ key: "token" }),
        })
      );
    };

    const cbENPFinally = () => {
      setTimeout(() => {
        dispatch(usersAction.clearEditNoTelpData());
      }, 1000);
    };

    dispatch(
      usersAction.editNoTelpThunk({
        body,
        cbENPFulfilled,
        cbENPFinally,
        accessToken: cookie.get({ key: "token" }),
      })
    );
  };

  const handleImage = (e: ImageParams) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleUpdateImage = () => {
    if (image) {
      let body = new FormData();

      body.append("image", image);

      const cbUIPFulfilled = () => {
        dispatch(
          usersAction.retriveProfileThunk({
            accessToken: cookie.get({ key: "token" }),
          })
        );
      };

      dispatch(
        usersAction.uploadImageProfileThunk({
          body,
          cbUIPFulfilled,
          accessToken: cookie.get({ key: "token" }),
        })
      );
    } else {
      console.error("Something wrong!");
    }
  };

  return (
    <>
      <Header onActive={"bg-gray-100 cursor-not-allowed"} />
      <section className="flex w-[50%] mx-auto md:w-full">
        <Breadcrumb page="Profile" />
      </section>
      <main className="min-h-screen md:py-4">
        <div className="h-min flex flex-col m-auto gap-2 py-4 xs:py-0">
          <a
            href="#"
            className="group relative block bg-white rounded-lg p-4 shadow-[0_16px_90px_rgba(19,7,52,0.08)] mx-auto w-[50%] h-full md:w-full"
          >
            {retriveProfile?.isLoading && (
              <Icon
                icon="material-symbols:person"
                className="absolute inset-0 h-[100%] w-[100%] object-cover opacity-75 transition-opacity group-hover:opacity-50 text-gray-100 m-auto animate-pulse"
              />
            )}
            {retriveProfile?.isFulfilled && (
              <>
                {retriveProfile?.data?.image || previewImage ? (
                  <Image
                    alt="Developer"
                    src={
                      previewImage
                        ? previewImage
                        : `${process.env.NEXT_PUBLIC_IMAGE_CLOUDNIARY}/${retriveProfile?.data?.image}`
                    }
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                    width={500}
                    height={500}
                    loading="lazy"
                  />
                ) : (
                  <Icon
                    icon="material-symbols:frame-person-rounded"
                    className="absolute inset-0 h-[50%] w-[50%] object-cover opacity-75 transition-opacity group-hover:opacity-50 text-gray-100 m-auto md:w-full"
                  />
                )}
              </>
            )}

            <div className="relative p-4 sm:p-6 lg:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-red-orange">
                {retriveProfile?.data?.email}
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
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                        </p>
                        <p className="text-xs text-gray-500 md:text-[10px]">
                          JPEG, JPG, PNG or WEBP (MAX file size. 200kb)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        name="image"
                        onChange={(e: any) => handleImage(e)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <section className="mx-auto w-[50%] md:w-full">
            <SaveImageProfileButton
              setAction={handleUpdateImage}
              onDisable={!image}
              onLoading={false}
            />
          </section>
          <fieldset className="bg-white rounded-lg shadow-[0_16px_90px_rgba(19,7,52,0.08)] mx-auto w-[50%] p-2 flex flex-col gap-y-2 min-h-[192.8px] md:w-full">
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
                onName="firstname"
                onId="firstname"
                setOnChange={handleInputName}
                onDisable={disable}
                onHtmlFor="firstname"
                value={body.firstname}
              />
            </div>
            <div className="relative flex items-center gap-x-2">
              <InputProfile
                onType="text"
                onTitle="Lastname"
                onName="lastname"
                onId="lastname"
                setOnChange={handleInputName}
                onDisable={disable}
                onHtmlFor="lastname"
                value={body.lastname}
              />
            </div>
            {editProfile?.isFulfilled ? (
              <SuccessMessage
                init={editProfile?.data?.msg}
                setClose={() => dispatch(usersAction.clearEditProfileData())}
              />
            ) : (
              <SaveInputProfileButton
                setAction={handleUpdateProfile}
                onDisable={disable || Object.values(body).includes("")}
                onLoading={false}
              />
            )}
            <div className="relative flex items-center gap-x-2">
              <InputProfile
                onType="number"
                onName="notelp"
                onTitle="No Telp"
                onId="notelp"
                setOnChange={handleInputNoTelp}
                onDisable={disable}
                onHtmlFor="notelp"
                value={"-Infinity" < notelp ? notelp : !notelp}
              />
              {editNoTelp?.isFulfilled ? (
                <SuccessMessage
                  init={editNoTelp?.data?.msg}
                  setClose={() => dispatch(usersAction.clearEditNoTelpData())}
                />
              ) : editNoTelp?.isRejected ? (
                <ErrorMessage msg={editNoTelp?.data?.msg} />
              ) : (
                <SaveInputProfileButton
                  setAction={handleUpdateNoTelp}
                  onDisable={disable || !notelp}
                  onLoading={false}
                />
              )}
            </div>
          </fieldset>
        </div>
      </main>
    </>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <PrivateRoute>
      <Title title="Profile">{page}</Title>
    </PrivateRoute>
  );
};
