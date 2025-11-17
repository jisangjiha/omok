import { Fragment, type CSSProperties } from 'react';
import styles from './Board.module.css';

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
    </div>
  );
}
