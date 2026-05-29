import { SearchBar } from "@/src/components/ui/SearchBar";


const BookLists = () => {
  return (
    <div className="h-screen w-screen bg-white">
     <SearchBar/>
      <div className="h-full">
       <p className="text-2xl font-bold text-center mt-10 text-sky-900">Booklists Page</p>
        </div>
      </div>
    
  );
};

export default BookLists;