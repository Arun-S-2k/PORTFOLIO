import React, { useState, useEffect } from 'react';

const Tagline = () => {
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const part1Text = "Qualitative Insights";
  const part2Text = "Meets";
  const part3Text = "Quantitative Evidence";

  const totalLength = part1Text.length + part2Text.length + part3Text.length;

  useEffect(() => {
    // Wait for the existing page loading animation to complete
    const initialDelay = setTimeout(() => {
      setIsTyping(true);
    }, 1500); // Adjust this delay to match your page's load animation duration
    
    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (isTyping && charIndex < totalLength) {
      const typingTimer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 50); // Natural typing speed
      return () => clearTimeout(typingTimer);
    } else if (charIndex >= totalLength) {
      setIsTyping(false);
    }
  }, [isTyping, charIndex, totalLength]);

  // Determine what string content should be in each span based on charIndex
  const p1 = part1Text.slice(0, Math.min(charIndex, part1Text.length));
  
  const p2Length = Math.max(0, Math.min(charIndex - part1Text.length, part2Text.length));
  const p2 = part2Text.slice(0, p2Length);
  
  const p3Length = Math.max(0, charIndex - part1Text.length - part2Text.length);
  const p3 = part3Text.slice(0, p3Length);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Intel+One+Mono:wght@400;700&display=swap');

          .tagline-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            align-content: center;
            padding: 0px;
            gap: 16px;
            width: 980px;
            height: 26px;
          }

          .tagline-part1 {
            width: 250px;
            height: 26px;
            font-family: 'Intel One Mono', monospace;
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 25px;
            display: flex;
            align-items: center;
            text-align: center;
            letter-spacing: 0.08em;
            color: #232E35;
          }

          .tagline-part2 {
            width: 55px;
            height: 23px;
            font-family: 'Intel One Mono', monospace;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            display: flex;
            align-items: center;
            text-align: center;
            letter-spacing: 0.08em;
            color: #232E35;
          }

          .tagline-part3 {
            width: 261px;
            height: 26px;
            font-family: 'Intel One Mono', monospace;
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 25px;
            display: flex;
            align-items: center;
            text-align: center;
            letter-spacing: 0.08em;
            color: #232E35;
            white-space: pre-wrap;
          }

          .cursor {
            animation: blink 1s step-end infinite;
          }

          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>

      <div className="tagline-container">
        <span className="tagline-part1">{p1}</span>
        <span className="tagline-part2">{p2}</span>
        <span className="tagline-part3">
          {p3}
          {charIndex >= totalLength && <span className="cursor">|</span>}
        </span>
      </div>
    </>
  );
};

export default Tagline;
