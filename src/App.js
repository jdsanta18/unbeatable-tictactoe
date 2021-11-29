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

    this.state = {squares : Array(9).fill(" "), isPlayerTurn: true, playerWon: false, cpuWon: false, isDraw: false};

    this.handleTurnChange = this.handleTurnChange.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
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
      this.checkWinner();

      const nextTurn = !this.state.isPlayerTurn;
      this.setState({isPlayerTurn: nextTurn});  
    }  
  }

  checkWinner(){                                  

    const winArrays = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let movesCompleted = 0;

    for(let i = 0; i < winArrays.length; i++){
      let xCount = 0;
      let oCount = 0;
      for(let j = 0; j < winArrays[i].length; j++){
        //console.log(winArrays[i][j]);
        if(this.state.squares[winArrays[i][j]] === "X"){
          console.log("one x added");
          xCount++;
        }
        if(this.state.squares[winArrays[i][j]] === "O"){
          oCount++;
        }
      }
      if(xCount === 3){
        this.setState({playerWon: true});
        break;
      }
      if(oCount === 3){
        this.setState({cpuWon: true});
        break;
      }
    }

    for(let i = 0; i < this.state.squares.length; i++){
      if(this.state.squares[i] !== " "){
        movesCompleted++;
      }
    }

    if(movesCompleted === 9 && (!this.state.playerWon && !this.state.cpuWon)){
      this.setState({isDraw: true});
    }
  }

  

  render(){
    let currentTurn;
    let winScreen;

    if(this.state.isPlayerTurn){
      currentTurn = "Player Turn";
    }else{
      currentTurn = "CPU turn";
    }

    if(this.state.playerWon){
      winScreen = <WinScreen winner={"Player Won!"} />
    }
    if(this.state.cpuWon){
      winScreen = <WinScreen winner={"CPU won!"} />
    }
    if(this.state.isDraw){
      winScreen = <WinScreen winner={"It´s a draw"} />
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
