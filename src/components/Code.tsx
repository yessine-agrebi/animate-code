import React, { FC, useEffect, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

type CodeProps = {
  newTextToWrite?: string;
  codeLast?: string;
  animationDelay?: number;
  animated?: boolean;
  code: string;
  show: boolean;
  maxHeight?: number;
  className?: string;
};

const Code: FC<CodeProps> = ({
  code,
  show,
  animated,
  animationDelay,
  codeLast,
  newTextToWrite,
  maxHeight,
  className,
}) => {
  return (
    
    <Highlight theme={themes.nightOwl} code={code} language="tsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div
          className={className + " transition-all duration-700 no-scrollbar"}
          style={{
            ...style,
            background: "transparent",
            paddingTop: 0,
            paddingBottom: 0,
            maxHeight: show ? (maxHeight ? maxHeight : 24) : 0,
            opacity: show ? 1 : 0,
            height: "auto",
            width: "fit-content",
          }}
        >
          {tokens.map((line, i) => (
            <div
              {...getLineProps({ line })}
              style={{ position: "relative" }}
              key={i}
            >
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
          
        </div>
      )}
    </Highlight>
  );
};

export default Code;
