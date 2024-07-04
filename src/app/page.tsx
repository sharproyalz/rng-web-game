"use client";

import { useRef, useState } from "react";

export default function HomePage() {
  const [result, setResult] = useState("");
  const [petInventory, setPetInventory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    const specialTrait = Math.floor(Math.random() * (max - min)) + min;

    let newResult = "";
    if (spinResult >= 96) {
      newResult = "Dragon";
    } else if (spinResult >= 80) {
      newResult = "Rabbit";
    } else if (spinResult >= 40) {
      newResult = "Dog";
    } else {
      newResult = "Cat";
    }

    if (specialTrait === 1) newResult = "Special " + newResult;
    // Update state with the new result
    setResult(newResult);
    setPetInventory((prevHistory) => [newResult, ...prevHistory]);
  };

  function getRandomString() {
    // types of different greetings
    const typesOfGreetings = [
      <>
        Congrats, you've welcomed a{" "}
        <span
          className={`${result === "Dog" || result === "Cat" ? "text-common" : result === "Rabbit" ? "text-uncommon" : result === "Dragon" ? "text-legendary" : ""} font-bold`}
        >
          {result}
        </span>
        !
      </>,
      <>
        Amazing, a{" "}
        <span
          className={`${result === "Dog" || result === "Cat" ? "text-common" : result === "Rabbit" ? "text-uncommon" : result === "Dragon" ? "text-legendary" : ""} font-bold`}
        >
          {result}
        </span>{" "}
        is now yours!
      </>,
      <>
        Bravo, a{" "}
        <span
          className={`${result === "Dog" || result === "Cat" ? "text-common" : result === "Rabbit" ? "text-uncommon" : result === "Dragon" ? "text-legendary" : ""} font-bold`}
        >
          {result}
        </span>{" "}
        is yours!
      </>,
      <>
        Hello, a{" "}
        <span
          className={`${result === "Dog" || result === "Cat" ? "text-common" : result === "Rabbit" ? "text-uncommon" : result === "Dragon" ? "text-legendary" : ""} font-bold`}
        >
          {result}
        </span>{" "}
        is now with you!
      </>,
      <>
        Good for you, you've got a{" "}
        <span
          className={`${result === "Dog" || result === "Cat" ? "text-common" : result === "Rabbit" ? "text-uncommon" : result === "Dragon" ? "text-legendary" : ""} font-bold`}
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
      return "Spinning...";
    }
  }

  return (
    <main className="mx-auto h-[100vh] max-w-screen-lg px-4 py-8">
      {/* title */}
      <div className="text-center text-4xl font-bold">Pets RNG game</div>

      {/* pets that can be earned */}
      <div className="mt-8 flex justify-around">
        <div className="flex flex-col gap-2 rounded-md border border-common p-4">
          <div className="font-semibold text-common">Common</div>
          <div>Cat: 40%</div>
        </div>

        <div className="flex flex-col gap-2 rounded-md border border-common p-4">
          <div className="font-semibold text-common">Common</div>
          <div>Dog: 40%</div>
        </div>

        <div className="flex flex-col gap-2 rounded-md border border-uncommon p-4">
          <div className="font-semibold text-uncommon">Uncommon</div>
          <div>Rabbit: 16%</div>
        </div>

        <div className="flex flex-col gap-2 rounded-md border border-legendary p-4">
          <div className="font-semibold text-legendary">Legendary</div>
          <div>Dragon: 4%</div>
        </div>
      </div>

      {/* spin */}
      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        {result ? (
          <div className="text-2xl">{getRandomString()}</div>
        ) : (
          <div className="text-2xl">Click "Spin" to get your awesome pet</div>
        )}
        <button
          type="button"
          className={`flex h-12 w-32 items-center justify-center rounded-full text-xl text-black ${isLoading ? "bg-gray-400" : "bg-white"} `}
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
            <div>Spin</div>
          )}
        </button>
      </div>

      {/* Pet Inventory */}
      <div className="mt-8">
        <div className="text-lg font-semibold">Pet Inventory</div>

        <div className="grid grid-cols-4 gap-2">
          {petInventory.map((pet, petIdx) => (
            <div
              key={petIdx}
              className={`${
                pet.includes("Dog") || pet.includes("Cat")
                  ? "border-common"
                  : pet.includes("Rabbit")
                    ? "border-uncommon"
                    : pet.includes("Dragon")
                      ? "border-legendary"
                      : ""
              } col-span-1 border p-2 text-lg`}
            >
              <div
                className={`${pet.includes("Special") ? "font-bold italic" : ""} text-center`}
              >
                {pet}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
