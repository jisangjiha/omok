import styles from "./Stone.module.css";

interface StoneProps {
  stoneColor: string;
  rowIndex: number;
  colIndex: number;
}

export default function Stone({ stoneColor, rowIndex, colIndex }: StoneProps) {
  return (
    <>
      <div
        className={[
          styles.stone,
          stoneColor === "black" ? styles.black : styles.white,
        ].join(" ")}
        style={{
          gridArea: [
            rowIndex + 1,
            colIndex + 1,
            rowIndex + 2,
            colIndex + 2,
          ].join("/"),
        }}
      />
    </>
  );
}
