import React from 'react';
import PropTypes from 'prop-types';

class Display extends React.PureComponent {
  constructor(props) {
    super(props);
    Display.displayName = 'Display';

    Display.propTypes = {
      text: PropTypes.string,
      className: PropTypes.string,
      label: PropTypes.string
    };
  }

  render() {
    const { text, className, label } = this.props;
    return (
      <div className="btn-div">
        <p className={className}>
          { text }
        </p>
        <label>{ label }</label>
      </div>
    );
  }
}

export default Display;
