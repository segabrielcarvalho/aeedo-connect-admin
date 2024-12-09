"use client";
import "moment/locale/pt-br";

import moment from "moment";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../contexts/AuthContext";
moment.locale("pt-br");

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthProvider>
      <ToastContainer />
      {children}
    </AuthProvider>
  );
};
