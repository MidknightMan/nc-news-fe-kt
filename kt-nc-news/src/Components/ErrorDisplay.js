import React from 'react';

function ErrorDisplay(props) {
  const { err } = props;
  if (!err) {
    return <p>bad path</p>;
  }
  return (
    <p>
      {err.status}: {err.msg}
    </p>
  );
}

export default ErrorDisplay;
