import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import simonSound1 from '../assets/media/simonSound1.mp3';
import simonSound2 from '../assets/media/simonSound2.mp3';
import simonSound3 from '../assets/media/simonSound3.mp3';
import simonSound4 from '../assets/media/simonSound4.mp3';

class ColorButton extends Component {
  constructor(props) {
    super(props);
    ColorButton.displayName = 'ColorButton';

    ColorButton.propTypes = {
      id: PropTypes.string,
      readInput: PropTypes.func,
      inputRef: PropTypes.func
    };
    this.state = {
      active: false
    };
  }

  getStyle = (id) => {
    const color = {
      'G': 'green',
      'R': 'red',
      'B': 'blue',
      'Y': 'yellow'
    };
    const isActive = this.state.active ? 'active ': '';
    return `${'btn ' + isActive + color[id]}`;
  }

  playSound = (id) => {
    const sounds = {
      'G': simonSound1,
      'R': simonSound2,
      'B': simonSound3,
      'Y': simonSound4
    };

    const sound = new Audio(sounds[id]);
    sound.play();
  }

  // set a timeout to simulate a long click
  onClick = () => {
    this.props.readInput(this.props.id);
    this.playSound(this.props.id);
    this.setState({active: !this.state.active});

    setTimeout(() => {
      this.setState({active: !this.state.active});
    }, 1000);
  }

  render() {
    const { id } = this.props;

    return (
      <button
        id={id}
        className={this.getStyle(id)}
        onClick={this.onClick}
        ref={this.props.inputRef}
      />
    );
  }
}

export default ColorButton;
