import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "tailwindcss/tailwind.css";
import "@fontsource/open-sans";
import "@fontsource/roboto";
import "@fontsource/mulish";
import App from "./app/app";

const root = createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
