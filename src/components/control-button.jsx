import React from 'react';
import PropTypes from 'prop-types';

class ControlButton extends React.PureComponent {
  constructor(props) {
    super(props);
    ControlButton.displayName = 'ControlButton';

    ControlButton.propTypes = {
      className: PropTypes.string,
      isActive: PropTypes.bool,
      onClick: PropTypes.func,
      labelActive: PropTypes.string,
      labelInactive: PropTypes.string
    };
  }

  onClick = () => {
    this.props.onClick(!this.props.isActive);
  }

  render() {
    const { isActive, className, labelActive, labelInactive } = this.props;
    return (
      <div className="btn-div">
        <button
          className={`btn-round ${className} ${ isActive ? 'pressed' : ''}`}
          onClick= {this.onClick}
        />
        <label>{`${ isActive ? labelActive : labelInactive}`}</label>
      </div>
    );
  }
}

export default ControlButton;
