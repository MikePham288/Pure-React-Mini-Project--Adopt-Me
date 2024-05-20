import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy, useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <div
      className="m-0 p-0"
      style={{
        background:
          "url('https://pets-images.dev-apis.com/pets/wallpaperA.jpg')",
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPet}>
            <Suspense
              fallback={
                <div className="flex items-center justify-center p-4">
                  <h2 className="animate-spin text-[100px]">🌀</h2>
                </div>
              }
            >
              <header className="mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center">
                <Link
                  className="text-6xl text-white hover:text-gray-200"
                  to="/"
                >
                  Adopt Me
                </Link>
              </header>
              {/* <div> */}
              {/* <h1>Adopt Me!</h1> */}
              <Routes>
                <Route path="/details/:id" element={<Details />}></Route>
                <Route path="/" element={<SearchParams />}></Route>
              </Routes>
            </Suspense>

            {/* <SearchParams></SearchParams> */}
            {/* <Pet name="Milo" animal="dog" breed="Husky"></Pet>
      <Pet name="Pepper" animal="dog" breed="Husky"></Pet>
      <Pet name="Doink" animal="cat" breed="CockMixedtiel"></Pet> */}
            {/* </div> */}
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // concurrency, used to be static mode & concurrent mode.
root.render(<App />);
// tree shaking - live code inclusion
