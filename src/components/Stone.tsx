import type { StoneType } from "../types";
import styles from "./Stone.module.css";

interface StoneProps {
  stones: StoneType[];
}

export default function Stone({ stones }: StoneProps) {
  function hasStone() {
    alert("The stone has already been laid");
  }

  return (
    <>
      {stones.map((stone, index) => (
        <div
          key={index}
          className={[
            styles.stone,
            stone.color === "black" ? styles.black : styles.white,
          ].join(" ")}
          onClick={() => hasStone()}
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
