import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

export default function Button(props) {
  const { children, onClick } = props;

  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

Error.propTypes = {
  onClick: PropTypes.func,
};
