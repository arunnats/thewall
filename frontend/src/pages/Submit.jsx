import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/card/Card";
import LongCard from "../components/card/LongCard";

export default function Submit() {
  const navigate = useNavigate();
  const [rec, setRec] = useState("");
  const [text, setText] = useState("");
  const date = new Date().toLocaleDateString();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 overflow-x-hidden">
      <button onClick={() => navigate("/")}>
        <img className="h-[15vh] md:h-[8vw] " src="/back.svg" alt="" />{" "}
      </button>
      {isMobile ? (
        <LongCard text={text} rec={rec} date={date} />
      ) : (
        <Card text={text} rec={rec} date={date} />
      )}{" "}
      <input
        type="text"
        placeholder="Recipient name"
        value={rec}
        maxLength={32}
        onChange={(e) => setRec(e.target.value)}
        className="border bg-orange-950 text-white border-gray-300 rounded p-2 w-80 md:w-full md:max-w-md font-googlesanscode"
      />
      <textarea
        placeholder="Your message (max 256 characters)"
        value={text}
        maxLength={256}
        onChange={(e) => setText(e.target.value)}
        className="border bg-orange-950 text-white border-gray-300 rounded p-2 w-80 md:w-full md:max-w-md h-60 md:h-32 resize-none font-googlesanscode"
      />
      <img className="h-[23vh] md:h-[15vw] " src="/disclaimer.svg" alt="" />{" "}
      <button onClick={() => navigate("/")}>
        {" "}
        <img
          className="h-[20vw] md:h-[8vw] mb-20"
          src="/submit.svg"
          alt=""
        />{" "}
      </button>
    </div>
  );
}
