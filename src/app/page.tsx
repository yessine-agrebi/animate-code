"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import CodeBlock from "@/components/CodeBlock";
import { MinusIcon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  VscAzure,
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscCircleFilled,
} from "react-icons/vsc";

export default function Home() {
  const [slides, setSlides] = useState<string[]>([
    `const sayHello () {}`,
    `const sayHello () {
  console.log('Hello World');
}`,
  ]); // State to store the code
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // State to store the current slide index
  const [textAreaClicked, setTextAreaClicked] = useState(false); // State to store the current slide index
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Ref for the textarea

  const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedSlides = [...slides]; // Copy the slides array
    updatedSlides[currentSlideIndex] = event.target.value; // Update the current slide with the new code
    setSlides(updatedSlides); // Update the slides state
  };

  const handleKeyDown = () => {
    textareaRef.current?.focus(); // Focus on the hidden textarea
  };

  const handleNewSlide = () => {
    setSlides([...slides, ""]); // Add a new empty slide to the slides array
    setCurrentSlideIndex(slides.length); // Update the current slide index to the new slide
  };
  const handleSetCurrentSlideIndex = (index: number) => {
    setCurrentSlideIndex(index); // Update the current slide index
  };
  const handleDeleteSlide = (index: number) => {
    const updatedSlides = slides.filter((_, i) => i !== index); // Filter out the slide to delete
    setSlides(updatedSlides); // Update the slides state
    setCurrentSlideIndex(updatedSlides.length); // Update the current slide index to the first slide
  };

  

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-2 bg-slate-800">
      <div className="min-w-[60%] h-[500px] bg-slate-950 rounded-lg mt-6 relative">
        <div className="w-full h-[50px] flex justify-between items-center px-4 text-lg text-gray-400">
          <VscAzure />
          <div className="flex gap-3 items-center">
            <VscCircleFilled color="blue" className="mt-1" />
            <p>index.tsx</p>
          </div>
          <div className="flex items-center gap-2">
            <VscChromeMinimize />
            <VscChromeMaximize />
            <VscChromeClose />
          </div>
        </div>
        <CodeEditor
          value={slides.length > 0 ? slides[currentSlideIndex] : ""}
          language="js"
          onChange={handleCodeChange}
          padding={15}
          style={{
            backgroundColor: "transparent",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            fontSize: "15px",
          }}
        />
      </div>
      <div className="min-w-[60%] h-[120px] bg-slate-950 rounded-md mt-6 relative flex items-center gap-2">
        <button onClick={handleNewSlide}>
          <PlusCircledIcon className="w-8 h-8 text-white ml-2" />
        </button>
        {slides.length > 0 &&
          slides.map((slide, index) => (
            <div
              key={index}
              className="w-[100px] h-[100px] bg-gray-900 rounded-lg text-[5px] hover:cursor-pointer relative"
              onClick={() => handleSetCurrentSlideIndex(index)}
            >
              <button
                className="flex items-center justify-center w-8 h-8 absolute top-0 right-0"
                onClick={(event) => {
                  event.stopPropagation(); // Prevent event from bubbling up
                  handleDeleteSlide(index);
                }}
              >
                <TrashIcon className="text-white text-lg w-6 h-5" />
              </button>
              <CodeEditor
                value={slide}
                language="tsx"
                style={{
                  backgroundColor: "transparent",
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  fontSize: "5px",
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              />
            </div>
          ))}
      </div>
      {/* <button
        onClick={handleNextSlide}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Next Slide
      </button>
      <button
        onClick={handlePreviousSlide}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Previous Slide
      </button> */}
    </div>
  );
}
