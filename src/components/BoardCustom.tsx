import { useState } from "react";
import styles from "./BoardCustom.module.css";
import Board from "./Board";
import type { Color, Stone } from "../types";

export default function BoardCustom() {
  // 사용자가 오목 판의 행렬 개수를 커스텀할 수 있도록 함
  // 기본 값은 렌주룰 15*15 적용
  const [rowCount, setRowCount] = useState(15);
  const [colCount, setColCount] = useState(15);
  // 현재 턴의 사용자 돌 색 표시
  const [turnUser, setTurnUSer] = useState<Color>("black");

  const handleTurnUser = () => {
    if (turnUser === "black") {
      setTurnUSer("white");
    } else {
      setTurnUSer("black");
    }
  };

  const [stones, setStones] = useState<Stone[]>([]);

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
        <button onClick={handleTurnUser}>턴 넘기기</button>
        <div>turn: {turnUser}</div>
      </div>
      <Board
        rowCount={rowCount}
        colCount={colCount}
        color={turnUser}
        stones={stones}
        setStones={setStones}
      />
    </>
  );
}

/**
 * stones={[
          {
            row: 0,
            col: 0,
            color: "black",
          },
          {
            row: 0,
            col: 1,
            color: "white",
          },
          {
            row: 1,
            col: 1,
            color: "black",
          },
        ]}
 */
