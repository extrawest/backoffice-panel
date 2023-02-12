import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/open-sans";
import "@fontsource/roboto";
import "@fontsource/mulish";
import "semantic-ui-css/semantic.min.css";
import App from "./app/app";

const root = createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
