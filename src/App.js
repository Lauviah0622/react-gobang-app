import { useState, useEffect } from "react";

import styled from "styled-components";
import Game from "./Game/Game";

import GameContext from "./Context";

const COLUMNS = 19;
const ROWS = 19;

const AppWrapper = styled.div`
  margin: 50px auto;
  width: 600px;
`;

const Header = styled.header``;

const Footer = styled.footer``;

const createEmptyChart = () => Array(ROWS).fill(Array(COLUMNS).fill(null))

function App() {
  const [isGaming, setIsGaming] = useState(false);

  const [chessChart, setChessChart] = useState(createEmptyChart());

  const [winner, setWinner] = useState(null);

  const [playerState, setPlayerState] = useState({ current: "black", next: "white" });

  const placeChess = (x, y) => {
    if (!isGaming) return;
    const newChessChart = JSON.parse(JSON.stringify(chessChart));
    newChessChart[y][x] = playerState.current;
    setChessChart(newChessChart);
    setPlayerState({
      current: playerState.next,
      next: playerState.current,
    });
  };

  const startGame = () => {
    setIsGaming(true);
    setChessChart(createEmptyChart())
    setWinner(null)

  };

  const surrenderGame = () => {
    setWinner(playerState.next)
    setIsGaming(false);
    console.log(playerState.next);
  };

  const checkWin = () => {
    console.log(`========current: ${playerState.next}==========`);
    if (!isGaming) return;
    let chesses = [];
    chessChart.forEach((row, rowId) => {
      row.forEach((cell, columnId) => {
        if (cell !== playerState.next) return;
        chesses.push([columnId, rowId]);
      });
    });

    let isWin = false
    chesses.forEach((chess, i, chesses) => {
      console.log(`----chess ${i}-----`);
      const inChesses = ([x, y]) => {
        let res = false;
        chesses.forEach(chess => {
          if (chess[0] === x && chess[1] === y) res = true
        })
        return res
      };
      const dirs = [
        [1, 0],
        [0, 1],
        [1, 1],
        [-1, 1],
      ];

      let dirCells = dirs.map((dir) => ({
        rootChess: chess,
        dir,
        cell: [chess[0] + dir[0], chess[1] + dir[1]],
      }));

      for (let i = 0; i < 4; i++) {
        console.log('dirCells', dirCells);
        let linkChesses = dirCells.filter((cell) => inChesses(cell.cell));
        console.log('linkChesses', linkChesses);
        let nextDirCells = linkChesses.map(({ rootchess, dir, cell }) => ({
          rootChess: cell,
          dir,
          cell: [cell[0] + dir[0], cell[1] + dir[1]],
        }));
        dirCells = nextDirCells
        console.log('nextDirCells', nextDirCells);
        if (nextDirCells.length <= 0) break
      }

      if (dirCells.length > 0) {
        isWin = true
      }
    });
    if (isWin) {
      setIsGaming(false)
      setWinner(playerState.next)
    }
  };

  return (
    <GameContext.Provider value={{ rowsNum: ROWS, columnsNum: COLUMNS }}>
      <AppWrapper>
        <Header>
          {isGaming || <h3>Press Start to Start Game</h3>}
          {isGaming && (
            <h3>
              Current Player: {playerState.current}, Next Player:{" "}
              {playerState.next}
            </h3>
          )}
          <h3>{winner || 'No body'} is win</h3>
        </Header>
        <Game
          placeChess={placeChess}
          chessChart={chessChart}
          checkWin={checkWin}
        />
        <Footer>
          {isGaming || <button onClick={startGame}>Start</button>}
          {isGaming && <button onClick={surrenderGame}>Surrender</button>}
        </Footer>
      </AppWrapper>
    </GameContext.Provider>
  );
}

export default App;

/* 
Header: next Player, 
Main


*/
