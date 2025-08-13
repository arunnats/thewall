import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Name from "./components/overlay/Name.jsx";
import Socials from "./components/overlay/Socials.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div
      className="relative w-screen overflow-x-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url("/bg3.jpg")' }}
    >
      <App />

      <div className="fixed bottom-2 left-4 z-10">
        <Socials />
      </div>

      <div className="fixed bottom-1 right-4 z-10">
        <Name />
      </div>
    </div>
  </StrictMode>
);
