import React, { useState, useEffect } from "react";
import type { NextPageWithLayout } from "../_app";
import Image from "next/image";
import { usersAction } from "../../redux/reducers/users";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import type { RootState, AppDispatch } from "@/redux/store";
import { PrivateRoute } from "@/helpers/handleRoutes";

import { TitleProfile } from "@/components/Layout";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import { InputProfile } from "@/components/Input";
import {
  SaveInputProfileButton,
  SaveImageProfileButton,
} from "@/components/Button";
import { SuccessMessage } from "@/components/Feed";
import Footer from "@/components/Footer";

const Profile: NextPageWithLayout = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const [disable, setDisable] = useState<boolean>(true);
  const profile = useSelector(
    (state: RootState) => state.user.retriveProfile.data
  );
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [notelp, setNoTelp] = useState<string>("");
  const [successUpdateFirstName, setSuccessUpdateFirstName] =
    useState<string>("");
  const [loadingUpdateFirstName, setLoadingUpdateFirstName] =
    useState<boolean>(false);
  const [successUpdateLastName, setSucessUpdateLastName] = useState<string>("");
  const [loadingUpdateLastName, setLoadingUpdateLastName] =
    useState<boolean>(false);
  const [successUpdateNopTelp, setSuccessUpdateNoTelp] = useState<string>("");
  const [loadingUpdateNoTelp, setLoadingUpdateNoTelp] =
    useState<boolean>(false);
  const [image, setImage] = useState<File>();
  const [loadingUpdateImage, setLoadingUpdateImage] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    dispatch(usersAction.retriveProfileThunk({}));
  }, [dispatch]);

  useEffect(() => {
    setFirstName(profile?.firstname);
    setLastname(profile?.lastname);
    setNoTelp(profile?.notelp);
  }, [profile?.firstname, profile?.lastname, profile?.notelp]);

  const handleUpdateFirstname = () => {
    const body = {
      firstname: firstname,
      lastname: profile?.lastname,
      gender_id: profile?.gender === "man" ? 1 : 2,
    };

    const cbPending = () => {
      setLoadingUpdateFirstName(true);
    };

    const cbFulfilled = (response: any) => {
      setSuccessUpdateFirstName(response.msg);
    };

    const cbFinally = () => {
      window.location.reload();
    };

    dispatch(
      usersAction.editProfileThunk({ body, cbPending, cbFulfilled, cbFinally })
    );
  };

  const handleUpdateLastname = () => {
    const body = {
      firstname: profile.firstname,
      lastname: lastname,
      gender_id: profile?.gender === "man" ? 1 : 2,
    };

    const cbPending = () => {
      setLoadingUpdateLastName(true);
    };

    const cbFulfilled = (response: any) => {
      setSucessUpdateLastName(response.msg);
    };

    const cbFinally = () => {
      window.location.reload();
    };
    dispatch(
      usersAction.editProfileThunk({
        body,
        cbPending,
        cbFulfilled,
        cbFinally,
      })
    );
  };

  const handleUpdateNoTelp = () => {
    const body = {
      notelp: profile.notelp,
    };

    const cbPending = () => {
      setLoadingUpdateNoTelp(true);
    };

    const cbFulfilled = (response: any) => {
      setSuccessUpdateNoTelp(response.msg);
    };

    const cbFinally = () => {
      window.location.reload();
    };
    dispatch(
      usersAction.editNoTelpThunk({
        body,
        cbPending,
        cbFulfilled,
        cbFinally,
      })
    );
  };

  const handleImage = (e: any) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleSaveImage = () => {
    const cbPending = () => {
      setLoadingUpdateImage(true);
    };

    const cbFulfilled = (response: any) => {
      console.info(response.msg);
    };

    const cbFinally = () => {
      window.location.reload();
      setLoadingUpdateImage(false)
    };

    if (image) {
      let body = new FormData();

      body.append("image", image);

      dispatch(
        usersAction.uploadImageProfileThunk({
          body,
          cbPending,
          cbFulfilled,
          cbFinally,
        })
      );
    } else {
      console.error("Something wrong!");
    }
  };

  return (
    <>
      <Header />
      <section className="flex w-[50%] mx-auto">
        <Breadcrumb page="Profile" />
      </section>
      <main className="min-h-screen">
        <div className="h-min flex flex-col m-auto gap-2 py-4 xs:py-0">
          <a
            href="#"
            className="group relative block bg-white rounded-lg p-4 shadow-[0_16px_90px_rgba(19,7,52,0.08)] mx-auto w-[50%] h-full"
          >
            {profile?.image ? (
              <Image
                alt="Developer"
                src={
                  previewImage
                    ? previewImage
                    : `${process.env.NEXT_PUBLIC_IMAGE_CLOUDNIARY}/${profile?.image}`
                }
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
                          <span className="font-semibold">Click to upload</span>{" "}
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
                        name="image"
                        onChange={handleImage}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <section className="mx-auto w-[50%]">
            <SaveImageProfileButton
              onSetAction={handleSaveImage}
              onDisable={!image}
              onLoading={loadingUpdateImage}
            />
          </section>
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
              {(successUpdateFirstName && (
                <SuccessMessage init={successUpdateFirstName} />
              )) ||
                (!successUpdateFirstName && (
                  <>
                    <InputProfile
                      onType="text"
                      onTitle="Firstname"
                      onId="firstname"
                      setOnChange={(e: any) => setFirstName(e.target.value)}
                      onDisable={disable}
                      onHtmlFor="firstname"
                      onSetValue={firstname}
                    />
                    <SaveInputProfileButton
                      onSetAction={handleUpdateFirstname}
                      onDisable={disable || !firstname}
                      onLoading={loadingUpdateFirstName}
                    />
                  </>
                ))}
            </div>
            <div className="relative flex items-center gap-x-2">
              {(successUpdateLastName && (
                <SuccessMessage init={successUpdateLastName} />
              )) ||
                (!successUpdateLastName && (
                  <>
                    <InputProfile
                      onType="text"
                      onTitle="Lastname"
                      onId="lastname"
                      setOnChange={(e: any) => setLastname(e.target.value)}
                      onDisable={disable}
                      onHtmlFor="lastname"
                      onSetValue={lastname}
                    />
                    <SaveInputProfileButton
                      onSetAction={handleUpdateLastname}
                      onDisable={disable || !lastname}
                      onLoading={loadingUpdateLastName}
                    />
                  </>
                ))}
            </div>
            <div className="relative flex items-center gap-x-2">
              {(successUpdateNopTelp && (
                <SuccessMessage init={successUpdateNopTelp} />
              )) ||
                (!successUpdateNopTelp && (
                  <>
                    <InputProfile
                      onType="number"
                      onTitle="No Telp"
                      onId="notelp"
                      setOnChange={(e: any) => setNoTelp(e.target.value)}
                      onDisable={disable}
                      onHtmlFor="notelp"
                      onSetValue={notelp}
                    />
                    <SaveInputProfileButton
                      onSetAction={handleUpdateNoTelp}
                      onDisable={disable || !notelp}
                      onLoading={loadingUpdateNoTelp}
                    />
                  </>
                ))}
            </div>
          </fieldset>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <PrivateRoute>
      <TitleProfile>{page}</TitleProfile>
    </PrivateRoute>
  );
};
