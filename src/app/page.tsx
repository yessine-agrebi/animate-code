"use client";
import Code from "@/components/Code";
import { useState } from "react";

export default function Home() {
  const firstPart = `
  const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {`;
  const second = ` 
    return (
      <div>

      `;

  const third = `
  
          <h2>{item.name}</h2>`;
  const fourth = `

          <p>Price: {item.price}</p>`;
  const fifth = `

          <p>Quantity: {item.quantity}</p>
      </div>
    );  
`;
  const [show, setShow] = useState(0);
  const atMax = show > 3;
  const restart = () => setShow(0);

  return (
    <div className="max-w-x2l h-[500px] bg-black mx-auto py-5 flex items-start justify-start">
      <button
        className="text-white bg-gray-700 p-2 rounded-md hover:bg-gray-600"
        onClick={() => (atMax ? restart() : setShow((prev) => prev + 1))}
      >
        {atMax ? "Restart" : "Show More"}
      </button>
      <div className="relative group">
        <Code code={firstPart} show={true} animated={true} />
        <Code code={second} show={show > 0} animated={true} />
        <Code code={third} show={show > 1} animated={true} />
        <Code code={fourth} show={show > 2} animated={true} />
        <Code code={fifth} show={show > 3} animated={true} />
      </div>
    </div>
  );
}
