"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function HomePage() {
  const [result, setResult] = useState("");
  const [petInventory, setPetInventory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [increaseChance, setIncreaseChance] = useState(0);
  const [rarityChance, setRarityChance] = useState({
    Cat: 35,
    Dog: 35,
    Rabbit: 20,
    Tiger: 8,
    Dragon: 2,
    Special: 1,
  });

  const debounce = (fn: Function, ms: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: any, ...args: any[]) {
      setIsLoading(true); // set loading to true
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsLoading(false);
        return fn.apply(this, args);
      }, ms);
    };
  };

  // Here is the function for getting a pet
  const handleResult = (min: number, max: number) => {
    const spinResult = Math.floor(Math.random() * (max - min + 1)) + min;
    const specialTrait = Math.floor(Math.random() * (max - min + 1)) + min;
    let incrementChance = increaseChance + 1;
    setIncreaseChance(incrementChance);

    // Double the chance of getting higher rarity
    if (incrementChance === 5) {
      setRarityChance({
        Cat: 20,
        Dog: 20,
        Rabbit: 40,
        Tiger: 16,
        Dragon: 4,
        Special: 2,
      });
    } else {
      if (incrementChance > 5) {
        setIncreaseChance(0);
      }
      setRarityChance({
        Cat: 35,
        Dog: 35,
        Rabbit: 20,
        Tiger: 8,
        Dragon: 2,
        Special: 1,
      });
    }

    let newResult = "";
    let rarityDiff = 0;
    if (spinResult >= (rarityDiff = 100 - rarityChance["Dragon"])) {
      newResult = "Dragon";
    } else if (
      spinResult >= (rarityDiff = rarityDiff - rarityChance["Tiger"])
    ) {
      newResult = "Tiger";
    } else if (
      spinResult >= (rarityDiff = rarityDiff - rarityChance["Rabbit"])
    ) {
      newResult = "Rabbit";
    } else if (spinResult >= (rarityDiff = rarityDiff - rarityChance["Dog"])) {
      newResult = "Dog";
    } else {
      newResult = "Cat";
    }

    if (specialTrait === rarityChance["Special"])
      newResult = "Special " + newResult;

    // Update state with the new result
    setResult(newResult);
    setPetInventory((prevHistory) => [newResult, ...prevHistory]);
  };

  function getRandomString() {
    // types of different greetings
    const typesOfGreetings = [
      <>
        Congrats, you&apos;ve welcomed a{" "}
        <span
          className={`${result.includes("Dog") || result.includes("Cat") ? "text-common" : result.includes("Rabbit") ? "text-uncommon" : result.includes("Tiger") ? "text-epic" : result.includes("Dragon") ? "text-legendary" : ""} font-bold`}
        >
          {result}
        </span>
        !
      </>,
      <>
        Amazing, a{" "}
        <span
          className={`${result.includes("Dog") || result.includes("Cat") ? "text-common" : result.includes("Rabbit") ? "text-uncommon" : result.includes("Tiger") ? "text-epic" : result.includes("Dragon") ? "text-legendary" : ""} font-bold`}
        >
          {result}
        </span>{" "}
        is now yours!
      </>,
      <>
        Bravo, a{" "}
        <span
          className={`${result.includes("Dog") || result.includes("Cat") ? "text-common" : result.includes("Rabbit") ? "text-uncommon" : result.includes("Tiger") ? "text-epic" : result.includes("Dragon") ? "text-legendary" : ""} font-bold`}
        >
          {result}
        </span>{" "}
        is yours!
      </>,
      <>
        Hello, a{" "}
        <span
          className={`${result.includes("Dog") || result.includes("Cat") ? "text-common" : result.includes("Rabbit") ? "text-uncommon" : result.includes("Tiger") ? "text-epic" : result.includes("Dragon") ? "text-legendary" : ""} font-bold`}
        >
          {result}
        </span>{" "}
        is now with you!
      </>,
      <>
        Good for you, you&apos;ve got a{" "}
        <span
          className={`${result.includes("Dog") || result.includes("Cat") ? "text-common" : result.includes("Rabbit") ? "text-uncommon" : result.includes("Tiger") ? "text-epic" : result.includes("Dragon") ? "text-legendary" : ""} font-bold`}
        >
          {result}
        </span>
        !
      </>,
    ];

    // Generate a random index based on the length of the array
    const randomIndex = Math.floor(Math.random() * typesOfGreetings.length);

    // Return the string at the random index
    if (!isLoading) {
      return typesOfGreetings[randomIndex];
    } else {
      return "Hatching...";
    }
  }

  return (
    // container
    <main className="mx-auto min-h-[100vh] max-w-screen-lg px-4 py-4">
      {/* title */}
      <div className="text-center text-4xl font-bold">Pets RNG game</div>

      {/* pets that can be earned */}
      <div className="mt-8 grid grid-cols-2 gap-2 rounded-lg border-2 border-black bg-white p-2 md:grid-cols-5">
        <div
          className={`col-span-1 flex flex-col items-center gap-2 rounded-md border p-4 text-black ${result.includes("Cat") ? "border-common" : "border-transparent"}`}
        >
          <div className="font-semibold text-common">Common</div>
          <div>Cat: {rarityChance["Cat"]}%</div>
        </div>

        <div
          className={`col-span-1 flex flex-col items-center gap-2 rounded-md border p-4 text-black ${result.includes("Dog") ? "border-common" : "border-transparent"}`}
        >
          <div className="font-semibold text-common">Common</div>
          <div>Dog: {rarityChance["Dog"]}%</div>
        </div>

        <div
          className={`col-span-1 flex flex-col items-center gap-2 rounded-md border p-4 text-black ${result.includes("Rabbit") ? "border-uncommon" : "border-transparent"}`}
        >
          <div className="font-semibold text-uncommon">Uncommon</div>
          <div>Rabbit: {rarityChance["Rabbit"]}%</div>
        </div>

        <div
          className={`col-span-1 flex flex-col items-center gap-2 rounded-md border p-4 text-black ${result.includes("Epic") ? "border-epic" : "border-transparent"}`}
        >
          <div className="font-semibold text-epic">Epic</div>
          <div>Tiger: {rarityChance["Tiger"]}%</div>
        </div>

        <div
          className={`col-span-1 flex flex-col items-center gap-2 rounded-md border p-4 text-black ${result.includes("Dragon") ? "border-legendary" : "border-transparent"}`}
        >
          <div className="font-semibold text-legendary">Legendary</div>
          <div>Dragon: {rarityChance["Dragon"]}%</div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-2">
        {/* Quest */}
        <div className="order-2 col-span-1 rounded-lg border-2 border-black bg-white p-2 text-black md:order-1">
          <div className="text-lg">Quest</div>
          <div className="mt-2">
            <div>
              Hatch 100 eggs.{" "}
              {petInventory.length === 100 ? (
                <span className="text-common">Completed</span>
              ) : (
                `(${petInventory.length}/100)`
              )}
            </div>
            <div>
              Hatch 4 Dragons.{" "}
              {petInventory.filter((pet) => pet === "Dragon").length === 4 ? (
                <span className="text-common">Completed</span>
              ) : (
                `(${petInventory.filter((pet) => pet === "Dragon").length}/4) `
              )}
            </div>
            <div>
              Hatch a Special Pet.{" "}
              {petInventory.filter((pet) => pet.includes("Special")).length ===
              1 ? (
                <span className="text-common">Completed</span>
              ) : (
                `(${petInventory.filter((pet) => pet.includes("Special")).length}/1) `
              )}
            </div>
          </div>
        </div>
        {/* hatch */}
        <div className="order-1 col-span-1 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-black bg-white p-2 md:order-2">
          {result ? (
            <div className="text-center text-lg text-black md:text-2xl">
              {getRandomString()}
            </div>
          ) : (
            <div className="text-center text-lg text-black md:text-2xl">
              Click &quot;Hatch&quot; to get your awesome pet
            </div>
          )}
          <button
            type="button"
            className={`flex h-12 w-32 items-center justify-center rounded-full border-2 border-black text-black md:h-12 md:w-32 md:text-xl ${isLoading ? "bg-gray-400" : "bg-white"} `}
            onClick={debounce(() => handleResult(1, 100), 500)}
            disabled={isLoading}
          >
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline h-8 w-8 animate-spin fill-black/60 text-black/20 dark:fill-black/30 dark:text-black/60"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div>Hatch</div>
            )}
          </button>

          {/* Lucky boost */}
          {increaseChance === 5 ? (
            <div className="text-xs font-light text-black">
              Your next hatch is{" "}
              <span className="font-semibold uppercase">doubled</span> your
              luck.
            </div>
          ) : (
            <div className="text-xs font-light text-black">
              Hatch <span className="font-semibold">{5 - increaseChance}</span>{" "}
              more to double your luck.
            </div>
          )}
        </div>
      </div>

      {/* Pet Inventory */}
      <div className="relative mt-8 h-48 overflow-auto rounded-lg border-2 border-black bg-white px-2 pb-2">
        <div className="sticky top-0 flex w-full justify-between bg-white p-2 text-lg font-semibold text-black">
          <div className="">Pet Inventory</div>
          <div className="">
            {petInventory.length}
            <span className="font-light"> pet(s)</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          {petInventory.length ? (
            petInventory.map((pet, petIdx) => (
              <div
                key={petIdx}
                className={`${
                  pet.includes("Dog") || pet.includes("Cat")
                    ? "text-common"
                    : pet.includes("Rabbit")
                      ? "text-uncommon"
                      : pet.includes("Tiger")
                        ? "text-epic"
                        : pet.includes("Dragon")
                          ? "text-legendary"
                          : ""
                } col-span-1 rounded-full border border-black p-2 text-lg text-black`}
              >
                <div
                  className={`${pet.includes("Special") ? "font-bold italic" : ""} text-center`}
                >
                  {pet}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center font-light text-black">
              Your pet inventory is empty.
            </div>
          )}
        </div>
      </div>

      <Image
        id="small-cloud"
        src={"/cloud.webp"}
        alt="Pixel Cloud"
        height={100}
        width={100}
        className="absolute right-0 top-12 -z-10 md:top-2"
      />

      <Image
        id="big-cloud"
        src={"/cloud.webp"}
        alt="Pixel Cloud"
        height={160}
        width={160}
        className="absolute top-12 -z-10 md:top-2"
      />

      <footer className="mt-2 text-center text-xs">
        Developed by Vonn, 2024
      </footer>
    </main>
  );
}
