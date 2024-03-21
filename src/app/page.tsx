'use client';
import Code from "@/components/Code";
import { useState } from "react";

export default function Home() {
  const firstPart = `import Person from "./Person";
  
  const name = "John Doe";
  const age = 30;
`
  const [show, setShow] = useState(0);
  const atMax = show > 2;
  const restart = () => setShow(0);
  
  return (
    <div className="max-w-lg bg-black mx-auto py-20 flex flex-col gap-20 items-start">
      <button
      className="text-white bg-gray-700 p-2 rounded-md hover:bg-gray-600"
      onClick={() => (atMax ? restart() : setShow((prev) => prev + 1))}
      >
        {atMax ? "Restart" : "Show More"}
      </button>
      <div className="relative group">
        <Code code={firstPart} show={true} maxHeight={100} newTextToWrite="" />
      </div>

    </div>
  );
}
