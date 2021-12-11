import React from "react";



function App() {
   

  return (
    <div className="game">
      <Board />
    </div>
  );
}

class Square extends React.Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.OnTurnChange(this.props.squareID); 
  }


  render(){
    return(
      <button className="square" onClick={this.handleClick}>
        {this.props.value}
      </button>
    )
  }
}



function WinScreen(props){
  return(
    <div className="winScreen">
      <p>{props.winner}</p>
      <button>Start Again</button>
    </div>
  )
}

class Board extends React.Component{
  constructor(props){
    super(props);

    this.state = {squares : Array(9).fill(" "), isPlayerTurn: true, winner: undefined};

    this.handleTurnChange = this.handleTurnChange.bind(this);
  } 

  getMoveCount(boardState){
    let moveCount = 0;

    for(let i = 0; i < boardState.length; i++){
      if(boardState[i] !== " "){
        moveCount++;
      } 
    }

    return moveCount;
  }

  handleTurnChange(squareID){

    if(this.state.squares[squareID] !== "X" && this.state.squares[squareID] !== "O"){
      const newSquaresArray = this.state.squares;
      
      if(this.state.isPlayerTurn){
        newSquaresArray[squareID] = "X";
      }else{
        newSquaresArray[squareID] = "O";
      }

      this.setState({squares: newSquaresArray});

      const winnerState = this.checkWinner(this.state.squares);
      this.setState({winner: winnerState});
      console.log(this.state.movesCompleted);

      const nextTurn = !this.state.isPlayerTurn;
      this.setState({isPlayerTurn: nextTurn});

      this.cpuMove();  
    }  
  }


  minimax(boardState, isCpuTurn){
    if(this.checkWinner(boardState) !== undefined){
      return this.score(boardState);
    }

    let possibleMoves = [];

    for(let i = 0; i < boardState.length; i++){
      if(boardState[i] === " "){
        possibleMoves.unshift(i);
      }
    }

    let scores = [];
    let moves = [];

    for(let i = 0; possibleMoves.length; i++){
      let newBoard = [];
      for(let i = 0; i < boardState.length; i++){
        newBoard[i] = boardState[i];
      }
      newBoard[possibleMoves[i]] = "O";
      
      scores.push(this.minimax(newBoard, !isCpuTurn));
      
      moves.push(possibleMoves[i]);
    }

    if(isCpuTurn){
      const maxScoreIndex = scores.indexOf(Math.max.apply(null, scores));
      let choice = moves[maxScoreIndex];
      return scores[maxScoreIndex];
    }
    else{
      const minScoreIndex = scores.indexOf(Math.min.apply(null, scores));
      let choice = moves[minScoreIndex];
      return scores[minScoreIndex];
    }

  }

  score(boardState){
    if(this.checkWinner(boardState) === "Player"){
      return -10;
    }
    else if(this.checkWinner(boardState) === "Cpu"){
      return 10;
    }
    else{
      return 0;
    }
  }

  cpuMove(){
    const isCpuTurn = true;
    this.minimax(this.state.squares, isCpuTurn);
  }

  checkWinner(boardState){                                  
    const winArrays = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let winner = undefined;

    for(let i = 0; i < winArrays.length; i++){
      let xCount = 0;
      let oCount = 0;
      for(let j = 0; j < winArrays[i].length; j++){
        if(boardState[winArrays[i][j]] === "X"){
          xCount++;
        }
        if(boardState[winArrays[i][j]] === "O"){
          oCount++;
        }
      }
      if(xCount === 3){
        winner = "Player";
        break;
      }
      if(oCount === 3){
        winner = "Cpu";
        break;
      }
    }

    if(this.getMoveCount(boardState) === 9 && winner === undefined){
      winner = "Draw";
    }


    //this.setState({winner});
    return winner;   //for other functions
  }

  

  render(){
    let currentTurn;
    let winScreen;

    if(this.state.isPlayerTurn){
      currentTurn = "Player Turn";
    }else{
      currentTurn = "CPU turn";
    }

    if(this.state.winner){
      winScreen = <WinScreen winner={this.state.winner}/>
    }


    return(                                                  
      <div>
        {winScreen}
        <div className="turn">
          <p>{currentTurn}</p>
        </div>
        <div className="gamegrid">
          <Square value={this.state.squares[0]} OnTurnChange={this.handleTurnChange} squareID={0}/>  
          <Square value={this.state.squares[1]} OnTurnChange={this.handleTurnChange} squareID={1}/>
          <Square value={this.state.squares[2]} OnTurnChange={this.handleTurnChange} squareID={2}/>
          <Square value={this.state.squares[3]} OnTurnChange={this.handleTurnChange} squareID={3}/>
          <Square value={this.state.squares[4]} OnTurnChange={this.handleTurnChange} squareID={4}/>
          <Square value={this.state.squares[5]} OnTurnChange={this.handleTurnChange} squareID={5}/>
          <Square value={this.state.squares[6]} OnTurnChange={this.handleTurnChange} squareID={6}/>
          <Square value={this.state.squares[7]} OnTurnChange={this.handleTurnChange} squareID={7}/>
          <Square value={this.state.squares[8]} OnTurnChange={this.handleTurnChange} squareID={8}/>
        </div>
      </div>
    )
  }
}

export default App;
