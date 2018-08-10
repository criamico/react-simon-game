import React from 'react';
import PropTypes from 'prop-types';

class Toggle extends React.PureComponent {
  constructor(props) {
    super(props);
    Toggle.displayName = 'Toggle';

    Toggle.propTypes = {
      isOn: PropTypes.bool,
      onClick: PropTypes.func
    };
  }

  onClick = () => {
    this.props.onClick(!this.props.isOn);
  }

  render() {
    return <div className="btn-div">
      <div className='toggle-button'>
        <div
          className={`toggle ${ this.props.isOn ? 'on' : 'off'}`}
          onClick={this.onClick}
        />
      </div>
      <label>{`${this.props.isOn ? 'ON' : 'OFF'}`}</label>
    </div>;
  }
}

export default Toggle;
