"use client";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import heroImage from "../../../public/images/heroImage.jpg";
import { useRouter } from "next/navigation";

const HeroPage = () => {
  const router = useRouter();
  return (
    <div className="relative w-full h-screen overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={heroImage}
          alt="Library background"
          fill
          className="object-cover object-center brightness-[0.6]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      </div>
      <div className="relative z-10 flex flex-col justify-center h-full mr-auto px-6 sm:px-12 md:px-16 xl:px-24 text-white">
        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="flex gap-2 items-center w-fit px-3 py-1.5 ">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <p className="text-xs font-semibold tracking-wider uppercase text-zinc-200">
              Your Digital Library
            </p>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl leading-[1.1]">
            Discover.
            <br />
            Read.
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
              Learn.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-xl">
            Explore thousands of books, academic articles, and digital
            resources. Your next great adventure or research breakthrough starts
            right here, available anywhere, anytime.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button
              className="bg-violet-600 hover:bg-violet-500 text-white font-medium px-8 py-6 text-base rounded-xl transition-all shadow-lg shadow-violet-600/30"
              size="lg"
            >
              Explore Library
            </Button>

            <Button
              variant="outline"
              className="border-zinc-700 text-white bg-white/10 hover:bg-white/15 backdrop-blur-sm font-medium px-8 py-6 text-base rounded-xl transition-all"
              size="lg"
              onClick={() => {
                router.push("/auth/signin");
              }}
            >
              Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((n) => (
                <Avatar
                  key={n}
                  className="border-2 border-zinc-950 w-10 h-10 shadow-md"
                >
                  <AvatarImage
                    src={`/images/avatar${n}.jpg`}
                    alt={`User avatar ${n}`}
                  />
                  <AvatarFallback className="bg-violet-600 text-white text-xs font-bold">
                    U{n}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>

            <div className="flex flex-col">
              <span className="text-white font-bold text-sm">
                +2,000 readers
              </span>
              <span className="text-zinc-400 text-xs">
                already joined our community
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
