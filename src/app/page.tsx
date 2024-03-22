"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import { Highlight, themes } from "prism-react-renderer";

export default function Home() {
  const [code, setCode] = useState(""); // State to store the code
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Ref for the textarea

  // Function to handle changes in the textarea
  const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value); // Save the edited code to state
  };

  // Function to focus on the hidden textarea when a key is pressed
  const handleKeyDown = () => {
    textareaRef.current?.focus(); // Focus on the hidden textarea
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      <div className="min-w-[60%] h-[500px] bg-black rounded-md mt-6 relative">
        <textarea
          ref={textareaRef} // Set ref for the textarea
          value={code} // Value bound to the code state
          onChange={handleCodeChange} // Handle code changes
          onKeyDown={handleKeyDown} // Handle keydown events
          className="absolute top-0 left-0 opacity-0 w-full h-full resize-none bg-black z-10"
          aria-hidden="false" // Hide the textarea from screen readers
        />
        <Highlight theme={themes.nightOwl} code={code} language="jsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={
                className + " transition-all duration-700 no-scrollbar"
              }
              style={{
                ...style,
                background: "transparent",
                padding: "0.5rem",
                width: "100%",
                minHeight: "300px", // Set your desired minimum height
              }}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line })} key={i}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
