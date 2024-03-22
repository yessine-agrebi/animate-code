"use client";
import Code from "@/components/Code";
import { useState } from "react";

export default function Home() {
  const [show, setShow] = useState(0);
  const atMax = show > 4;
  const restart = () => setShow(0);
  const [code, setCode] = useState("");
  const firstPart = `const UserProfile: React.FC<UserProfile> = ({ user }) => {`;
  const second = ` 
    return (
      <div>

      `;

  const third = `
  
          <h2>{user.name}</h2>`;
  const fourth = `

          <p>Bio: {user.bio}</p>`;
  const fifth = `

          <p>Followers: {user.followers}</p>
      </div>
    );  
`;
  

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
    <div className="w-[80%] h-[500px] bg-black rounded-md mt-6">
      <div className="relative group mx-4 py-3">
        <Code code={firstPart} show={show > 0} animated={true} />
        <Code code={second} show={show > 1} animated={true} />
        <Code code={third} show={show > 2} animated={true} />
        <Code code={fourth} show={show > 3} animated={true} />
        <Code code={fifth} show={show > 4} animated={true} />
      </div>
    </div>
    <button
    className="text-white bg-gray-700 p-2 rounded-md hover:bg-gray-600"
    onClick={() => (atMax ? restart() : setShow((prev) => prev + 1))}
  >
    {atMax ? "Restart" : (show === 0 ? "Start" : "Next")}
  </button>
  </div>
  );
}
