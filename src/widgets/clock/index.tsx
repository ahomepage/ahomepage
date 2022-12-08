import { useState } from "react";

interface Props {
  x: number;
  y: number;
  w: number;
  h: number;
}

const Time = ({ x, y, w, h }: Props) => {
  const addZero = (n: string | number): string => {
    return +n >= 10 ? String(n) : `0${n}`;
  };

  const getTime = () => {
    const date = new Date();
    return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`
    
  };

  const [time, setTime] = useState(getTime());

  requestAnimationFrame(() => setTime(getTime()));
  return (
    <div
      style={{
        height: "100%",
        color: "#daf6ff",
        textShadow: "0 0 20px #0aafe6",

        fontFamily: "'Share Tech Mono', monospace",
        fontSize: `${48 * Math.min(h, w)}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // letterSpacing: "0.05em",
      }}
    >
      <span>{time}</span>
    </div>
  );
};

Time.minW = 2;
Time.minH = 2;
Time.maxW = 6;

export default Time;
