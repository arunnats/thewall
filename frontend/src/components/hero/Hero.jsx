export default function Hero() {
  return (
    <div>
      <div className="relative pt-[3vh] items-center justify-center h-full flex flex-col">
        <h1 className="text-gray-700 text-[7rem] font-bold font-patrick drop-shadow-lg">
          the wall
        </h1>
        <a href="">
          <img
            className="h-[20vw] md:h-[6vw] mt-1"
            src="/submitButton.svg"
            alt=""
          />
        </a>
        <img
          className="absolute h-[15vh] md:h-[18vw] left-0 md:left-72 top-40 md:top-0 rotate-[6deg]"
          src="/gatto.svg"
          alt=""
        />

        <img
          className="absolute h-[14vh] md:h-[16vw] right-0 md:right-72 top-40 md:top-0 -scale-x-100 -rotate-[6deg]"
          src="/lady.svg"
          alt=""
        />

        <div className="absolute top-0 right-0 z-10 ">
          <img className="h-[15vh] md:h-[50vh]" src="topRight.svg" alt="" />{" "}
        </div>

        <div className="absolute top-0 left-0 z-10">
          <img className="h-[12vh] md:h-[40vh]" src="topLeft.svg" alt="" />{" "}
        </div>
      </div>
    </div>
  );
}
