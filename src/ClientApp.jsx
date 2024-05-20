const { hydrateRoot } = require("react-dom/client");
const { BrowserRouter } = require("react-router-dom");
const { default: App } = require("./App");

hydrateRoot(
  document.getElementById("root"),
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
