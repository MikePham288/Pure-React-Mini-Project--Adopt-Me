import renderApp from "./dist/server/ServerApp.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;

// Write some method that calls that api every five minutes and cache the results

const html = fs
  .readFileSync(path.resolve(__dirname, "./dist/client/index.html"))
  .toString();

const parts = html.split("not rendered");

const app = express();
app.use(
  "/assets",
  express.static(path.resolve(__dirname, "./dist/client/assets"))
);

app.use((req, res) => {
  res.write(parts[0]);

  const stream = renderApp(req.url, {
    onShellReady() {
      // if it' is a crawler do nothing here
      stream.pipe(res);
    },
    onShellError() {
      // do error handling here
    },

    onAllReady() {
      //last thing to write
      // if it is the crawler
      // stream.pipe(res);
      res.write(parts[1]);
      res.end();
    },
    onError(err) {
      console.error(err);
    },
  });
});

console.log(`listening on http://localhost:${PORT}`);

app.listen(PORT);
