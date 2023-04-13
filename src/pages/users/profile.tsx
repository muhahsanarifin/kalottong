import React, { useState } from "react";
import { TitleProfile } from "@/components/Layout";

const Profile = () => {
  return (
    <>
      <TitleProfile>
        <header></header>
        <main>
          <h1>Profile Section</h1>
        </main>
        <footer></footer>
      </TitleProfile>
    </>
  );
};

export default Profile;

// Profile.getLayout = function getLayout(page: React.ReactElement) {
//   return (<TitleProfile>{page}</TitleProfile>);
// };
