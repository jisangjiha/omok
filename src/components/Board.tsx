import styles from "./Board.module.css";
import Rock from "./rock";

export default function Board() {
  return (
    <div className={styles.board}>
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={index} className={styles.grid}>
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className={styles.rockGrid}>
              {/*  <Rock />*/}
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
