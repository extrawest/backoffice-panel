import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/open-sans";
import "@fontsource/roboto";
import "@fontsource/mulish";
import App from "./app/app";
import "./styles.scss";

const root = createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
