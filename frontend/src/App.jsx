import { useState, useEffect } from "react";
import Hero from "./components/hero/Hero";
import Card from "./components/card/Card";
import LongCard from "./components/card/LongCard";

const cardsData = [
  {
    text: "The golden light of the late afternoon sun spilled across the quiet street, painting long shadows that danced gently in the breeze. A cat lounged lazily on the warm stone wall, flicking its tail in half-hearted acknowledgment of a passing bird. The air was still except for the soft hum of distant voices. ",
    rec: "Arun",
    date: "08/08/25",
  },
  {
    text: "Beneath the sprawling oak, the grass shimmered with dew, each droplet catching the sun like a gem. The distant hum of bees merged with the rustle of leaves, weaving a melody only nature knew. A stream nearby whispered over stones, adding a cool, steady rhythm to the morning’s calm embrace.",
    rec: "Adil",
    date: "08/08/25",
  },
  {
    text: "Rain tapped gently on the windowpane, filling the air with the fresh scent of earth. A single candle flickered on the desk, casting soft light over pages that told stories of worlds far away. Outside, puddles reflected a cloudy sky as sparrows flitted between branches, shaking off the morning drizzle.",
    rec: "Adil",
    date: "08/08/25",
  },
  {
    text: "From the hilltop, the town below looked like a patchwork quilt, each roof glowing in the warm evening light. Somewhere a dog barked, and the faint sound of music drifted through the air.",
    rec: "Adil",
    date: "08/08/25",
  },
  {
    text: "Meow Meow Meow. A curious cat padded softly across the room, pausing only to bat at a dangling string before curling into a warm, sunny corner for a nap.",
    rec: "Adil",
    date: "08/08/25",
  },
];

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative h-screen w-screen">
      <Hero />
      <div className="flex flex-wrap justify-center w-full mx-auto mt-10 md:mt-3">
        {cardsData.map((card, index) =>
          isMobile ? (
            <LongCard
              key={index}
              text={card.text}
              rec={card.rec}
              date={card.date}
            />
          ) : (
            <Card
              key={index}
              text={card.text}
              rec={card.rec}
              date={card.date}
            />
          )
        )}
      </div>
    </div>
  );
}
