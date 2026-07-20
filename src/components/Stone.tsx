import type { StoneType } from "../types";
import styles from "./Stone.module.css";

interface StoneProps {
  stones: StoneType[];
}

export default function Stone({ stones }: StoneProps) {
  return (
    <>
      {stones.map((stone, index) => (
        <div
          key={index}
          className={[
            styles.stone,
            stone.color === "black" ? styles.black : styles.white,
            // 마지막(가장 최근) 착수 강조
            index === stones.length - 1 ? styles.last : "",
          ].join(" ")}
          style={{
            gridArea: [
              stone.row + 1,
              stone.col + 1,
              stone.row + 2,
              stone.col + 2,
            ].join("/"),
          }}
        />
      ))}
    </>
  );
}
