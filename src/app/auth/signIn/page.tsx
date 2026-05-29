
import Image from "next/image";
import AuthForm from "../../../components/auth/AuthForm";

const SignInPage = () => {
return (
    <div className="flex min-h-screen w-screen">
     
     {/* Column Left: Cover Image */}
      <div className="hidden md:block md:w-1/2 lg:w-7/12 xl:w-8/12 relative bg-gray-900">
        <Image 
          src="/image/LoginImage.jpg" 
          alt="Library Authentication" 
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-80"
        />
        {/* Overlay with Quote */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
          <p className="text-white text-2xl font-medium italic">
            "A room without books is like a body without a soul." – Cicero
          </p>
        </div>
      </div>

      {/* Column Right: Input Form */}
      <div className="w-full md:w-1/2 lg:w-5/12 xl:w-4/12 flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <AuthForm type="signIn" />
      </div>
    </div>
  );
};

export default SignInPage;
