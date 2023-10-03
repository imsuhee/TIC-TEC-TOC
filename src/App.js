import { useState } from "react";
import "./App.css"
import Board from "./components/Board";

function App() {
  //게임 기록 및 상태 초기화
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [isComputerTurn, setIsComputerTurn] = useState(false); // 컴퓨터의 턴 여부 추가

  //승자 계산
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] === "X" ? "User" : "Computer";
      }
    }
    //무승부 체크
    if (squares.every((square) => square !== null)) {
      return "Draw";
    }
    return null;
  };

  //현재 게임 상태
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  //게임 상태에 따른 메세지 호출 설정
  let status;
  if (winner) {
    if (winner === "Draw") {
      status = "무승부입니다.";
    } else {
      status = `승자는 ${winner}님 입니다.`;
    }
  } else {
    status = `다음 차례 : ${xIsNext ? 'User' : 'Computer'}`;
  }


  //플레이어 또는 컴퓨터가 클릭했을 때 동작처리
  const handleClick = (i) => {

    if (isComputerTurn || calculateWinner(current.squares) || current.squares[i]) {
      // 컴퓨터 턴이거나 이미 승자가 결정되었거나 해당 위치에 이미 값이 있는 경우 처리하지 않음
      return;
    }
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();

    // 클릭한 위치에 'X' 또는 'O' 추가
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, { squares: newSquares }]);
    setXIsNext(prev => !prev);
    setIsComputerTurn(true); // 컴퓨터의 턴 시작


    setStepNumber(newHistory.length);
  }

  const moves = history.map((_, move) => (
    <li key={move}>
      {move === 0 ? (
        <button className="move-button" onClick={() => jumpTo(move)}>
          게임 시작
        </button>
      ) : null}
    </li>
  ));

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
    setIsComputerTurn(false); // 플레이어의 턴으로 변경
  }

  // 컴퓨터의 턴인 경우 랜덤한 위치에 1초 후 'O' 놓기
  if (isComputerTurn && !winner) {
    setTimeout(() => {
      const computerMove = getRandomEmptySquare(current.squares);
      if (computerMove !== null) {
        const newSquares = current.squares.slice();
        newSquares[computerMove] = 'O';
        setHistory([...history, { squares: newSquares }]);
        setXIsNext(true);
        setIsComputerTurn(false);
        setStepNumber(history.length);
      }
    }, 1000); // 컴퓨터의 행동을 지연시키기 위한 타임아웃 추가
  }

  // 빈 공간 중 랜덤한 위치 찾기 함수
  const getRandomEmptySquare = (squares) => {
    const emptySquares = [];
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        emptySquares.push(i);
      }
    }
    if (emptySquares.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
  };


  return (
    <div className="game">
      <h1 className="name">TIC! TEC! TOC! </h1>

      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className='status'>{status}</div>
        <ol style={{ listStyle: 'none' }}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;