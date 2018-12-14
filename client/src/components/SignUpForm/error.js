import React from 'react';

const SubmitError = (props) => {
  if (props.error) {
    return <p style={{ color: 'orange' }}>{props.error}</p>;
  }
  return <div />;
};

export default SubmitError;
