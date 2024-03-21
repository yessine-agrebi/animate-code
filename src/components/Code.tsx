import React, { FC, useEffect, useState } from 'react'
import  {Highlight, themes} from 'prism-react-renderer'

type CodeProps = {
    newTextToWrite?: string
    codeLast?: string
    animationDelay?: number
    animated?: boolean
    code: string
    show: boolean
    maxHeight?: number
}

const Code: FC<CodeProps> = ({
    code,
    show,
    animated,
    animationDelay,
    codeLast,
    newTextToWrite,
    maxHeight
}) => {
    const initialText = codeLast ? code + codeLast : code;
    const [text, setText] = useState(animated ? '' : initialText);
    useEffect(() => {
        if (show) {
        let i = 0;
        setTimeout(() => {
        const intervalId = setInterval(() => {
            setText(initialText.slice(0, i))
            i++
            if (i > initialText.length) {
            clearInterval(intervalId)
            }
        }, 30)
        return () => clearInterval(intervalId)
        },
        animationDelay ? animationDelay : 50)
    }
    }, [initialText, show])
    useEffect(() => {
        if (newTextToWrite) {
            let i = 0;
            setTimeout(() => {
                const intervalId = setInterval(() => {
                    if(codeLast){
                        setText(code + newTextToWrite.slice(0, i) + codeLast)
                    }else {
                        setText(code + newTextToWrite.slice(0, i))
                    
                    }
                    i++
                    if (i > newTextToWrite.length) {
                        clearInterval(intervalId)
                    }
                }, 50)
                return () => clearInterval(intervalId)
            }, 0)
        }
    }, [newTextToWrite])
    if(!show) return null
  return (
    <Highlight 
    theme={themes.nightOwl}
    code={text}
    language="tsx"
    >
        {({className, style, tokens, getLineProps, getTokenProps}) => (
            <pre
            className={className + ' transition-all duration-700 no-scrollbar'}
            style={{...style,
            background: 'transparent',
            paddingTop: 0,
            paddingBottom: 0,
            maxHeight: show ? (maxHeight ? maxHeight : 24) : 0,
            opacity: show ? 1 : 0,
            height: 'auto',
            width: 'fit-content',
            }}
            >
                {tokens.map((line, i) => (
                    <div
                    {...getLineProps({line})}
                    style={{position: 'relative'}}
                    key={i}
                    >    
                        {line.map((token, key) => (
                            <span key={key} {...getTokenProps({token})} />
                        ))}
                    </div>
                ))}
            </pre>
        )}
    </Highlight>
  )
}

export default Code