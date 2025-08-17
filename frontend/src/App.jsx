import { useState, useEffect, useRef } from "react";
import Hero from "./components/hero/Hero";
import Card from "./components/card/Card";
import LongCard from "./components/card/LongCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { newtonsCradle } from "ldrs";

newtonsCradle.register();

export default function App() {
  const [cardsData, setCardsData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const offsetRef = useRef(0);
  const fetchedOffsetsRef = useRef(new Set()); 
  const isFillingGapsRef = useRef(false);
  const limit = 5000;

  const checkForMissingIds = (cards) => {
    if (cards.length === 0) return [];

    const ids = cards.map((c) => c.id).sort((a, b) => a - b);
    const minId = ids[0];
    const maxId = ids[ids.length - 1];
    const missingIds = [];

    for (let i = minId; i <= maxId; i++) {
      if (!ids.includes(i)) {
        missingIds.push(i);
      }
    }

    return missingIds;
  };

  const fillMissingIds = async (missingIds) => {
    if (missingIds.length === 0 || isFillingGapsRef.current) return;

    isFillingGapsRef.current = true;
    console.log("Filling missing IDs:", missingIds);

    try {
      const uniqueOffsets = new Set();
      missingIds.forEach((id) => {
        const approximateOffset = Math.max(
          0,
          Math.floor((id - 1) / limit) * limit
        );
        uniqueOffsets.add(approximateOffset);
      });

      for (const offset of uniqueOffsets) {
        if (!fetchedOffsetsRef.current.has(offset)) {
          await fetchSpecificOffset(offset);
          fetchedOffsetsRef.current.add(offset);
        }
      }
    } catch (err) {
      console.error("Error filling missing IDs:", err);
    } finally {
      isFillingGapsRef.current = false;
    }
  };

  const fetchSpecificOffset = async (specificOffset) => {
    try {
      console.log(`Fetching specific offset: ${specificOffset}`);
      const res = await fetch(
        `http://127.0.0.1:8000/thewall/?limit=${limit}&offset=${specificOffset}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.items && Array.isArray(data.items)) {
        const formatted = data.items.map((item) => ({
          id: item.id,
          text: item.contents,
          rec: item.recipient,
          date: item.date,
        }));

        if (formatted.length > 0) {
          setCardsData((prev) => {
            const cardsById = new Map();
            prev.forEach((card) => cardsById.set(card.id, card));
            formatted.forEach((card) => cardsById.set(card.id, card));
            return Array.from(cardsById.values()).sort((a, b) => b.id - a.id);
          });
        }
      }
    } catch (err) {
      console.error(`Error fetching offset ${specificOffset}:`, err);
    }
  };

  const fetchPosts = async () => {
    if (loading) return;

    console.log("Fetching posts with offset:", offsetRef.current);
    setLoading(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/thewall/?limit=${limit}&offset=${offsetRef.current}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Fetched data:", data);

      if (!data.items || !Array.isArray(data.items)) {
        console.error("Invalid data structure:", data);
        setLoading(false);
        return;
      }

      const formatted = data.items.map((item) => ({
        id: item.id,
        text: item.contents,
        rec: item.recipient,
        date: item.date,
      }));

      console.log("Formatted items:", formatted.length);

      if (formatted.length > 0) {
        setCardsData((prev) => {
          const cardsById = new Map();
          prev.forEach((card) => cardsById.set(card.id, card));
          formatted.forEach((card) => cardsById.set(card.id, card));
          const newCards = Array.from(cardsById.values()).sort(
            (a, b) => b.id - a.id
          );

          setTimeout(() => {
            const missingIds = checkForMissingIds(newCards);
            if (missingIds.length > 0) {
              console.log("Found missing IDs:", missingIds);
              fillMissingIds(missingIds);
            }
          }, 100);

          return newCards;
        });

        fetchedOffsetsRef.current.add(offsetRef.current);
        offsetRef.current += limit;
      }

      setHasMore(data.has_more === true && formatted.length > 0);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (cardsData.length === 0) return;

      const missingIds = checkForMissingIds(cardsData);
      if (missingIds.length > 0) {
        console.log("Auto-check found missing IDs:", missingIds);
        fillMissingIds(missingIds);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [cardsData]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sortedCards = [...cardsData].sort((a, b) => b.id - a.id);

  return (
    <div className="App">
      <Hero />

      <InfiniteScroll
        dataLength={cardsData.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center py-6">
            <l-newtons-cradle
              size="40"
              speed="1.4"
              color="#133A5A"
            ></l-newtons-cradle>
          </div>
        }
        endMessage={
          <p className="text-center py-4 font-semibold">
            you've reached the end of the wall
          </p>
        }
        scrollThreshold={0.8}
      >
        <div className="flex flex-wrap justify-center w-full mx-auto mt-10 md:mt-3">
          {sortedCards.map((card) =>
            isMobile ? (
              <LongCard
                id={card.id}
                text={card.text}
                rec={
                  card.rec && card.rec.trim() !== "" ? card.rec : "anonymous"
                }
                date={card.date}
              />
            ) : (
              <Card
                id={card.id}
                text={card.text}
                rec={
                  card.rec && card.rec.trim() !== "" ? card.rec : "anonymous"
                }
                date={card.date}
              />
            )
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}
