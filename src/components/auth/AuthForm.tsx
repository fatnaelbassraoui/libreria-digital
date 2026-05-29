"use client";

import { useState } from "react"; // ← Importiamo FormEvent in modo pulito e moderno
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { supabase } from "../../lib/supabase";
import InputField from "../ui/InputField"; // ← Cambiato il nome dell'import per coerenza con il file
import "react-toastify/dist/ReactToastify.css";

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
      }
      
      router.push("/books"); 
      
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 space-y-4 md:space-y-6 p-12 bg-white rounded-xl shadow-sm max-w-md mx-auto"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col items-center justify-center px-2 mx-auto lg:py-0">
        <h1 className="text-4xl font-bold text-sky-900">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>
      </div>

      <InputField
        id="email"
        type="email"
        value={email}
        label="Email"
        setValue={setEmail}
      />
      <InputField
        id="password"
        type="password"
        value={password}
        label="Password"
        setValue={setPassword}
      />

      <button
        className="w-full bg-sky-900 rounded-lg p-3.5 text-white font-semibold transition-colors hover:bg-sky-950 disabled:opacity-50"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
      </button>

      {isLogin ? (
        <div className="flex justify-end">
          <Link
            href="/auth/signUp"
            className="text-sm font-bold text-sky-900 hover:underline"
          >
            Don't have an account? Sign Up
          </Link>
        </div>
      ) : (
        <div className="flex justify-end gap-1 text-sm">
          <span className="text-gray-600">Already have an account?</span>
          <Link
            href="/auth/signIn"
            className="font-bold underline text-sky-900 hover:text-sky-950"
          >
            Sign In
          </Link>
        </div>
      )}
    </form>
  );
};

export default AuthForm;