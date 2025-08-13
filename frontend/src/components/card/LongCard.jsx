export default function LongCard({ text, rec, date }) {
  return (
    <div className="relative w-[49vw] mb-4">
      <img src="longcard.svg" className="w-full" alt="" />

      <div className="absolute top-4">
        <span className="px-3 py-1 text-lg font-bold font-patrick">
          To, {rec}
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-3 text-md leading-relaxed font-patrick overflow-x-hidden">
          <span>{text}</span>
        </div>
      </div>

      <div className="absolute bottom-10 right-2">
        <span className="px-3 py-1 text-sm font-patrick">{date}</span>
      </div>
    </div>
  );
}
