"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { supabase } from "../../lib/supabase";
import "react-toastify/dist/ReactToastify.css";
import { handleError } from "../../utils/handleError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react"; // Icona spinner standard di shadcn (richiede lucide-react)

interface AuthFormProps {
  type: "signIn" | "signUp";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isLogin = type === "signIn";
  const router = useRouter();

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
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

        router.push("/books");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Registration completed!");
        router.push("/auth/signin");
      }
    } catch (error: unknown) {
      handleError(
        error,
        isLogin
          ? "Login failed. Please check your credentials."
          : "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-8 text-neutral-200">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-sm text-neutral-400">
          {isLogin
            ? "Sign in to access your digital library"
            : "Get started with your free account today"}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-2">
          <Label
            htmlFor="email"
            className="text-neutral-300 font-medium tracking-wide text-xs uppercase"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="h-11 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:ring-violet-500 focus-visible:ring-offset-0"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-neutral-300 font-medium tracking-wide text-xs uppercase"
            >
              Password
            </Label>
            {isLogin && (
              <Link
                href="/auth/forgot"
                className="text-xs text-neutral-400 hover:text-white underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="h-11 bg-neutral-900 border-neutral-800 text-white focus-visible:ring-violet-500 focus-visible:ring-offset-0"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-11 font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-lg shadow-violet-600/20"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : isLogin ? (
            "Sign In"
          ) : (
            "Sign Up"
          )}
        </Button>

        <div className="w-full text-center pt-4 border-t border-neutral-900 text-sm text-neutral-400">
          {isLogin ? (
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-bold text-violet-400 hover:text-violet-300 hover:underline ml-1"
              >
                Sign Up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="font-bold text-violet-400 hover:text-violet-300 hover:underline ml-1"
              >
                Sign In
              </Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
