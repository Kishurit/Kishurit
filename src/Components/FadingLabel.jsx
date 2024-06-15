import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledLabel = styled.h1`
  opacity: ${(props) => props.opacity};
  transition: opacity ${(props) => props.fadeDuration}s ease-out;
  font-weight: bold;
  background-color: red;
  width: 100;
`;

const FadeOutLabel = ({ text, fadeDuration }) => {
  const [opacity, setOpacity] = useState(1);
  const [duration, setDuration] = useState(fadeDuration);
  const op = 1 / fadeDuration;

  useEffect(() => {
    const fadeTimer = setInterval(() => {
      setOpacity((prevOpacity) => prevOpacity - op);
      if (duration === 0) clearInterval(fadeTimer);
      setDuration((prevDuration) => prevDuration - 1);
    }, 1000);

    return () => {
      clearInterval(fadeTimer);
    };
  }, [duration, op]);

  if (duration <= 0) return <></>;
  else return <StyledLabel opacity={opacity}>{text}</StyledLabel>;
};

export default FadeOutLabel;
