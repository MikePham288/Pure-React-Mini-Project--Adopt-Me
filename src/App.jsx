import { createRoot } from "react-dom";
import Pet from "./Pet";

const App = () => {
  <div>
    <h1>Adopt Me!</h1>
    <Pet name="Milo" animal="dog" breed="Husky"></Pet>
    <Pet name="Pepper" animal="dog" breed="Husky"></Pet>
    <Pet name="Doink" animal="cat" breed="CockMixedtiel"></Pet>
  </div>;
};

const container = document.getElementById("root");
const root = createRoot(container); // concurrency, used to be static mode & concurrent mode.
root.render(<App />);
// tree shaking - live code inclusion
