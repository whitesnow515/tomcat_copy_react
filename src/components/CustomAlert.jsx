import React from 'react';

const Alert = ({ message, onOk, onNo }) => {
  return (
    <div className="alert">
      <p>{message}</p>
      <button onClick={onOk}>OK</button>
      <button onClick={onNo}>No</button>
    </div>
  );
};

export default Alert;