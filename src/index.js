import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



// function Operators(props) {
//   return (
//     <button onClick={()=>{alert("joe")}}>
//       {props.value}
//     </button>
//   )
// }


function Btn(props) {
  return (
    <button 
      onClick={props.onClick}>
      {props.value}
    </button>
  )
}


class Keyboard extends React.Component {
  renderButton(i) {
    return (
      <Btn 
        value={i}
        onClick={() => this.props.onClick(String(i))}/>
    )
  }

  clearButton(i) {
    return (
      <Btn
        value={i}
        onClick={this.props.clearScreen}
      />
    )
  }

  calculateButton(i) {
    return (
      <Btn
        value={i}
        onClick={this.props.calculate}
      />
    )
  }
  render() {
    return (
      <div>
        <div className="keyboard-nums">
          <div className="keyboard-nums-row">
            {this.renderButton(1)}
            {this.renderButton(2)}
            {this.renderButton(3)}
          </div>
          <div className="keyboard-nums-row">
            {this.renderButton(4)}
            {this.renderButton(5)}
            {this.renderButton(6)}
          </div>
          <div className="keyboard-nums-row">
            {this.renderButton(7)}
            {this.renderButton(8)}
            {this.renderButton(9)}
          </div>
          <div className="keyboard-nums-row" id="zero">
            {this.renderButton(0)}
            {this.renderButton('.')}
          </div>
        </div>
        <div className="keyboard-operators">
          <div className="keyboard-operators-row">
            {this.renderButton('/')}
          </div>
          <div className="keyboard-operators-row">
            {this.renderButton('x')}
          </div>
          <div className="keyboard-operators-row">
            {this.renderButton('-')}
          </div>
          <div className="keyboard-operators-row">
            {this.renderButton('+')}
          </div>
        </div>
        <div className="bottom">
          {this.clearButton('Clear')}
          {this.calculateButton('=')}
        </div>
      </div>
    )
  }
}


function Screen(props) {
  const content = (props.screenContent) ? props.screenContent : 'Click any number!';
  return (
    <div className="screen">
      <p>
        {content}
      </p>
    </div>
  )
}


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      screenContent: '',
    };
  }

  /**
   *  This is passed from __app to the keyboard__ this way:
   *  
   *  __onClick={(i) => this.handleclick(i)__
   *  
   *  This is to pass it in way that the keyboard is left to assign the param.
   *  
   *  Then __keyboard passes it to the button__ this way:
   *  
   *  __onClick={() => this.props.onClick(i)}__
   * 
   *  This is because the value of the button is assigned here, so this function is 
   *  passed of the param in it and is only needed to be __executed in the button__:
   * 
   *  __onClick={props.onClick}__
   * @param {String} i 
   */
  handleclick(i) {
    let screenContent = this.state.screenContent;
    const current = screenContent[screenContent.length-1];
    
    if (isNaN(Number(current)) 
        && screenContent.length > 0
        && isNaN(Number(i))) {
      return;
    }
    else {
      this.setState({screenContent: ''.concat(screenContent,i)});
    }
  }

  clearScreen() {
    this.setState({screenContent: ''})
  }

  calculate() {
    if (this.state.screenContent){
      try {
        var calculation = this.state.screenContent;
        for (var letter of calculation) {
          calculation = (letter === 'x') ? calculation.replace('x', '*') : calculation
        }
        const result = eval(calculation);
        this.setState({screenContent: result})
      }
      catch (err){
        //console.error(err);
        return;
      }
    }
  }

  render() {
    return (
      <div className="app">
          <div className="app-screen">
            <Screen screenContent={this.state.screenContent}/>
          </div>
          <div className="app-keyboard">
            <Keyboard 
              screenContent={this.state.screenContent}
              onClick={(i) => this.handleclick(i)}
              clearScreen={() => this.clearScreen()}
              calculate={() => this.calculate()}
              />
          </div>
      </div>
    )
  }
}
  



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

