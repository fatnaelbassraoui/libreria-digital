"use client";

import { useState } from "react"; // ← Importiamo FormEvent in modo pulito e moderno
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { supabase } from "../../lib/supabase";
import InputField from "../ui/InputField"; 
import "react-toastify/dist/ReactToastify.css";
import { handleError } from "../../utils/handleError";
import { Spinner } from "../ui/Spinner";

interface AuthFormProps {
  type: "signIn" | "signUp";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 
  const isLogin = type === "signIn";
  const router = useRouter();

 
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        toast.success("login successful!");
          router.push("/books")
        } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Registration completed! Please check your email.");
          router.push("/auth/signIn"); 
      }

    } catch (error:unknown) {
     handleError(error, isLogin ? "Login failed. Please check your credentials." : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

 
  return (
    <form
      className="w-full max-w-md mx-auto p-8 sm:p-10 bg-white rounded-2xl shadow-xl border border-gray-100 space-y-6 transition-all"
      onSubmit={onSubmit}
    >
      {/* Brand & Form Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-sm text-gray-500">
          {isLogin ? "Sign in to access your digital library" : "Get started with your free account today"}
        </p>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <InputField
          id="email"
          type="email"
          value={email}
          label="Email Address"
          setValue={setEmail}
        />
        <InputField
          id="password"
          type="password"
          value={password}
          label="Password"
          setValue={setPassword}
        />
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-green-700 rounded-xl p-3.5 text-white font-semibold text-sm transition-all hover:bg-green-800 focus:ring-4 focus:ring-green-100 disabled:opacity-50 disabled:pointer-events-none shadow-sm flex items-center justify-center gap-2"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner />
          </>
        ) : isLogin ? (
          "Sign In"
        ) : (
          "Sign Up"
        )}
      </button>

      {/* Form Footer */}
      <div className="text-center pt-2 border-t border-gray-100 text-sm">
        {isLogin ? (
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/auth/signUp"
              className="font-bold text-green-700 hover:text-green-800 hover:underline ml-1"
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/signIn"
              className="font-bold text-green-700 hover:text-green-800 hover:underline ml-1"
            >
              Sign In
            </Link>
          </p>
        )}
      </div>
    </form>
  );
};

export default AuthForm;