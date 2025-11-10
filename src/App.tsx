import "./App.css";
import BoardCustom from "./components/BoardCustom";
import Board from "./components/Board";

function App() {
  return (
    <>
      <BoardCustom />
      <Board rowCount={0} colCount={0} />
    </>
  );
}

export default App;
