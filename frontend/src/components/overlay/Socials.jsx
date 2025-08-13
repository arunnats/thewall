import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

export default function Socials() {
  return (
    <div className="flex gap-2">
      <a
        href="https://instagram.com/arunnats/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="h-5 w-5 rounded-full bg-cyan-400 flex items-center justify-center text-white hover:opacity-80 transition"
      >
        <FaInstagram size={12} />
      </a>

      <a
        href="https://arunnats.substack.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="h-5 w-5 rounded-full bg-pink-400 flex items-center justify-center text-white hover:opacity-80 transition"
      >
        <SiSubstack size={10} />
      </a>

      <a
        href="https://github.com/arunnats/"
        target="_blank"
        rel="noopener noreferrer"
        className="h-5 w-5 rounded-full bg-yellow-400 flex items-center justify-center text-black hover:opacity-80 transition"
      >
        <FaGithub size={12} />
      </a>

      <a
        href="https://www.linkedin.com/in/arunnats/"
        target="_blank"
        rel="noopener noreferrer"
        className="h-5 w-5 rounded-full bg-black flex items-center justify-center text-white hover:opacity-80 transition"
      >
        <FaLinkedin size={12} />
      </a>
    </div>
  );
}
