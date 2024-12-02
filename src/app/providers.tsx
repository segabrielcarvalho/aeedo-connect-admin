"use client";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../contexts/AuthContext";

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
