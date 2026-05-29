"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { SearchBar } from "./SearchBar";

export const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    const handleLogout= async ()=>{
        try{
            await signOut();
            router.push("/auth/signIn");
        }catch(error:any){
            toast.error("Error during logout:", error);
        }
    }
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-200 h-16">
      {/* Questo container blocca la larghezza al centro e non la fa "esplodere" su schermi grandi */}
      <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* 1. LOGO */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center gap-2 text-gray-900 hover:opacity-80">
            <svg className="w-6 h-6 text-green-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.039V18M12 6.039c-1.128-.694-2.433-1.039-3.75-1.039-1.317 0-2.622.345-3.75 1.039V18.06c1.128-.695 2.433-1.04 3.75-1.04 1.317 0 2.622.345 3.75 1.04M12 6.039c1.128-.694 2.433-1.039 3.75-1.039 1.317 0 2.622.345 3.75 1.039V18.06c-1.128-.695-2.433-1.04-3.75-1.04-1.317 0-2.622.345-3.75 1.04" />
            </svg>
            <span className="text-lg font-bold tracking-tight text-gray-900 hidden sm:block">
              LibreriaDigitale
            </span>
          </Link>
        </div>

        {/* 2. SEARCHBAR (Centrata e proporzionata) */}
        <div className="flex-1 max-w-md mx-auto w-full">
          <SearchBar 
            query={""} 
            setQuery={function (value: string): void {
              // Logica dello stato della ricerca
            }}
          />
        </div>

        {/* 3. LIBRERIA / COLLEZIONE + 4. AVATAR */}
        <div className="flex items-center gap-4 shrink-0 relative">
          
          {/* Link Libreria */}
          <Link href="/collezione" className="text-sm font-semibold text-gray-600 hover:text-green-700 transition-colors">
            La mia Collezione
          </Link>

          {/* Bottone Menu Avatar */}
          <button 
            type="button" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex text-sm bg-gray-200 rounded-full focus:ring-4 focus:ring-gray-100 transition-transform active:scale-95" 
          >
            <img 
              className="w-8 h-8 rounded-full object-cover" 
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
              alt="Profilo"
            />
          </button>

          {/* Dropdown del Logout */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-12 z-50 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden divide-y divide-gray-100 animate-in fade-in slide-in-from-top-1 duration-100">
              <div className="py-3 px-4 bg-gray-50/50">
                <p className="text-xs text-gray-400 font-medium">Account connesso</p>
                <p className="text-sm font-semibold text-gray-900 truncate mt-0.5">
                  {user?.user_metadata?.full_name || "Utente"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "email@esempio.com"}
                </p>
              </div>
              
              <div className="py-1">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left py-2.5 px-4 text-sm text-red-600 hover:bg-red-50 font-semibold transition-colors"
                >
                  <Icon icon="mdi:logout" width="18" height="18" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};
