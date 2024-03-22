"use client";
import React, { FC } from "react";
import { Highlight, themes } from "prism-react-renderer";
type CodeProps = {
    code: string;
  };

const CodeBlock: FC<CodeProps> = ({code}) => {

  return (
      <Highlight theme={themes.nightOwl} code={code} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className + " transition-all duration-700 no-scrollbar"}
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
  );
}

export default CodeBlock;
