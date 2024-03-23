"use client";
import React, { ChangeEvent, useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
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

  const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedSlides = [...slides]; // Copy the slides array
    updatedSlides[currentSlideIndex] = event.target.value; // Update the current slide with the new code
    setSlides(updatedSlides); // Update the slides state
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
    <div className="w-full h-screen flex flex-col items-center justify-center bg-slate-800 gap-12">
      <div className="min-w-[60%] h-1/2">
        <div className="w-full h-[50px] bg-[#161b22] flex justify-between items-center px-4 text-lg text-gray-400 rounded-t-lg">
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
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            fontSize: "15px",
          }}
          data-color-mode="dark"
          className="w-full h-full rounded-b-lg"
        />
      </div>
      <div className="min-w-[60%] h-1/4 bg-[#161b22] rounded-md mt-6 relative flex items-center gap-2">
        <button onClick={handleNewSlide}>
          <PlusCircledIcon className="w-8 h-8 text-white ml-2" />
        </button>
        {slides.length > 0 &&
          slides.map((slide, index) => (
            <div
              key={index}
              className="w-[100px] h-[100px] rounded-lg hover:cursor-pointer relative"
              onClick={() => handleSetCurrentSlideIndex(index)}
            >
              <button
                className="flex items-center justify-center w-8 h-8 absolute top-0 right-0 z-10"
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
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  fontSize: "5px",
                  pointerEvents: "none",
                }}
                data-color-mode="dark"
                className="w-full h-full rounded-lg border-2 border-gray-100"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
