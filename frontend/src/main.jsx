import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import "./index.css";
import App from "./App.jsx";
import Name from "./components/overlay/Name.jsx";
import Socials from "./components/overlay/Socials.jsx";
import Submit from "./pages/Submit.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div
      className="relative w-screen overflow-x-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url("/bg3.jpg")' }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/submit" element={<Submit />} />
        </Routes>
      </Router>

      <div className="fixed bottom-2 left-4 z-10">
        <Socials />
      </div>

      <div className="fixed bottom-1 right-4 z-10">
        <Name />
      </div>
    </div>
  </StrictMode>
);
