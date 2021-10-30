import React from "react";



function App() {
   

  return (
    <div className="App">
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

class Board extends React.Component{
  constructor(props){
    super(props);

    this.state = {squares : Array(9).fill(" "), isPlayerTurn: true};

    this.handleTurnChange = this.handleTurnChange.bind(this);
  } 


  handleTurnChange(squareID){
    const newSquaresArray = this.state.squares;

    if(this.state.isPlayerTurn){
      newSquaresArray[squareID] = "X";
    }else{
      newSquaresArray[squareID] = "O";
    }

    this.setState({squares: newSquaresArray});

    const nextTurn = !this.state.isPlayerTurn;
    this.setState({isPlayerTurn: nextTurn});  
  }

  render(){
    let currentTurn;

    if(this.state.isPlayerTurn){
      currentTurn = "Player Turn";
    }else{
      currentTurn = "CPU turn";
    }

    return(                                                   //TODO: must lift the the state up for OnValueChange
      <div>
        <div className="turn">
          <p>{currentTurn}</p>
        </div>
        <div className="tictactoe-row">
          <Square value={this.state.squares[0]} OnTurnChange={this.handleTurnChange} squareID={0} />  
          <Square value={this.state.squares[1]} OnTurnChange={this.handleTurnChange} squareID={1}/>
          <Square value={this.state.squares[2]} OnTurnChange={this.handleTurnChange} squareID={2}/>
        </div>
        <div className="tictactoe-row">
          <Square value={this.state.squares[3]} OnTurnChange={this.handleTurnChange} squareID={3}/>
          <Square value={this.state.squares[4]} OnTurnChange={this.handleTurnChange} squareID={4}/>
          <Square value={this.state.squares[5]} OnTurnChange={this.handleTurnChange} squareID={5}/>
        </div>
        <div className="tictactoe-row">
          <Square value={this.state.squares[6]} OnTurnChange={this.handleTurnChange} squareID={6}/>
          <Square value={this.state.squares[7]} OnTurnChange={this.handleTurnChange} squareID={7}/>
          <Square value={this.state.squares[8]} OnTurnChange={this.handleTurnChange} squareID={8}/>
        </div>
      </div>
    )
  }
}

export default App;
