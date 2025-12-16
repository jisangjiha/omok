import { Fragment, type CSSProperties } from "react";
import Stone from "./Stone";
import type { ColorType, StoneType } from "../types";
import styles from "./Board.module.css";

// 해야 할 일
// 놓여진 위치에 또 놓을때 불가하도록

interface BoardProps {
  rowCount: number;
  colCount: number;
  rowSize?: number;
  colSize?: number;
  stones: StoneType[];
  setStones: React.Dispatch<React.SetStateAction<StoneType[]>>;
  stoneColor: ColorType;
  setStoneColor: React.Dispatch<React.SetStateAction<ColorType>>;
}

export default function Board({
  rowCount, // 행 개수, BoardCustom에서 받아옴
  colCount, // 열 개수, BoardCustom에서 받아옴
  rowSize = 25, // 행 크기(px)
  colSize = 25, // 열 크기(px)
  stones,
  setStones,
  stoneColor,
  setStoneColor,
}: BoardProps) {
  const changeStoneColor = () => {
    if (stoneColor === "black") {
      setStoneColor("white");
    } else {
      setStoneColor("black");
    }
  };

  function playStone(rowIndex: number, colIndex: number) {
    const isDuplicate = stones.some(
      (s) => s.row === rowIndex && s.col === colIndex
    );

    if (isDuplicate) {
      alert("The stone has already been laid");
      return;
    }

    // 방금 놓은 돌은 다음 턴에서 stones에 추가되는 점..
    setStones((prev) => [
      ...prev,
      { row: rowIndex, col: colIndex, color: stoneColor },
    ]);

    changeStoneColor();

    if (
      win(rowIndex, colIndex, binaryBoard[rowIndex][colIndex], binaryBoard) ===
      0
    ) {
      alert("winner is black");
    } else {
      alert("winner is white");
    }
  }

  // 2로 채워지는 보드판
  let binaryBoard = Array.from({ length: rowCount }, () =>
    Array.from({ length: colCount }, () => 2)
  );

  // 흑0, 백1로 보드판 변경
  for (let i = 0; i < stones.length; i++) {
    if (stones[i].color === "black") {
      binaryBoard[stones[i].row][stones[i].col] = 0;
    } else if (stones[i].color === "white") {
      binaryBoard[stones[i].row][stones[i].col] = 1;
    }
  }

  function win(
    x: number,
    y: number,
    binaryBoardColor: number,
    binaryBoard: number[][]
  ) {
    let count = 0;

    const dx = [-1, 1, 0, 0, -1, -1, 1, 1];
    const dy = [0, 0, -1, 1, -1, 1, -1, 1];

    for (let i = 0; i < 8; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      let newBinaryBoardColor = binaryBoard[nx][ny];

      if (
        newBinaryBoardColor === binaryBoardColor &&
        nx >= 0 &&
        nx < rowCount &&
        ny >= 0 &&
        ny < colCount
      ) {
        win(nx, ny, newBinaryBoardColor, binaryBoard);
        count++;
      }
    }

    if (count === 5) {
      return binaryBoardColor;
    }
  }

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
      {/** 행, 열 개수만큼 오목판 생성 */}
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <Fragment key={rowIndex}>
          {Array.from({ length: colCount }).map((_, colIndex) => (
            <div
              key={colIndex}
              className={styles.rockGrid}
              onClick={() => playStone(rowIndex, colIndex)}
              // CSS Grid에서 칸이 배치될 위치를 grid로 지정
              style={{
                gridArea: [
                  rowIndex + 1,
                  colIndex + 1,
                  rowIndex + 2,
                  colIndex + 2,
                ].join("/"),
              }}
            >
              {/** 돌은 선 내부가 아닌 선 위에 위치하기 때문에 임의로 한 칸을 네 개로 나눠 실질적인 오목판 그림 */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}></div>
              ))}
            </div>
          ))}
        </Fragment>
      ))}
      <Stone stones={stones} />
    </div>
  );
}
