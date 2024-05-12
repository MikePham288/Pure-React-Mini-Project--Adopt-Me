import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Details from "./Details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <header>
          <Link to="/">Adopt Me</Link>
        </header>
        {/* <div> */}
        {/* <h1>Adopt Me!</h1> */}
        <Routes>
          <Route path="/details/:id" element={<Details />}></Route>
          <Route path="/" element={<SearchParams />}></Route>
        </Routes>
        {/* <SearchParams></SearchParams> */}
        {/* <Pet name="Milo" animal="dog" breed="Husky"></Pet>
      <Pet name="Pepper" animal="dog" breed="Husky"></Pet>
      <Pet name="Doink" animal="cat" breed="CockMixedtiel"></Pet> */}
        {/* </div> */}
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // concurrency, used to be static mode & concurrent mode.
root.render(<App />);
// tree shaking - live code inclusion