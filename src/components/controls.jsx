import React from 'react';
import PropTypes from 'prop-types';
import Toggle from './toggle.jsx';
import ControlButton from './control-button.jsx';
import Display from './display.jsx';

class Controls extends React.PureComponent {
  constructor(props) {
    super(props);
    Controls.displayName = 'Controls';

    Controls.propTypes = {
      isOn: PropTypes.bool,
      isStarted: PropTypes.bool,
      isStrict: PropTypes.bool,
      displayString: PropTypes.string,
      onClickOn: PropTypes.func,
      onClickStart: PropTypes.func,
      onClickStrict: PropTypes.func
    };
  }

  render() {
    const { isOn, isStarted, displayString, isStrict, onClickOn, onClickStrict,
      onClickStart } = this.props;

    return (
      <div className='ctrls'>
        <div className='brand'>React Says</div>
        <div className='container'>
          <Display
            className='display'
            label='COUNT'
            text={displayString}
          />
          <ControlButton
            className='red'
            isActive={isOn? isStarted : false}
            onClick={onClickStart}
            labelActive='STOP'
            labelInactive='START'
          />
          <ControlButton
            className='yellow'
            isActive={isStrict}
            onClick={onClickStrict}
            labelActive='STRICT'
            labelInactive='STRICT'
          />
        </div>
        <Toggle
          onClick={onClickOn}
          isOn={isOn}
        />
      </div>
    );
  }
}

export default Controls;
