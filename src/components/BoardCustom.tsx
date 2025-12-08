import { useState } from "react";
import Board from "./Board";
import type { StoneType } from "../types";
import styles from "./BoardCustom.module.css";

export default function BoardCustom() {
  // 사용자가 오목 판의 행렬 개수를 커스텀할 수 있도록 함
  // 기본 값은 렌주룰 15*15 적용
  const [rowCount, setRowCount] = useState(15);
  const [colCount, setColCount] = useState(15);

  const [stones, setStones] = useState<StoneType[]>([]);
  const [turn, setTurn] = useState("black");

  return (
    <>
      <div className={styles.info}>
        <div className={styles.boardCustom}>
          <input
            className={styles.inputBox}
            value={rowCount}
            onChange={(e) => {
              setRowCount(Number(e.target.value));
            }}
          />
          <div>x</div>
          <input
            className={styles.inputBox}
            value={colCount}
            onChange={(e) => {
              setColCount(Number(e.target.value));
            }}
          />
        </div>
        <div>turn: {turn}</div>
      </div>
      <Board
        rowCount={rowCount}
        colCount={colCount}
        stones={stones}
        setStones={setStones}
        setTurn={setTurn}
      />
    </>
  );
}
