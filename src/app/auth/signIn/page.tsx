
import Image from "next/image";
import AuthForm from "../../../components/auth/AuthForm";

const LoginPage = () => {
  return (
    <div className="h-screen w-screen">
      <div className="h-full">
        {/* Image container  */}
        <div className="flex h-full flex-wrap md:flex-row items-center justify-center lg:justify-between">
          <div className=" shrink-1 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 hidden md:block ">
            <Image src="/image/loginImage.jpg" alt="auth" width={1000} height={1000} className=" sm:w-8/12 sm:h-full md:w-full" />{" "}
          </div>

          {/*  Inputs container */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <AuthForm type="signIn" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
