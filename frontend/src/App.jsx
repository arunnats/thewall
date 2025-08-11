import Hero from "./components/hero/Hero";

export default function App() {
  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/bg1.jpg")' }}
    >
      <div className="absolute inset-0 bg-black/5"></div>

      <Hero />
    </div>
  );
}
