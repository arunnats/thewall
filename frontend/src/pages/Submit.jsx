import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/card/Card";
import LongCard from "../components/card/LongCard";

export default function Submit() {
  const navigate = useNavigate();
  const [rec, setRec] = useState("");
  const [text, setText] = useState("");
  const date = new Date().toISOString().split("T")[0];
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = async () => {
    if (!text.trim()) return alert("Message cannot be empty!");

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/thewall/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          recipient: rec,
          contents: text,
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          alert("Too many requests! Please slow down before posting again.");
        } else {
          const errData = await res.json();
          const errorMsg =
            errData.detail === "Duplicate content not allowed."
              ? "this exact message already exists bro"
              : errData.detail === "Message contains banned slurs."
              ? "gang pls no slurs."
              : errData.detail === "Profanity detected in content."
              ? "gang pls no bad words."
              : "Something went wrong, try again.";

          alert(errorMsg);
        }
      } else {
        alert("post is now on the wall");
        navigate("/");
      }
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Failed to submit post. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 overflow-x-hidden">
      <button onClick={() => navigate("/")}>
        <img className="h-[15vh] md:h-[8vw]" src="/back.svg" alt="back" />
      </button>

      {isMobile ? (
        <LongCard text={text} rec={rec} date={date} />
      ) : (
        <Card text={text} rec={rec} date={date} />
      )}

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

      <img
        className="h-[23vh] md:h-[15vw]"
        src="/disclaimer.svg"
        alt="disclaimer"
      />

      <button onClick={handleSubmit} disabled={loading}>
        <img
          className="h-[20vw] md:h-[8vw] mb-20"
          src="/submit.svg"
          alt="submit"
        />
      </button>
    </div>
  );
}
