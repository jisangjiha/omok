import { Fragment, type CSSProperties } from 'react';
import styles from './Board.module.css';
import type { Color } from '../types';

interface BoardProps {
  rowCount: number;
  colCount: number;
  rowSize?: number;
  colSize?: number;
  stones: Array<{ row: number; col: number; color: Color }>;
}

export default function Board({
  rowCount,
  colCount,
  rowSize = 25,
  colSize = 25,
  stones,
}: BoardProps) {
  const addStone = (rowIndex: number, colIndex: number) => {
    console.log(`row: ${rowIndex}, col: ${colIndex}`);
  };

  return (
    <div
      className={styles.board}
      style={
        {
          '--col-count': colCount,
          '--row-size': `${rowSize}px`,
          '--col-size': `${colSize}px`,
        } as CSSProperties
      }
    >
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <Fragment key={rowIndex}>
          {Array.from({ length: colCount }).map((_, colIndex) => (
            <div
              key={colIndex}
              className={styles.rockGrid}
              onClick={() => addStone(rowIndex, colIndex)}
              style={{
                gridArea: [
                  rowIndex + 1,
                  colIndex + 1,
                  rowIndex + 2,
                  colIndex + 2,
                ].join('/'),
              }}
            >
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
            stone.color === 'black' ? styles.black : styles.white,
          ].join(' ')}
          style={{
            gridArea: [
              stone.row + 1,
              stone.col + 1,
              stone.row + 2,
              stone.col + 2,
            ].join('/'),
          }}
        />
      ))}
    </div>
  );
}
