"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import CodeBlock from "@/components/CodeBlock";

export default function Home() {
  const [slides, setSlides] = useState<string[]>([""]); // State to store the code
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // State to store the current slide index
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Ref for the textarea

  const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedSlides = [...slides]; // Copy the slides array
    updatedSlides[currentSlideIndex] = event.target.value; // Update the current slide with the edited code
    setSlides(updatedSlides); // Update the slides state
  };

  const handleKeyDown = () => {
    textareaRef.current?.focus(); // Focus on the hidden textarea
  };

  const handleNextSlide = () => {
    const updatedSlides = [...slides]; // Copy the slides array
    updatedSlides.push(updatedSlides[currentSlideIndex]); // Add the current slide to the slides array
    setSlides(updatedSlides); // Update the slides state
    console.log(updatedSlides);
    setCurrentSlideIndex(currentSlideIndex + 1); // Update the current slide index
  };

  const handlePreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      <div className="min-w-[60%] h-[500px] bg-black rounded-md mt-6 relative">
        {slides.map((slide, index) => (
          <textarea
            key={index}
            ref={index === currentSlideIndex ? textareaRef : null} // Set ref for the active textarea
            value={slide} // Value bound to the code state
            onChange={handleCodeChange} // Handle code changes
            onKeyDown={handleKeyDown} // Handle keydown events
            className="absolute top-0 left-0 opacity-0 w-full h-full bg-transparent z-10" // Show the textarea
            aria-hidden="false" // Hide the textarea from screen readers
          />
        ))}

        <CodeBlock code={slides[currentSlideIndex]} />
      </div>
      <div className="flex align-center gap-3">
      <button
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
      </button>
      </div>
      
    </div>
  );
}
