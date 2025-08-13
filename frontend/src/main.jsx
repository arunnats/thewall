import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Name from "./components/overlay/Name.jsx";
import Socials from "./components/overlay/Socials.jsx";
import Submit from "./pages/Submit.jsx";
import { newtonsCradle } from "ldrs";
newtonsCradle.register();

function RootApp() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preload background image
    const img = new Image();
    img.src = "/bg3.jpg";
    img.onload = () => {
      // Small delay to make loader visible
      setTimeout(() => setLoading(false), 800);
    };
  }, []);

  return (
    <div
      className="relative w-screen min-h-screen overflow-x-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url("/bg3.jpg")' }}
    >
      <div
        className={`fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-1000 ${
          loading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <l-newtons-cradle
          size="78"
          speed="1.4"
          color="black"
        ></l-newtons-cradle>
      </div>

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
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootApp />
  </StrictMode>
);
