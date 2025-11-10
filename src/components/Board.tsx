import type { CSSProperties } from "react";
import styles from "./Board.module.css";

interface BoardProps {
  rowCount: number;
  colCount: number;
  rowSize?: number;
  colSize?: number;
}

export default function Board({
  rowCount,
  colCount,
  rowSize = 25,
  colSize = 25,
}: BoardProps) {
  return (
    <div
      className={styles.board}
      style={
        {
          "--col-count": colCount,
          "--row-size": `${rowSize}px`,
          "--col-size": `${colSize}px`,
        } as CSSProperties
      }
    >
      {Array.from({ length: rowCount }).map((_, index) => (
        <div key={index} className={styles.grid}>
          {Array.from({ length: colCount }).map((_, index) => (
            <div key={index} className={styles.rockGrid}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}></div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
