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

    if (checkWin(rowIndex, colIndex, stoneColor)) {
      if (stoneColor === "black") {
        setTimeout(() => {
          alert("winner is black");
          setStones([]);
          setStoneColor("black");
        }, 0);
      } else {
        setTimeout(() => {
          alert("winner is white");
          setStones([]);
          setStoneColor("black");
        }, 0);
      }
    }
  }

  const coloredBoard = Array.from({ length: rowCount + 1 }, () =>
    Array.from({ length: colCount }, () => "")
  );

  for (let i = 0; i < stones.length; i++) {
    if (stones[i].color === "black") {
      coloredBoard[stones[i].row][stones[i].col] = "black";
    } else if (stones[i].color === "white") {
      coloredBoard[stones[i].row][stones[i].col] = "white";
    }
  }

  function checkWin(x: number, y: number, stoneColor: ColorType) {
    const dx = [0, 1, 1, 1]; // 가로, 세로, 상승대각선, 하강대각선
    const dy = [1, 0, 1, -1]; // (어차피 좌우=가로, 상하=세로 ...이므로 방향만 지정)

    for (let dir = 0; dir < 4; dir++) {
      let count = 1; // 돌 한 개부터 카운팅

      // 방금 놓은 돌 기준 모든 방향의 4개 확인
      for (const sign of [1, -1]) {
        for (let i = 1; i < 5; i++) {
          const nx = x + dx[dir] * i * sign;
          const ny = y + dy[dir] * i * sign;

          if (
            nx < 0 ||
            nx >= rowSize ||
            ny < 0 ||
            ny >= colSize ||
            coloredBoard[nx][ny] !== stoneColor
          ) {
            break;
          }
          count++;
        }
      }

      if (count >= 5) {
        return true;
      }
    }

    return false;
  }

  // 렌주룰에서 백과 다르게 흑은 3-3, 4-4, 장목 금지
  // function checkBlack() {}

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
