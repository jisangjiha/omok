import { Fragment, type CSSProperties } from "react";
import styles from "./Board.module.css";
import type { Color, Stone } from "../types";

interface BoardProps {
  rowCount: number;
  colCount: number;
  rowSize?: number;
  colSize?: number;
  stones: Stone[];
  setStones: React.Dispatch<React.SetStateAction<Stone[]>>;
  color: Color;
}

export default function Board({
  rowCount, // 행 개수, BoardCustom에서 받아옴
  colCount, // 열 개수, BoardCustom에서 받아옴
  rowSize = 25, // 행 크기(px)
  colSize = 25, // 열 크기(px)
  stones,
  setStones,
  color,
}: BoardProps) {
  function addStone(rowIndex: number, colIndex: number, color: Color) {
    setStones((prev) => [...prev, { row: rowIndex, col: colIndex, color }]);
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
              onClick={() => addStone(rowIndex, colIndex, color)}
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
      {stones.map((stone, index) => (
        <div
          key={index}
          className={[
            styles.stone,
            stone.color === "black" ? styles.black : styles.white,
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
    </div>
  );
}
