import Image from "next/image";
import AuthForm from "./AuthForm";

interface AuthTemplateProps {
  title: string;
  type: "signIn" | "signUp";
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({ title, type }) => {
  return (
    <div className="flex min-h-screen w-screen bg-neutral-950">
      <div className="hidden md:block md:w-1/2 lg:w-7/12 xl:w-8/12 relative">
        <Image
          src="/images/loginImage.jpg"
          alt="Library Authentication"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent flex items-end p-12">
          <p className="text-white text-2xl font-medium tracking-wide max-w-md italic">
            {title}
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-5/12 xl:w-4/12 flex items-center justify-center p-8 sm:p-12 bg-neutral-950 border-l border-neutral-800/50">
        <AuthForm type={type} />
      </div>
    </div>
  );
};
