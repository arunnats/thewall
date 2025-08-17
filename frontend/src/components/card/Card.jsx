export default function Card({ id, text, rec, date }) {
  return (
    <div className="relative w-[25vw]">
      <img src="card3.svg" className="w-full" alt="" />

      <div className="absolute top-16 left-3">
        <span className="px-3 py-1 text-lg font-bold font-patrick">
          To, {rec}
        </span>
      </div>

      <div className="absolute top-16 right-3">
        <span className="px-3 py-1 text-lg font-bold font-patrick">#{id}</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-6 text-md leading-relaxed font-patrick overflow-x-hidden">
          <span>{text}</span>
        </div>
      </div>

      <div className="absolute bottom-16 right-3">
        <span className="px-3 py-1 text-sm font-patrick">{date}</span>
      </div>
    </div>
  );
}
