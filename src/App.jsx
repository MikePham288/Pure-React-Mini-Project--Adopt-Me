import React from "react";
import { createRoot } from "react-dom";

const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ]);
};

const App = () => {
  return React.createElement(
    "div",
    {}, // handle attributes here
    [
      React.createElement("h1", {}, "Adopt Me!"),
      React.createElement(Pet, { name: "Milo", animal: "dog", breed: "Husky" }),
      React.createElement(Pet, {
        name: "Pepper",
        animal: "bird",
        breed: "Cockatiel",
      }),
      React.createElement(Pet, {
        name: "Doink",
        animal: "cat",
        breed: "Mixed",
      }),
    ]
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // concurrency, used to be static mode & concurrent mode.
root.render(React.createElement(App));
// tree shaking - live code inclusion
