"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div>
      <ToastContainer />
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
