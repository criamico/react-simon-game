import React from 'react';
import ColorButton from './color-button.jsx';
import Controls from './controls.jsx';
import Eng from '../engine';
import '../assets/styles/main.scss';

const defaultState = {
  isOn: false,
  isStarted: false,
  isStrict: false,
  isTurnWrong: false,
  turnCounter: 0,
  inputCounter: 0,
  simonSequence: [],
  userSequence: [],
  isClickAutomatic: false,
  hasWon: false,
  timers: []
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    Board.displayName = 'Board';

    this.state = defaultState;

    this.refCallbacks = {
      'G': this.refBtnGreen,
      'R': this.refBtnRed,
      'B': this.refBtnBlue,
      'Y': this.refBtnYellow
    };
  }
  componentDidMount() {
    const randomSequence = Eng.generateSequence();
    this.setState({simonSequence: randomSequence});
  }

  // manage state of 'on' button
  onClickOn = (isOn) => {
    this.setState({ isOn });

    if (!isOn) {
      this.clearTimeouts();
      this.setState(defaultState);
    }
  }

  // manage state of 'start' button
  onClickStart = (isStarted) => {
    const { isOn } = this.state;
    this.setState({ isStarted });

    // call sequence for the first iteration
    if (isOn && isStarted) {
      this.showSequence();
    }

    if (!isStarted) {
      this.resetAll();
    }
  }

  // manage 'strict mode' button
  onClickStrict = (isStrict) => {
    this.setState({ isStrict });
  }

  // Call this function at the beginning of each user turn
  // to reset the variables
  resetTurn = () => {
    this.setState({
      inputCounter: 0,
      userSequence: [],
      isTurnWrong: false
    });
  }

  clearTimeouts = () => {
    this.state.timers.length > 0 && this.state.timers.map(t => clearTimeout(t));
  }

  resetAll = (cb) => {
    this.clearTimeouts();
    this.setState(
      {
        turnCounter: 0,
        inputCounter: 0,
        userSequence: [],
        isClickAutomatic: false,
        hasWon: false,
        isTurnWrong: false,
        timers: []
      },
      cb
    );
  }

  // read user input and do your thing!
  readInput = (id) => {
    const {
      inputCounter,
      isOn,
      isStarted,
      userSequence,
      isClickAutomatic
    } = this.state;

    // if the user input is correct, update state
    // before updating, check that all the flags are in correct state
    if (isOn && isStarted && !isClickAutomatic) {
      // the following variable is ONLY used to update the state
      let tempUserSequence = userSequence;
      tempUserSequence.push(id);
      this.setState(
        {
          userSequence: tempUserSequence,
          inputCounter: inputCounter + 1
        },
        this.onInputCounterUpdate
      );
    }
  }

  onInputCounterUpdate = () => {
    const {
      simonSequence,
      inputCounter,
      turnCounter,
      userSequence
    } = this.state;

    // Take the correct counter value of inputCounter
    const isSequenceCorrect = Eng.isUserSequenceCorrect(
      simonSequence,
      userSequence,
      inputCounter - 1
    );

    // when the inputCounter reaches the main counter
    // and the input sequence is correct, update
    if (isSequenceCorrect){
      // check if user won
      if (userSequence.length === 20) {
        this.setState({ hasWon: true });
        // console.log('you won!');
        // wait three seconds and reset everything
        setTimeout(() => {
          this.resetAll();
        }, 3000);
      }
      if (inputCounter - 1 === turnCounter) {
        this.setState(
          { turnCounter: turnCounter + 1 },
          this.showSequence
        );
        // PS the iteration should be done here
        // instead it happens on the callback for resetAll (showSequence)
        // to ensure that turnCounter is updated
      }
    } else {
      // in this case we don't increment the counter
      // but we show again the sequence
      this.setState(
        { isTurnWrong: true },
        this.resetStrict
      );
    }
  }

  resetStrict = () => {
    // if in strict mode, when wrong reset all and start over;
    if (this.state.isStrict)
      setTimeout(() => {
        this.resetAll(this.showSequence);
      }, 3000);
  }

  // Callback invoked immediately after update of turnCounter.
  // the iteration on the buttons has to be done here
  showSequence = () => {
    const currSequence = Eng.currentSequence(
      this.state.simonSequence, this.state.turnCounter);

    // console.log('sequence to show', currSequence);
    this.resetTurn();

    // call recursive function to set timeouts,
    this.timeoutIterate(currSequence, 0, this.state.timers);
  }

  // recursive function, plays the buttons sequentially
  timeoutIterate = (seq, i, timerArr) => {
    if (i < seq.length) {
      const timer = setTimeout(() => {
        this.playColorKey(seq[i]);
        this.timeoutIterate(seq, i + 1, timerArr);
      }, 1500);
      timerArr.push(timer);
    }
  }

  // set a timeout and then play the key to show the user the color
  playColorKey = (color) => {
    setTimeout(() => {
      this.clickButton(color);
    }, 2500);
  }

  // helper function needed to animate the correct button by using refs
  clickButton(id) {
    // set flag that marks a click as done by the pc
    this.setState({isClickAutomatic: true});

    this.refCallbacks[id].click();
    // reset flag
    this.setState({isClickAutomatic: false});
  }

  getDisplayText = () => {
    const { turnCounter, hasWon, isTurnWrong } = this.state;
    if ( turnCounter === 0 ){
      return '--';
    } else if (turnCounter > 0) {
      if (hasWon) return 'WIN!';
      if (isTurnWrong) return '!!';

      return turnCounter.toString();
    }
  }

  render() {
    const { isOn, isStarted, isStrict } = this.state;

    return (
      <React.Fragment>
        <div className="simon">
          <Controls
            isOn={isOn}
            isStarted={isStarted}
            isStrict={isStrict}
            onClickOn={this.onClickOn}
            onClickStart={this.onClickStart}
            onClickStrict={this.onClickStrict}
            displayString={this.getDisplayText()}
          />
          { Eng.BUTTONS.map(btn => <ColorButton
            key={btn}
            id={btn}
            readInput={this.readInput}
            inputRef={el => this.refCallbacks[btn] = el}
          />
          )}
        </div>
        <div className='attribution'>
          <a href='criamico.github.io'>Criamico</a> - 2018
        </div>
      </React.Fragment>
    );
  }
}

export default Board;
