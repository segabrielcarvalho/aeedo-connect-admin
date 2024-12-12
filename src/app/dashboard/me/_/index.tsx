"use client";
import { RoleEnum, useAuthContext } from "../../../../contexts/AuthContext";
import AddressSection from "./components/Sections/AddressSection";
import HospitalSection from "./components/Sections/HospitalSection/page";
import OrganSection from "./components/Sections/OrganSection";
import ProfileSection from "./components/Sections/ProfileSection";

export const Me = () => {
  const { user } = useAuthContext();

  return (
    <div className="mx-auto lg:flex lg:gap-x-16 lg:px-8">
      <main className="px-4 py-10 sm:px-6 lg:flex-auto lg:px-0 ">
        <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <ProfileSection />

          {user?.role === RoleEnum.USER && (
            <>
              <AddressSection />
              <HospitalSection />
              <OrganSection />
            </>
          )}
        </div>
      </main>
    </div>
  );
};
