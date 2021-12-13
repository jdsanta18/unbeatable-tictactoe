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

  function startAgain(){
    window.location.reload();
  }
  return(
    <div className="winScreen fade-in">
      <p>{props.winner}</p>
      <button onClick={startAgain}>Start Again</button>
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

      let winnerState = this.checkWinner(this.state.squares);
      this.setState({winner: winnerState});

      let nextTurn = !this.state.isPlayerTurn;
      this.setState({isPlayerTurn: nextTurn});

      this.cpuMove();
    }  
  }


  minimax(boardState, isCpuTurn, choice){
    if(this.checkWinner(boardState) !== undefined){
      return this.score(boardState);
    }

    let possibleMoves = [];

    for(let i = 0; i < boardState.length; i++){
      if(boardState[i] === " "){
        possibleMoves.push(i);
      }
    }

    let scores = [];
    let moves = [];


    for(let i = 0; i < possibleMoves.length; i++){
      let tempBoard = Array.from(boardState);
      
      if(isCpuTurn){
        tempBoard[possibleMoves[i]] = "O";
      }
      else{
        tempBoard[possibleMoves[i]] = "X";
      }

      scores.push(this.minimax(tempBoard, !isCpuTurn, choice));
      
      moves.push(possibleMoves[i]);
    }

    if(isCpuTurn){
      const maxScoreIndex = scores.indexOf(Math.max.apply(null, scores));
      let choice = moves[maxScoreIndex];
      let newBoard = Array.from(boardState);                              //Have to improve this segment
      newBoard[choice] = "O";
      this.setState({squares: newBoard}, () => this.setState({isPlayerTurn: true, winner: this.checkWinner(this.state.squares)}));
      return scores[maxScoreIndex];
    }
    else{
      const minScoreIndex = scores.indexOf(Math.min.apply(null, scores));
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
    //setTimeout(() => {this.minimax(this.state.squares, isCpuTurn)}, 1000);
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

    return winner;   //for other functions
  }

  /*sleep(milliseconds){
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }*/

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
