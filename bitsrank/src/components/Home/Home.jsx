import { useState, useEffect } from "react";
// import NavbarWithMegaMenu from "../Navbar";
import Herocontent from "/Hero_content.png";
import Businesspeople from "/businesspeople.png";
import { Button } from "@material-tailwind/react";
import B_logo from "/Frame.png";
import { NavbarDefault } from "../Nav_bar";
import Typewriter from "typewriter-effect";
const Home = () => {
  const [truncateString, settruncateString] = useState(
    "https://app.bitsrank.co/register"
  );

  const truncateDot = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      settruncateString(truncateString);
    }, 3000);

    return () => clearTimeout(delayDebounceFn); // Clean up the timer on every change
  }, [truncateString]);

  const handleCopy = () => {
    navigator.clipboard.writeText(truncateString);
  };


  

  // rendering the html 3 times as a card with animation
  const PulseCard = () => (
    <div className="border shadow rounded-md p-4 w-full mx-auto">
      <div className="animate-pulse flex items-center space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
    <NavbarDefault/>
      <div className="flex flex-wrap justify-center p-6 md:p-9 text-dimblack">
        <div className="flex flex-col justify-evenly w-full md:w-1/2">
          {/* Responsive heading */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold justify-center font-serif text-center md:text-left">
            Think beyond the <span className=" text-dimoran">link</span>
          </h1>
          {/* Responsive paragraph */}
          <p className="text-lg md:text-xl lg:text-2xl font-mono text-center md:text-left mt-4">
            Use our URL shortener, QR codes, and landing pages to engage your
            audience and track everything with the BitsRank Connections
            Platform.
          </p>
          {/* Responsive buttons */}
          <div className="flex flex-col md:flex-row justify-center md:justify-start mt-6 gap-4">
            <Button className="bg-dimblack text-white py-3 px-6 rounded-xl w-full md:w-auto">
              Get started for free
            </Button>
            <Button className="border bg-transparent border-dimblack text-dimblack py-3 px-6 rounded-xl w-full md:w-auto">
              Get a demo
            </Button>
          </div>
        </div>

        {/* Responsive Image */}
        <img
        loading="lazy"
          className="object-cover mt-6 md:mt-0 w-full md:w-1/2"
          src={Herocontent}
          alt=""
        />
      </div>

      <h1 className="flex flex-col flex-wrap items-center text-4xl md:text-6xl lg:text-5.5xl font-bold justify-center font-sans  text-center   ">
        <span className="supercharge_title p-1 w-max">Supercharge</span>
        Your URL Efficiency
      </h1>

      <div className="flex flex-wrap justify-center p-6 md:p-9 text-dimblack flex-row-reverse">
        <div className="flex flex-col justify-center ">
          <div className="flex justify-center flex-col  ">
            <form className="flex gap-5 w-full self-center px-3.5 py-3.5 text-lg leading-none whitespace-nowrap rounded-xl shadow-lg bg-white ">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc01893a8d7b996920eda9d39bd0e337605155d3fc04ad0c813dedce2be5cfe0?apiKey=c0bca91966db4095b1e1b5a08f720e3b&"
                className="object-contain shrink-0 aspect-[1.23] w-[27px]"
                alt=""
              />
              <input
                id="linkInput"
                type="url"
                onChange={(e) => settruncateString(e.target.value)}
                className="w-full sm:w-[268px] grow shrink my-auto bg-white   outline-none "
                placeholder="https://app.bitsrank.co/register"
                aria-label="Enter link to shorten"
                required
              />
              <button type="submit" aria-label="Shorten link">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8851d6d6fcef25b37e1888339cd74d0c2b94a831bba1e723b952fe74d7dc49c4?apiKey=c0bca91966db4095b1e1b5a08f720e3b&"
                  className="object-contain shrink-0  w-[22px]"
                  alt=""
                />
              </button>
            </form>

            <section className="w-full  flex gap-2.5 items-center self-center pl-1 mt-6  rounded-xl shadow-lg  bg-white justify-between">
              <div className="w-9 flex justify-center">
                <img
                  loading="lazy"
                  src={B_logo}
                  alt="Brand Logo"
                  className="w-7"
                />
              </div>
              <div className="flex flex-col self-stretch my-auto max-xxs:w-full">
                <div className="flex gap-1.5 items-center self-start">
                  <h2 className="grow flex w-32 md:w-44 max-xxs:w-20 self-stretch my-auto leading-none text-dimblack font-medium max-xxs:text-xs md:text-xl lg:text-5.5xl">
                    Bits.Rank/
                    <Typewriter
                      options={{
                        strings: [
                          "5dflb8v",
                          "B_Rank",
                          "SkyZon",
                          "Techix",
                          "CodeV",
                        ],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </h2>
                  <button aria-label="Copy link">
                    <img
                      onClick={handleCopy}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/25839eb2b339aea90e990234716b39fc23e1e100e9f9b28f50ab54fb37a53ad0?apiKey=c0bca91966db4095b1e1b5a08f720e3b&"
                      className="object-contain shrink-0 self-stretch aspect-square w-[25px]"
                      alt=""
                    />
                  </button>
                  <div className="flex gap-1.5 self-stretch px-0.5 py-1 my-auto text-xs leading-relaxed rounded-md border border-solid  border-neutral-600 border-opacity-10 bg-white text-black-10 text-opacity-80">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f291b7a08960f60af4781b57e70e3cefec24aff92082959888cbf8fbc7fb9a9a?apiKey=c0bca91966db4095b1e1b5a08f720e3b&"
                      className="object-contain shrink-0 self-start aspect-[1.57] w-[22px] max-xs:hidden"
                      alt=""
                    />
                    <span className="text-xs">1.1k clicks</span>
                  </div>
                </div>
                <div className="flex gap-1 mt-1.5 text-lg leading-none whitespace-nowrap text-neutral-600 text-opacity-40">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f24de01f1b5cccbc2dfdf39f5c424de9aa802f146df4f8d0cb0bb8c958f7135?apiKey=c0bca91966db4095b1e1b5a08f720e3b&"
                    className="object-contain shrink-0 aspect-square w-[22px]"
                    alt=""
                  />
                  <h2 className="grow self-stretch my-auto leading-none text-black-10 font-medium   md:text-xl lg:text-5.5xl">
                    {truncateString.length === 0
                      ? truncateDot("https://app.bitsrank.co/register", 20)
                      : truncateDot(truncateString, 20)}
                  </h2>
                </div>
              </div>
              <button aria-label="More options">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c25ee6d06673b47cd3d759be462ed9442cb06ae7abbde1dd021c4f4935a21b80?apiKey=c0bca91966db4095b1e1b5a08f720e3b&"
                  className="object-contain shrink-0 self-stretch aspect-[0.26] w-[21px]"
                  alt=""
                />
              </button>
            </section>
          </div>

          <section className="mt-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <section key={index} className="mt-4">
                <PulseCard />
              </section>
            ))}
          </section>

          <section className="self-center mt-4  bg-white px-3 py-3 w-full text-xs leading-4 rounded-xl shadow-lg  max-w-[403px] text-neutral-600 text-opacity-40 font-sans">
            Want to claim your links, edit them, or view their analytics?{" "}
            <a href="#" className="text-black font-bold underline">
              Create a free account
            </a>{" "}
            <span className="text-black">in BitsRank</span> to get started
          </section>
        </div>

        <img
          loading="lazy"
          className="object-cover mt-6 md:mt-0 w-full md:w-1/2"
          src={Businesspeople}
          alt=""
        />
      </div>
    </>
  );
};

export default Home;
