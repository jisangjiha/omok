import { useState } from "react";
import styles from "./BoardCustom.module.css";
import Board from "./Board";

export default function BoardCustom() {
  const [rowSize, setRowSize] = useState(15);
  const [columnSize, setColumnSize] = useState(15);
  const [turnUser, setTurnUSer] = useState("흑");

  const handleTurnUser = () => {
    if (turnUser === "흑") {
      setTurnUSer("백");
    } else {
      setTurnUSer("흑");
    }
  };

  return (
    <>
      <div className={styles.info}>
        <div className={styles.boardCustom}>
          <input
            className={styles.inputBox}
            value={rowSize}
            onChange={(e) => {
              setRowSize(Number(e.target.value));
            }}
          />
          <div>x</div>
          <input
            className={styles.inputBox}
            value={columnSize}
            onChange={(e) => {
              setColumnSize(Number(e.target.value));
            }}
          />
        </div>
        <button onClick={handleTurnUser}>돌 놓기</button>
        <div>turn: {turnUser}</div>
      </div>
      <Board rowCount={rowSize} colCount={columnSize} />
    </>
  );
}
