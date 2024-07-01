"use client";

import { useRef, useState } from "react";

export default function HomePage() {
  const [result, setResult] = useState("");
  const [spinHistory, setSpinHistory] = useState<string[]>([]);

  const debounce = (fn: Function, ms: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
      console.log("asdd");
    };
  };

  const handleResult = (min: number, max: number) => {
    const spinResult = Math.floor(Math.random() * (max - min + 1)) + min;

    if (spinResult >= 96) {
      setResult("Dragon");
      setSpinHistory(["Dragon", ...spinHistory]);
    } else if (spinResult >= 80) {
      setResult("Rabbit");
      setSpinHistory(["Rabbit", ...spinHistory]);
    } else if (spinResult >= 40) {
      setResult("Dog");
      setSpinHistory(["Dog", ...spinHistory]);
    } else {
      setResult("Cat");
      setSpinHistory(["Cat", ...spinHistory]);
    }
  };

  return (
    <main className="mx-auto h-[100vh] max-w-screen-lg px-4 py-8">
      {/* title */}
      <div className="text-center text-4xl font-bold">Pets RNG game</div>

      {/* pets that can be earned */}
      <div className="mt-8 flex justify-around">
        <div className="flex flex-col gap-2 rounded-md border border-gray-300 p-4">
          <div className="font-semibold text-gray-300">Common</div>
          <div>Cat: 40%</div>
        </div>

        <div className="flex flex-col gap-2 rounded-md border border-gray-300 p-4">
          <div className="font-semibold text-gray-300">Common</div>
          <div>Dog: 40%</div>
        </div>

        <div className="flex flex-col gap-2 rounded-md border border-green-400 p-4">
          <div className="font-semibold text-green-400">Uncommon</div>
          <div>Rabbit: 16%</div>
        </div>

        <div className="flex flex-col gap-2 rounded-md border border-orange-400 p-4">
          <div className="font-semibold text-orange-400">Legendary</div>
          <div>Dragon: 4%</div>
        </div>
      </div>

      {/* spin */}
      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        <div className="text-2xl">
          Congratulations you got a <span className="font-bold">{result}</span>
        </div>
        <button
          type="button"
          className="flex rounded-md bg-white p-4 text-xl text-black"
          onClick={debounce(() => handleResult(1, 100), 1000)}
        >
          <div className="... mr-3 h-5 w-5 animate-spin">.</div>
          <div>Spin</div>
        </button>
      </div>

      {/* spin history */}
      <div className="mt-8">
        <div className="text-lg font-semibold">Spin History</div>

        <div className="flex flex-col gap-2">
          {spinHistory.map((spinHistory, spinHistoryIdx) => (
            <div key={spinHistoryIdx} className="border p-2 text-lg">
              {spinHistory}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
